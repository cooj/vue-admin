<template>
    <component :is="layoutComponent" :class="themeConfig.layout" />
</template>

<script setup lang="ts" name="layout">
import { defineAsyncComponent, onBeforeMount, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { Local } from '@/utils/storage'
import mittBus from '@/utils/mitt'

// 定义变量内容
const storesThemeConfig = useThemeConfig()
const { themeConfig } = storeToRefs(storesThemeConfig)

// 相应的布局组件
const layoutComponent = computed(() => {
    const comp = themeConfig.value.layout
    if (comp === 'columns') {
        return defineAsyncComponent(() => import('@/layout/main/columns.vue'))
    } else if (comp === 'classic') {
        return defineAsyncComponent(() => import('@/layout/main/classic.vue'))
    } else if (comp === 'transverse') {
        return defineAsyncComponent(() => import('@/layout/main/transverse.vue'))
    } else { // 默认布局
        return defineAsyncComponent(() => import('@/layout/main/default.vue'))
    }
})

// 窗口大小改变时(适配移动端)
const onLayoutResize = () => {
    if (!Local.get('oldLayout')) Local.set('oldLayout', themeConfig.value.layout)
    console.log(Local.get('oldLayout'))
    const clientWidth = document.body.clientWidth
    console.log(clientWidth)
    if (clientWidth < 1000) {
        themeConfig.value.isCollapse = false
        mittBus.emit('layoutMobileResize', {
            layout: 'default',
            clientWidth,
        })
    } else {
        mittBus.emit('layoutMobileResize', {
            layout: Local.get('oldLayout') ? Local.get('oldLayout') : themeConfig.value.layout,
            clientWidth,
        })
    }
}
// 页面加载前
onBeforeMount(() => {
    onLayoutResize()
    window.addEventListener('resize', onLayoutResize)
})
// 页面卸载时
onUnmounted(() => {
    window.removeEventListener('resize', onLayoutResize)
})
</script>
