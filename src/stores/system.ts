import { defineStore } from 'pinia'
import { Session } from '@/utils/storage'
import { ApiMenu } from '@/api/system/menu'
import { ApiUser } from '@/api/system/user'
import { deepClone } from '@/utils/other'

/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfo = defineStore('userInfo', () => {
    const onOff = ref(Session.get('adm') !== 'adm')

    // 用户信息
    const userInfo = ref<IUserInfo>()

    // 权限菜单
    const menuList = ref<any[]>([])

    // 存储接口原始路由（未处理的component）
    const oldMenuList = ref<any[]>([])

    /**
     * 获取用户的权限菜单
     */
    const getAuthMenuList = async () => {
        const res = await ApiMenu.getAuthList()

        const list = [
            // {
            //     path: '/',
            //     name: '/',
            //     // component: () => import('@/layout/index.vue'),
            //     component: () => import('@/layout/index.vue'),
            //     redirect: '/home',
            //     meta: {
            //         isKeepAlive: true,
            //     },
            //     children: [
            //         {
            //             path: '/home',
            //             name: 'home',
            //             component: () => import('@/pages/index.vue'),
            //             meta: {
            //                 title: '首页',
            //                 isLink: '',
            //                 isHide: false,
            //                 isKeepAlive: true,
            //                 isAffix: true,
            //                 isIframe: false,
            //                 roles: ['admin', 'common'],
            //                 icon: 'iconfont icon-shouye',
            //             },
            //         },
            //     ],
            // },
            // {
            //     path: '/',
            //     name: '/',
            //     // component: () => import('@/layout/index.vue'),
            //     component: 'layout/route/parent',
            //     redirect: '/home',
            //     meta: {
            //         isKeepAlive: true,
            //     },
            //     children: [
            //         {
            //             path: '/home',
            //             name: 'home',
            //             // component: () => import('@/pages/index.vue'),
            //             component: 'index',
            //             meta: {
            //                 title: '首页',
            //                 isLink: '',
            //                 isHide: false,
            //                 isKeepAlive: true,
            //                 isAffix: true,
            //                 isIframe: false,
            //                 roles: ['admin', 'common'],
            //                 icon: 'iconfont icon-shouye',
            //             },
            //         },
            //     ],
            // },
            {
                path: '/system',
                name: 'system',
                // component: () => import('@/layout/route/parent.vue'),
                component: 'layout/route/parent',

                redirect: '/system/menu',
                meta: {
                    title: '系统设置',
                    isLink: '',
                    isHide: false,
                    isKeepAlive: true,
                    isAffix: false,
                    isIframe: false,
                    roles: ['admin'],
                    icon: 'iconfont icon-xitongshezhi',
                },
                children: [
                    {
                        path: '/system/menu',
                        name: 'systemMenu',
                        // component: () => import('@/views/system/menu/index.vue'),
                        component: 'system/menu/index',

                        meta: {
                            title: '菜单管理',
                            isLink: '',
                            isHide: false,
                            isKeepAlive: true,
                            isAffix: false,
                            isIframe: false,
                            roles: ['admin'],
                            icon: 'iconfont icon-caidan',
                        },
                    },
                ],
            },
        ]
        oldMenuList.value = deepClone(list)

        // 设置路由数据
        menuList.value = list
    }

    /**
     * 获取用户信息和菜单
     * @returns userInfo
     */
    const getUserInfo = async () => {
        const res = await ApiUser.getInfo()

        const themeConfigState = useThemeConfig()
        if (res) {
            // 从后端获取路由
            if (themeConfigState.themeConfig.isRequestRoutes) {
                getAuthMenuList()
            }
        }

        // 存储用户信息到浏览器缓存
        const user = Session.get<IUserInfo>('userInfo')
        if (user) {
            userInfo.value = user
        } else {
            // 模拟数据，请求接口时，记得删除多余代码及对应依赖的引入
            const userName = 'admin'
            // 模拟数据
            let defaultRoles: Array<string> = []
            let defaultAuthBtnList: Array<string> = []
            // admin 页面权限标识，对应路由 meta.roles，用于控制路由的显示/隐藏
            const adminRoles: Array<string> = ['admin']
            // admin 按钮权限标识
            const adminAuthBtnList: Array<string> = ['btn.add', 'btn.del', 'btn.edit', 'btn.link']
            // test 页面权限标识，对应路由 meta.roles，用于控制路由的显示/隐藏
            const testRoles: Array<string> = ['common']
            // test 按钮权限标识
            const testAuthBtnList: Array<string> = ['btn.add', 'btn.link']
            // 不同用户模拟不同的用户权限
            if (userName === 'admin') {
                defaultRoles = adminRoles
                defaultAuthBtnList = adminAuthBtnList
            } else {
                defaultRoles = testRoles
                defaultAuthBtnList = testAuthBtnList
            }
            // 用户信息模拟数据
            const userInfos: IUserInfo = {
                username: userName,
                photo:
                    userName === 'admin'
                        ? 'https://img2.baidu.com/it/u=1978192862,2048448374&fm=253&fmt=auto&app=138&f=JPEG?w=504&h=500'
                        : 'https://img2.baidu.com/it/u=2370931438,70387529&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
                time: new Date().getTime(),
                roles: defaultRoles,
                authBtnList: defaultAuthBtnList,
            }
            userInfo.value = userInfos
            Session.set('userInfo', userInfos)
        }
    }

    return {
        onOff,
        userInfo,
        menuList,
        getUserInfo,
        getAuthMenuList,
    }
})
