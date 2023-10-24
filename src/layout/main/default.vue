<template>
    <el-container class="layout-container">
        <LayoutAside />
        <el-container class="layout-container-view h100%!">
            <ElScrollbar ref="layoutScrollbarRef" class="layout-backtop">
                <LayoutHeader />
                <LayoutMain ref="layoutMainRef" />
            </ElScrollbar>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import { defineAsyncComponent, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { ElScrollbar } from 'element-plus'
import { NextLoading } from '@/utils/loading'

// 引入组件
const LayoutAside = defineAsyncComponent(() => import('@/layout/component/aside.vue'))
const LayoutHeader = defineAsyncComponent(() => import('@/layout/component/header.vue'))
const LayoutMain = defineAsyncComponent(() => import('@/layout/component/main.vue'))

// 定义变量内容
const layoutScrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
const layoutMainRef = ref<InstanceType<typeof LayoutMain>>()
const route = useRoute()
const storesThemeConfig = useThemeConfig()
const { themeConfig } = storeToRefs(storesThemeConfig)

/**
 * 重置滚动条高度
 * @param scroll {boolean} 是否滚动回顶部
 */
const updateScrollbar = (scroll?: boolean) => {
    if (!layoutScrollbarRef.value) return
    // 更新父级 scrollbar
    layoutScrollbarRef.value?.update()
    // 更新子级 scrollbar
    layoutMainRef.value?.layoutMainScrollbarRef?.update()

    if (scroll) {
        if (layoutScrollbarRef.value.wrapRef) layoutScrollbarRef.value.wrapRef.scrollTop = 0
        if (layoutMainRef.value?.layoutMainScrollbarRef?.wrapRef) layoutMainRef.value.layoutMainScrollbarRef.wrapRef.scrollTop = 0
    }
}

// 重置滚动条高度，由于组件是异步引入的
const initScrollBarHeight = () => {
    nextTick(() => {
        setTimeout(() => {
            updateScrollbar(true)
        }, 500)
    })
}
// 页面加载时
onMounted(() => {
    initScrollBarHeight()
    NextLoading.done(600)
})
// 监听路由的变化，切换界面时，滚动条置顶
watch(
    () => route.path,
    () => {
        initScrollBarHeight()
    },
)
// 监听 themeConfig 配置文件的变化，更新菜单 el-scrollbar 的高度
watch(
    () => [themeConfig.value.isTagsView, themeConfig.value.isFixedHeader],
    () => {
        nextTick(() => {
            updateScrollbar()
        })
    },
    {
        deep: true,
    },
)
</script>
