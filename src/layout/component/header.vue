<template>
    <el-header v-show="!isTagsViewCurrentFull" class="layout-header">
        <NavBarsIndex />
    </el-header>
</template>

<script setup lang="ts" name="layoutHeader">
import { defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'

// 引入组件
const NavBarsIndex = defineAsyncComponent(() => import('@/layout/navBars/index.vue'))

// 定义变量内容
const storesTagsViewRoutes = useTagsViewRoutes()
const { isTagsViewCurrentFull } = storeToRefs(storesTagsViewRoutes)
</script>
