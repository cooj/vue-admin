import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { Session } from '@/utils/storage'

/**
 * 路由列表
 * @methods setRoutesList 设置路由数据
 * @methods setColumnsMenuHover 设置分栏布局菜单鼠标移入 boolean
 * @methods setColumnsNavHover 设置分栏布局最左侧导航鼠标移入 boolean
 */
export const useRoutesList = defineStore('routesList', () => {
    // 动态设置的路由数据
    const routesList = ref<RouteRecordRaw[]>([])

    // 接口返回的路由数据
    const routesOldList = ref<RouteRecordRaw[]>([])

    const isColumnsMenuHover = ref<boolean>(false)
    const isColumnsNavHover = ref<boolean>(false)

    const setRoutesList = async (data: RouteRecordRaw[]) => {
        routesList.value = data
    }

    const setRoutesOldList = async (data: RouteRecordRaw[]) => {
        routesOldList.value = data
    }

    const setColumnsMenuHover = async (bool: boolean) => {
        isColumnsMenuHover.value = bool
    }
    const setColumnsNavHover = async (bool: boolean) => {
        isColumnsNavHover.value = bool
    }

    // requestOldRoutes: [],

    return {
        routesList,
        routesOldList,
        isColumnsMenuHover,
        isColumnsNavHover,
        setRoutesList,
        setRoutesOldList,
        setColumnsMenuHover,
        setColumnsNavHover,
    }
})

/**
 * 路由缓存列表
 * @methods setCacheKeepAlive 设置要缓存的路由 names（开启 TagsView）
 * @methods addCachedView 添加要缓存的路由 names（关闭 TagsView）
 * @methods delCachedView 删除要缓存的路由 names（关闭 TagsView）
 * @methods delOthersCachedViews 右键菜单`关闭其它`，删除要缓存的路由 names（关闭 TagsView）
 * @methods delAllCachedViews 右键菜单`全部关闭`，删除要缓存的路由 names（关闭 TagsView）
 */
export const useKeepALiveNames = defineStore('keepAliveNames', () => {
    const keepAliveNames = ref<string[]>([])

    const cachedViews = ref<string[]>([])

    const setKeepAliveNames = async (data: string[]) => {
        keepAliveNames.value = data
    }

    const addCachedView = (view: RouteRecordRaw) => {
        if (view.meta?.isKeepAlive && view.name) cachedViews.value.push(view.name as string)
    }

    const delCachedView = (view: RouteRecordRaw) => {
        const index = cachedViews.value.indexOf(view?.name as string)
        if (index >= 0) cachedViews.value.splice(index, 1)
    }
    const delOthersCachedViews = (view: RouteRecordRaw) => {
        if (view.meta?.isKeepAlive) cachedViews.value = [view.name as string]
        else cachedViews.value = []
    }
    const delAllCachedViews = () => {
        cachedViews.value = []
    }

    return {
        keepAliveNames,
        cachedViews,
        setKeepAliveNames,
        addCachedView,
        delCachedView,
        delOthersCachedViews,
        delAllCachedViews,
    }
})

/**
 * TagsView 路由列表
 * @methods setTagsViewRoutes 设置 TagsView 路由列表
 * @methods setCurrentFullscreen 设置开启/关闭全屏时的 boolean 状态
 */
export const useTagsViewRoutes = defineStore('tagsViewRoutes', () => {
    const isTagsViewCurrentFull = ref(false)

    const tagsViewRoutes = ref<RouteRecordRaw[]>([])

    const setTagsViewRoutes = (data: Array<RouteRecordRaw>) => {
        tagsViewRoutes.value = data
    }
    const setCurrentFullscreen = (bool: boolean) => {
        Session.set('isTagsViewCurrentFull', bool)
        isTagsViewCurrentFull.value = bool
    }

    return {
        isTagsViewCurrentFull,
        tagsViewRoutes,
        setTagsViewRoutes,
        setCurrentFullscreen,
    }
})
