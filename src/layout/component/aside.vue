<template>
    <div v-show="!isTagsViewCurrentFull" class="h100%">
        <el-aside class="layout-aside" :class="setCollapseStyle">
            <Logo v-if="setShowLogo" />
            <el-scrollbar ref="layoutAsideScrollbarRef" class="flex-auto" @mouseenter="onAsideEnterLeave(true)"
                @mouseleave="onAsideEnterLeave(false)">
                <Vertical :menu-list="state.menuList" />
            </el-scrollbar>
        </el-aside>
    </div>
</template>

<script setup lang="ts" name="layoutAside">
import { computed, defineAsyncComponent, onBeforeMount, reactive, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import mittBus from '@/utils/mitt'
import { filterRoutesFunc } from '@/router'

// 引入组件
const Logo = defineAsyncComponent(() => import('@/layout/logo/index.vue'))
const Vertical = defineAsyncComponent(() => import('@/layout/navMenu/vertical.vue'))

// 定义变量内容
const layoutAsideScrollbarRef = ref()
const stores = useRoutesList()
const storesThemeConfig = useThemeConfig()
const storesTagsViewRoutes = useTagsViewRoutes()
const { routesList } = storeToRefs(stores)
const { themeConfig } = storeToRefs(storesThemeConfig)
const { isTagsViewCurrentFull } = storeToRefs(storesTagsViewRoutes)
const state = reactive<AsideState>({
    menuList: [],
    clientWidth: 0,
})

// 关闭移动端蒙版
const closeLayoutAsideMobileMode = () => {
    const el = document.querySelector('.layout-aside-mobile-mode')
    el?.setAttribute('style', 'animation: error-img-two 0.3s')
    setTimeout(() => {
        el?.parentNode?.removeChild(el)
    }, 300)
    const clientWidth = document.body.clientWidth
    if (clientWidth < 1000) themeConfig.value.isCollapse = false
    document.body.setAttribute('class', '')
}

// 设置菜单展开/收起时的宽度
const setCollapseStyle = computed(() => {
    const { layout, isCollapse, menuBar } = themeConfig.value
    const asideBrTheme = ['#FFFFFF', '#FFF', '#fff', '#ffffff']
    const asideBrColor = asideBrTheme.includes(menuBar) ? 'layout-el-aside-br-color' : ''
    // 判断是否是手机端
    if (state.clientWidth <= 1000) {
        if (isCollapse) {
            document.body.setAttribute('class', 'el-popup-parent--hidden')
            const asideEle = document.querySelector('.layout-container') as HTMLElement
            const modeDiv = document.createElement('div')
            modeDiv.setAttribute('class', 'layout-aside-mobile-mode')
            asideEle.appendChild(modeDiv)
            modeDiv.addEventListener('click', closeLayoutAsideMobileMode)
            return [asideBrColor, 'layout-aside-mobile', 'layout-aside-mobile-open']
        } else {
            // 关闭弹窗
            closeLayoutAsideMobileMode()
            return [asideBrColor, 'layout-aside-mobile', 'layout-aside-mobile-close']
        }
    } else {
        if (layout === 'columns' || layout === 'classic') {
            // 分栏布局、经典布局，菜单收起时宽度给 1px，防止切换动画消失
            if (isCollapse) return [asideBrColor, 'layout-aside-pc-1']
            else return [asideBrColor, 'layout-aside-pc']
        } else {
            // 其它布局给 64px
            if (isCollapse) return [asideBrColor, 'layout-aside-pc-64']
            else return [asideBrColor, 'layout-aside-pc']
        }
    }
})
// 设置显示/隐藏 logo
const setShowLogo = computed(() => {
    const { layout, isShowLogo } = themeConfig.value
    return (isShowLogo && layout === 'default') || (isShowLogo && layout === 'columns')
})

// 设置/过滤路由（非静态路由/是否显示在菜单中）
const setFilterRoutes = () => {
    if (themeConfig.value.layout === 'columns') return false
    state.menuList = filterRoutesFunc(routesList.value)
}

// 设置菜单导航是否固定（移动端）
const initMenuFixed = (clientWidth: number) => {
    state.clientWidth = clientWidth
}
// 鼠标移入、移出
const onAsideEnterLeave = (bool: boolean) => {
    const { layout, isColumnsMenuHoverPreload } = themeConfig.value
    if (layout !== 'columns') return false
    if (!bool) mittBus.emit('restoreDefault')
    // 开启 `分栏菜单鼠标悬停预加载` 才设置，防止 columnsAside.vue 监听 pinia.state
    if (isColumnsMenuHoverPreload) stores.setColumnsMenuHover(bool)
}
// 页面加载前
onBeforeMount(() => {
    initMenuFixed(document.body.clientWidth)
    setFilterRoutes()
    // 此界面不需要取消监听(mittBus.off('setSendColumnsChildren))
    // 因为切换布局时有的监听需要使用，取消了监听，某些操作将不生效
    mittBus.on('setSendColumnsChildren', (res: MittMenu) => {
        state.menuList = res.children
    })
    // 开启经典布局分割菜单时，设置菜单数据
    mittBus.on('setSendClassicChildren', (res: MittMenu) => {
        const { layout, isClassicSplitMenu } = themeConfig.value
        if (layout === 'classic' && isClassicSplitMenu) {
            // 经典布局分割菜单只要一项子级时，收起左侧导航菜单
            res.children.length <= 1 ? (themeConfig.value.isCollapse = true) : (themeConfig.value.isCollapse = false)
            state.menuList = []
            state.menuList = res.children
        }
    })
    // 开启经典布局分割菜单时，重新处理菜单数据
    mittBus.on('getBreadcrumbIndexSetFilterRoutes', () => {
        setFilterRoutes()
    })
    // 监听窗口大小改变时(适配移动端)
    mittBus.on('layoutMobileResize', (res: LayoutMobileResize) => {
        initMenuFixed(res.clientWidth)
        closeLayoutAsideMobileMode()
    })
})
// 监听 pinia 值的变化，动态赋值给菜单中
watch(
    () => [themeConfig.value.isShowLogoChange, themeConfig.value.isShowLogo, themeConfig.value.layout, themeConfig.value.isClassicSplitMenu],
    ([isShowLogoChange, isShowLogo, layout, isClassicSplitMenu]) => {
        if (isShowLogoChange !== isShowLogo) {
            if (layoutAsideScrollbarRef.value) layoutAsideScrollbarRef.value.update()
        }
        if (layout === 'classic' && isClassicSplitMenu) return false
        setFilterRoutes()
    },
    {
        deep: true,
    },
)
// 监听用户权限切换，用于演示 `权限管理 -> 前端控制 -> 页面权限` 权限切换不生效
watch(
    () => routesList.value,
    () => {
        setFilterRoutes()
    },
)
</script>
