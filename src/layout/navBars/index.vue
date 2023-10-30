<template>
    <div class="layout-navbar-container">
        <BreadcrumbIndex />
        <TagsView v-if="setShowTagsView" />
    </div>
</template>

<script setup lang="ts" name="layoutNavBars">
import { computed, defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'

// 引入组件
const BreadcrumbIndex = defineAsyncComponent(() => import('@/layout/navBars/topBar/index.vue'))
const TagsView = defineAsyncComponent(() => import('@/layout/navBars/tagsView/tagsView.vue'))

// 定义变量内容
const storesThemeConfig = useThemeConfig()
const { themeConfig } = storeToRefs(storesThemeConfig)

// 是否显示 tagsView
const setShowTagsView = computed(() => {
    const { layout, isTagsView } = themeConfig.value
    return layout !== 'classic' && isTagsView
})
</script>

<style scoped lang="scss">
.layout-navbar-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}
</style>
