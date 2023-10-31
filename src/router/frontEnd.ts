import type { RouteRecordRaw } from 'vue-router'
import { storeToRefs } from 'pinia'
import { formatFlatteningRoutes, formatTwoStageRoutes, router } from '@/router/index'
import { dynamicRoutes, notFoundAndNoPower } from '@/router/route'
import pinia from '@/stores/index'
import { Session } from '@/utils/storage'
import { NextLoading } from '@/utils/loading'

// 前端控制路由

// const dynamicRoutes: any = formatFlatteningRoutes(dynamicRoutes)
// dynamicRoutes[0].children=[]

const getFullRoutes = () => {
    const list = dynamicRoutes
    notFoundAndNoPower.forEach((item) => {
        list[0].children?.push(item)
    })
    return list
}

/**
 * 前端控制路由：初始化方法，防止刷新时路由丢失
 * @method  NextLoading 界面 loading 动画开始执行
 * @method useUserInfo(pinia).setUserInfos() 触发初始化用户信息 pinia
 * @method setAddRoute 添加动态路由
 * @method setFilterMenuAndCacheTagsViewRoutes 设置递归过滤有权限的路由到 pinia routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
 */
export async function initFrontEndControlRoutes() {
    // 界面 loading 动画开始执行
    if (window.nextLoading === undefined) NextLoading.start()
    // 无 token 停止执行下一步
    if (!Session.get('token')) return false
    // 触发初始化用户信息 pinia
    // https://gitee.com/lyt-top/vue-next-admin/issues/I5F1HP
    const stores = useUserInfo(pinia)
    await stores.getUserInfo()

    if (stores.userInfo?.roles.length && stores.userInfo?.roles.length > 0) {
        console.log(getFullRoutes())

        stores.menuList = getFullRoutes()
        // 添加动态路由
        await setAddRoute()
        // 设置递归过滤有权限的路由到 pinia routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
        setFilterMenuAndCacheTagsViewRoutes()
    } else {
        return Promise.resolve(true)
    }

    // // 无登录权限时，添加判断
    // // https://gitee.com/lyt-top/vue-next-admin/issues/I64HVO
    // if (stores.userInfo?.roles.length <= 0) return Promise.resolve(true)
    // // 添加动态路由
    // await setAddRoute()
    // // 设置递归过滤有权限的路由到 pinia routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
    // setFilterMenuAndCacheTagsViewRoutes()
}

/**
 * 添加动态路由
 * @method router.addRoute
 * @description 此处循环为 dynamicRoutes（@/router/route）第一个顶级 children 的路由一维数组，非多级嵌套
 * @link 参考：https://next.router.vuejs.org/zh/api/#addroute
 */
export async function setAddRoute() {
    const routeEnd = setFilterRouteEnd()
    await routeEnd.forEach((route: RouteRecordRaw) => {
        router.addRoute(route)
    })
}

/**
 * 删除/重置路由
 * @method router.removeRoute
 * @description 此处循环为 dynamicRoutes（@/router/route）第一个顶级 children 的路由一维数组，非多级嵌套
 * @link 参考：https://next.router.vuejs.org/zh/api/#push
 */
export async function frontEndsResetRoute() {
    await setFilterRouteEnd().forEach((route: RouteRecordRaw) => {
        const routeName: any = route.name
        router.hasRoute(routeName) && router.removeRoute(routeName)
    })
}

/**
 * 获取有当前用户权限标识的路由数组，进行对原路由的替换
 * @description 替换 dynamicRoutes（@/router/route）第一个顶级 children 的路由
 * @returns 返回替换后的路由数组
 */
export function setFilterRouteEnd() {
    const filterRouteEnd: any = formatTwoStageRoutes(formatFlatteningRoutes(dynamicRoutes))
    // notFoundAndNoPower 防止 404、401 不在 layout 布局中，不设置的话，404、401 界面将全屏显示
    // 关联问题 No match found for location with path 'xxx'
    filterRouteEnd[0].children = [...setFilterRoute(filterRouteEnd[0].children), ...notFoundAndNoPower]
    return filterRouteEnd
}

/**
 * 获取当前用户权限标识去比对路由表（未处理成多级嵌套路由）
 * @description 这里主要用于动态路由的添加，router.addRoute
 * @link 参考：https://next.router.vuejs.org/zh/api/#addroute
 * @param child dynamicRoutes（@/router/route）第一个顶级 children 的下路由集合
 * @returns 返回有当前用户权限标识的路由数组
 */
export function setFilterRoute(child: any) {
    const stores = useUserInfo(pinia)
    const { userInfo } = storeToRefs(stores)
    const filterRoute: any = []
    child.forEach((route: any) => {
        if (route.meta.roles) {
            route.meta.roles.forEach((metaRoles: any) => {
                userInfo.value?.roles.forEach((roles: any) => {
                    if (metaRoles === roles) filterRoute.push({ ...route })
                })
            })
        }
    })
    return filterRoute
}

/**
 * 缓存多级嵌套数组处理后的一维数组
 * @description 用于 tagsView、菜单搜索中：未过滤隐藏的(isHide)
 */
export function setCacheTagsViewRoutes() {
    // 获取有权限的路由，否则 tagsView、菜单搜索中无权限的路由也将显示
    const stores = useUserInfo(pinia)
    const storesTagsView = useTagsViewRoutes(pinia)
    const { userInfo } = storeToRefs(stores)
    const rolesRoutes = setFilterHasRolesMenu(dynamicRoutes, userInfo.value?.roles || [])
    // 添加到 pinia setTagsViewRoutes 中
    storesTagsView.setTagsViewRoutes(formatTwoStageRoutes(formatFlatteningRoutes(rolesRoutes))[0].children)
}

/**
 * 设置递归过滤有权限的路由到 pinia routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
 * @description 用于左侧菜单、横向菜单的显示
 * @description 用于 tagsView、菜单搜索中：未过滤隐藏的(isHide)
 */
export function setFilterMenuAndCacheTagsViewRoutes() {
    const stores = useUserInfo(pinia)
    const storesRoutesList = useRoutesList(pinia)
    const { userInfo } = storeToRefs(stores)
    storesRoutesList.setRoutesList(setFilterHasRolesMenu(dynamicRoutes[0].children || [], userInfo.value?.roles || []))
    setCacheTagsViewRoutes()
}

/**
 * 判断路由 `meta.roles` 中是否包含当前登录用户权限字段
 * @param roles 用户权限标识，在 userInfos（用户信息）的 roles（登录页登录时缓存到浏览器）数组
 * @param route 当前循环时的路由项
 * @returns 返回对比后有权限的路由项
 */
export function hasRoles(roles: string[], route: RouteRecordRaw) {
    if (route.meta && route.meta.roles) return roles.some(role => route.meta?.roles?.includes(role))
    else return true
}

/**
 * 获取当前用户权限标识去比对路由表，设置递归过滤有权限的路由
 * @param routes 当前路由 children
 * @param roles 用户权限标识，在 userInfos（用户信息）的 roles（登录页登录时缓存到浏览器）数组
 * @returns 返回有权限的路由数组 `meta.roles` 中控制
 */
export function setFilterHasRolesMenu(routes: RouteRecordRaw[], roles: string[]) {
    const menu: RouteRecordRaw[] = []
    routes.forEach((route) => {
        const item = { ...route }
        if (hasRoles(roles, item)) {
            if (item.children) item.children = setFilterHasRolesMenu(item.children, roles)
            menu.push(item)
        }
    })
    return menu
}
