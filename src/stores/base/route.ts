import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { Session } from '@/utils/storage'

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
