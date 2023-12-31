<template>
    <div class="el-menu-horizontal-warp">
        <el-menu router :default-active="state.defaultActive" background-color="transparent" mode="horizontal">
            <template v-for="val in menuLists">
                <el-sub-menu v-if="val.children && val.children.length > 0" :key="val.path" :index="val.path">
                    <template #title>
                        <SvgIcon :name="val.meta?.icon" />
                        <span>{{ val.meta?.title }}</span>
                    </template>
                    <SubItem :children="val.children" />
                </el-sub-menu>
                <template v-else>
                    <el-menu-item :key="val.path" :index="val.path">
                        <template v-if="!val.meta?.isLink || (val.meta?.isLink && val.meta.isIframe)" #title>
                            <SvgIcon :name="val.meta?.icon" />
                            {{ val.meta?.title }}
                        </template>
                        <template v-else #title>
                            <a class="w100" @click.prevent="onALinkClick(val)">
                                <SvgIcon :name="val.meta.icon" />
                                {{ val.meta.title }}
                            </a>
                        </template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script setup lang="ts" name="navMenuHorizontal">
import { computed, defineAsyncComponent, onBeforeMount, reactive } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { handleOpenLink } from '@/utils/other'
import mittBus from '@/utils/mitt'
import { filterRoutesFunc } from '@/router'

// 定义父组件传过来的值
const props = defineProps({
    // 菜单列表
    menuList: {
        type: Array<RouteRecordRaw>,
        default: () => [],
    },
})

// 引入组件
const SubItem = defineAsyncComponent(() => import('@/layout/navMenu/subItem.vue'))

// 定义变量内容
const stores = useRoutesList()
const storesThemeConfig = useThemeConfig()
const { routesList } = storeToRefs(stores)
const { themeConfig } = storeToRefs(storesThemeConfig)
const route = useRoute()
const state = reactive({
    defaultActive: '' as string | undefined,
})

// 获取父级菜单数据
const menuLists = computed(() => {
    return props.menuList
})

// 传送当前子级数据到菜单中
const setSendClassicChildren = (path: string) => {
    const currentPathSplit = path.split('/')
    const currentData: MittMenu = { children: [] }
    filterRoutesFunc(routesList.value).forEach((v, k) => {
        if (v.path === `/${currentPathSplit[1]}`) {
            v.k = k
            currentData.item = { ...v }
            currentData.children = [{ ...v }]
            if (v.children) currentData.children = v.children
        }
    })
    return currentData
}
// 设置页面当前路由高亮
const setCurrentRouterHighlight = (currentRoute: RouteToFrom) => {
    const { path, meta } = currentRoute
    if (themeConfig.value.layout === 'classic') {
        state.defaultActive = `/${path?.split('/')[1]}`
    } else {
        const pathSplit = meta?.isDynamic ? meta.isDynamicPath!.split('/') : path!.split('/')
        if (pathSplit.length >= 4 && meta?.isHide) state.defaultActive = pathSplit.splice(0, 3).join('/')
        else state.defaultActive = path
    }
}
// 打开外部链接
const onALinkClick = (val: RouteItem) => {
    handleOpenLink(val)
}
// 页面加载前
onBeforeMount(() => {
    setCurrentRouterHighlight(route)
})
// 路由更新时
onBeforeRouteUpdate((to) => {
    // 修复：https://gitee.com/lyt-top/vue-next-admin/issues/I3YX6G
    setCurrentRouterHighlight(to)
    // 修复经典布局开启切割菜单时，点击tagsView后左侧导航菜单数据不变的问题
    const { layout, isClassicSplitMenu } = themeConfig.value
    if (layout === 'classic' && isClassicSplitMenu) {
        mittBus.emit('setSendClassicChildren', setSendClassicChildren(to.path))
    }
})
</script>

<style scoped lang="scss">
.el-menu-horizontal-warp {
    flex: 1;
    overflow: hidden;
    margin-right: 30px;

    :deep(.el-scrollbar__bar.is-vertical) {
        display: none;
    }

    :deep(a) {
        width: 100%;
    }

    .el-menu.el-menu--horizontal {
        display: flex;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
    }
}
</style>
