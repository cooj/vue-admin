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
        routesList.value = data
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
