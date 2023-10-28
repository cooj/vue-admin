<template>
    <el-container class="layout-container flex-col!">
        <LayoutHeader />
        <div class="layout-main-height-50 flex">
            <LayoutAside />
            <div class="layout-backtop flex-1">
                <LayoutTagsView v-if="themeConfig.isTagsView" />
                <LayoutMain ref="layoutMainRef" />
            </div>
        </div>
    </el-container>
</template>

<script setup lang="ts" name="layoutClassic">
import { defineAsyncComponent, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

// 引入组件
const LayoutAside = defineAsyncComponent(() => import('@/layout/component/aside.vue'))
const LayoutHeader = defineAsyncComponent(() => import('@/layout/component/header.vue'))
const LayoutMain = defineAsyncComponent(() => import('@/layout/component/main.vue'))
const LayoutTagsView = defineAsyncComponent(() => import('@/layout/navBars/tagsView/tagsView.vue'))

// 定义变量内容
const layoutMainRef = ref<InstanceType<typeof LayoutMain>>()
const route = useRoute()
const storesThemeConfig = useThemeConfig()
const { themeConfig } = storeToRefs(storesThemeConfig)

/**
 * 重置滚动条高度
 * @param scroll {boolean} 是否滚动回顶部
 */
const updateScrollbar = (scroll?: boolean) => {
    layoutMainRef.value?.layoutMainScrollbarRef?.update()

    if (scroll) {
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
})
// 监听路由的变化，切换界面时，滚动条置顶
watch(
    () => route.path,
    () => {
        initScrollBarHeight()
    },
)
// 监听 themeConfig  isTagsView 配置文件的变化，更新菜单 el-scrollbar 的高度
watch(
    () => themeConfig.value.isTagsView,
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
