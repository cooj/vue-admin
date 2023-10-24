<template>
    <el-drawer v-model="isDrawer" title="布局配置" direction="rtl" destroy-on-close size="260px" @close="onDrawerClose">
        <el-scrollbar class="px15px">
            <!-- 全局主题 -->
            <el-divider content-position="left">
                全局主题
            </el-divider>
            <div class="mb5px min-h32px flex items-center">
                <div class="color-primary flex-1">
                    primary
                </div>
                <div>
                    <el-color-picker v-model="getThemeConfig.primary" size="default" @change="onColorPickerChange" />
                </div>
            </div>
            <div class="mb5px min-h32px flex items-center">
                <div class="flex-1">
                    深色模式
                </div>
                <div>
                    <el-switch v-model="getThemeConfig.isIsDark" size="small" @change="onAddDarkChange" />
                </div>
            </div>

            <!-- 顶栏设置 -->
            <el-divider content-position="left">
                顶栏设置
            </el-divider>
            <div class="mb5px min-h32px flex items-center">
                <div class="flex-1">
                    顶栏背景
                </div>
                <div>
                    <el-color-picker v-model="getThemeConfig.topBar" size="default"
                        @change="onBgColorPickerChange('topBar')" />
                </div>
            </div>
            <div class="mb5px min-h32px flex items-center">
                <div class="flex-1">
                    顶栏默认字体颜色
                </div>
                <div>
                    <el-color-picker v-model="getThemeConfig.topBarColor" size="default"
                        @change="onBgColorPickerChange('topBarColor')" />
                </div>
            </div>
            <div class="mb5px min-h32px flex items-center">
                <div class="flex-1">
                    顶栏背景渐变
                </div>
                <div>
                    <el-switch v-model="getThemeConfig.isTopBarColorGradual" size="small" @change="onTopBarGradualChange" />
                </div>
            </div>

            <!-- 菜单设置 -->
            <el-divider content-position="left">
                菜单设置
            </el-divider>
            <div class="mb5px min-h32px flex items-center">
                <div class="flex-1">
                    菜单背景
                </div>
                <div class="mb5px min-h32px flex items-center">
                    <el-color-picker v-model="getThemeConfig.menuBar" size="default"
                        @change="onBgColorPickerChange('menuBar')" />
                </div>
            </div>
            <div class="mb5px min-h32px flex items-center">
                <div class="flex-1">
                    菜单默认字体颜色
                </div>
                <div>
                    <el-color-picker v-model="getThemeConfig.menuBarColor" size="default"
                        @change="onBgColorPickerChange('menuBarColor')" />
                </div>
            </div>
            <div class="mb5px min-h32px flex items-center">
                <div class="flex-1">
                    菜单高亮背景色
                </div>
                <div>
                    <el-color-picker v-model="getThemeConfig.menuBarActiveColor" size="default" show-alpha
                        @change="onBgColorPickerChange('menuBarActiveColor')" />
                </div>
            </div>
            <div class="mb5px min-h32px flex items-center">
                <div class="flex-1">
                    菜单背景渐变
                </div>
                <div>
                    <el-switch v-model="getThemeConfig.isMenuBarColorGradual" size="small"
                        @change="onMenuBarGradualChange" />
                </div>
            </div>

            <!-- 分栏设置 -->
            <el-divider content-position="left">
                分栏设置
            </el-divider>
            <div :style="{ opacity: getThemeConfig.layout !== 'columns' ? 0.5 : 1 }">
                <div class="mb5px min-h32px flex items-center">
                    <div class="flex-1">
                        分栏菜单背景
                    </div>
                    <div>
                        <el-color-picker v-model="getThemeConfig.columnsMenuBar" size="default"
                            :disabled="getThemeConfig.layout !== 'columns'"
                            @change="onBgColorPickerChange('columnsMenuBar')" />
                    </div>
                </div>
                <div class="mb5px min-h32px flex items-center">
                    <div class="flex-1">
                        分栏菜单默认字体颜色
                    </div>
                    <div>
                        <el-color-picker v-model="getThemeConfig.columnsMenuBarColor" size="default"
                            :disabled="getThemeConfig.layout !== 'columns'"
                            @change="onBgColorPickerChange('columnsMenuBarColor')" />
                    </div>
                </div>
                <div class="mb5px min-h32px flex items-center">
                    <div class="flex-1">
                        分栏菜单背景渐变
                    </div>
                    <div>
                        <el-switch v-model="getThemeConfig.isColumnsMenuBarColorGradual" size="small"
                            :disabled="getThemeConfig.layout !== 'columns'" @change="onColumnsMenuBarGradualChange" />
                    </div>
                </div>
                <div class="mb5px min-h32px flex items-center">
                    <div class="flex-1">
                        分栏菜单鼠标悬停预加载
                    </div>
                    <div>
                        <el-switch v-model="getThemeConfig.isColumnsMenuHoverPreload" size="small"
                            :disabled="getThemeConfig.layout !== 'columns'" @change="onColumnsMenuHoverPreloadChange" />
                    </div>
                </div>
                <div class="mb5px min-h32px flex items-center">
                    <div class="flex-1">
                        分栏高亮风格
                    </div>
                    <div>
                        <el-select v-model="getThemeConfig.columnsAsideStyle" placeholder="请选择" size="default"
                            class="w90px!" :disabled="getThemeConfig.layout !== 'columns' ? true : false"
                            @change="setLocalThemeConfig">
                            <el-option label="圆角" value="columns-round" />
                            <el-option label="卡片" value="columns-card" />
                        </el-select>
                    </div>
                </div>
                <div class="mb5px min-h32px flex items-center">
                    <div class="flex-1">
                        分栏布局风格
                    </div>
                    <div>
                        <el-select v-model="getThemeConfig.columnsAsideLayout" placeholder="请选择" size="default"
                            class="w90px!" :disabled="getThemeConfig.layout !== 'columns' ? true : false"
                            @change="setLocalThemeConfig">
                            <el-option label="水平" value="columns-horizontal" />
                            <el-option label="垂直" value="columns-vertical" />
                        </el-select>
                    </div>
                </div>
            </div>

            <!-- 界面设置 -->
            <el-divider content-position="left">
                界面设置
            </el-divider>
            <div class="mb5px min-h32px flex items-center"
                :style="{ opacity: getThemeConfig.layout === 'transverse' ? 0.5 : 1 }">
                <div class="flex-1">
                    菜单水平折叠
                </div>
                <div>
                    <el-switch v-model="getThemeConfig.isCollapse" :disabled="getThemeConfig.layout === 'transverse'"
                        size="small" @change="onThemeConfigChange" />
                </div>
            </div>
            <div class="mb5px min-h32px flex items-center"
                :style="{ opacity: getThemeConfig.layout === 'transverse' ? 0.5 : 1 }">
                <div class="flex-1">
                    菜单手风琴
                </div>
                <div>
                    <el-switch v-model="getThemeConfig.isUniqueOpened" :disabled="getThemeConfig.layout === 'transverse'"
                        size="small" @change="setLocalThemeConfig" />
                </div>
            </div>
            <div class="mb5px min-h32px flex items-center">
                <div class="flex-1">
                    固定 Header
                </div>
                <div>
                    <el-switch v-model="getThemeConfig.isFixedHeader" size="small" @change="onIsFixedHeaderChange" />
                </div>
            </div>
            <div class="mb5px min-h32px flex items-center"
                :style="{ opacity: getThemeConfig.layout !== 'classic' ? 0.5 : 1 }">
                <div class="flex-1">
                    经典布局分割菜单
                </div>
                <div>
                    <el-switch v-model="getThemeConfig.isClassicSplitMenu" :disabled="getThemeConfig.layout !== 'classic'"
                        size="small" @change="onClassicSplitMenuChange" />
                </div>
            </div>
            <div class="mb5px min-h32px flex items-center">
                <div class="flex-1">
                    开启锁屏
                </div>
                <div>
                    <el-switch v-model="getThemeConfig.isLockScreen" size="small" @change="setLocalThemeConfig" />
                </div>
            </div>
            <div class="mb5px min-h32px flex items-center">
                <div class="flex-1">
                    自动锁屏(s/秒)
                </div>
                <div>
                    <el-input-number v-model="getThemeConfig.lockScreenTime" controls-position="right" :min="1" :max="9999"
                        size="default" class="w90px!" @change="setLocalThemeConfig" />
                </div>
            </div>

            <!-- 界面显示 -->
            <el-divider content-position="left">
                界面显示
            </el-divider>
            <div class="mb5px min-h32px flex items-center">
                <div class="flex-1">
                    侧边栏 Logo
                </div>
                <div>
                    <el-switch v-model="getThemeConfig.isShowLogo" size="small" @change="onIsShowLogoChange" />
                </div>
            </div>
            <div class="mb5px min-h32px flex items-center"
                :style="{ opacity: getThemeConfig.layout === 'classic' || getThemeConfig.layout === 'transverse' ? 0.5 : 1 }">
                <div class="flex-1">
                    开启 Breadcrumb
                </div>
                <div>
                    <el-switch v-model="getThemeConfig.isBreadcrumb"
                        :disabled="getThemeConfig.layout === 'classic' || getThemeConfig.layout === 'transverse'"
                        size="small" @change="onIsBreadcrumbChange" />
                </div>
            </div>
            <div class="mb5px min-h32px flex items-center">
                <div class="flex-1">
                    开启 Breadcrumb 图标
                </div>
                <div>
                    <el-switch v-model="getThemeConfig.isBreadcrumbIcon" size="small" @change="setLocalThemeConfig" />
                </div>
            </div>
            <div class="mb5px min-h32px flex items-center">
                <div class="flex-1">
                    开启 TagsView
                </div>
                <div>
                    <el-switch v-model="getThemeConfig.isTagsView" size="small" @change="setLocalThemeConfig" />
                </div>
            </div>
            <div class="mb5px min-h32px flex items-center">
                <div class="flex-1">
                    开启 TagsView 图标
                </div>
                <div>
                    <el-switch v-model="getThemeConfig.isTagsViewIcon" size="small" @change="setLocalThemeConfig" />
                </div>
            </div>
            <div class="mb5px min-h32px flex items-center">
                <div class="flex-1">
                    开启 TagsView 缓存
                </div>
                <div>
                    <el-switch v-model="getThemeConfig.isCacheTagsView" size="small" @change="setLocalThemeConfig" />
                </div>
            </div>
            <div class="mb5px min-h32px flex items-center" :style="{ opacity: state.isMobile ? 0.5 : 1 }">
                <div class="flex-1">
                    开启 TagsView 拖拽
                </div>
                <div>
                    <el-switch v-model="getThemeConfig.isSortableTagsView" :disabled="state.isMobile ? true : false"
                        size="small" @change="onSortableTagsViewChange" />
                </div>
            </div>
            <div class="mb5px min-h32px flex items-center">
                <div class="flex-1">
                    开启 TagsView 共用
                </div>
                <div>
                    <el-switch v-model="getThemeConfig.isShareTagsView" size="small" @change="onShareTagsViewChange" />
                </div>
            </div>
            <div class="mb5px min-h32px flex items-center">
                <div class="flex-1">
                    开启 Footer
                </div>
                <div>
                    <el-switch v-model="getThemeConfig.isFooter" size="small" @change="setLocalThemeConfig" />
                </div>
            </div>
            <div class="mb5px min-h32px flex items-center">
                <div class="flex-1">
                    灰色模式
                </div>
                <div>
                    <el-switch v-model="getThemeConfig.isGrayscale" size="small" @change="onAddFilterChange('grayscale')" />
                </div>
            </div>
            <div class="mb5px min-h32px flex items-center">
                <div class="flex-1">
                    色弱模式
                </div>
                <div>
                    <el-switch v-model="getThemeConfig.isInvert" size="small" @change="onAddFilterChange('invert')" />
                </div>
            </div>
            <div class="mb5px min-h32px flex items-center">
                <div class="flex-1">
                    开启水印
                </div>
                <div>
                    <el-switch v-model="getThemeConfig.isWatermark" size="small" @change="onWatermarkChange" />
                </div>
            </div>
            <div class="mb5px min-h32px flex items-center">
                <div class="flex-1">
                    水印文案
                </div>
                <div>
                    <el-input v-model="getThemeConfig.watermarkText" size="default" class="w90px!"
                        @input="onWatermarkTextInput($event)" />
                </div>
            </div>

            <!-- 其它设置 -->
            <el-divider content-position="left">
                其它设置
            </el-divider>
            <div class="mb5px min-h32px flex items-center">
                <div class="flex-1">
                    TagsView 风格
                </div>
                <div>
                    <el-select v-model="getThemeConfig.tagsStyle" placeholder="请选择" size="default" class="w90px!"
                        @change="setLocalThemeConfig">
                        <el-option label="风格1" value="tags-style-one" />
                        <el-option label="风格4" value="tags-style-four" />
                        <el-option label="风格5" value="tags-style-five" />
                    </el-select>
                </div>
            </div>
            <div class="mb5px min-h32px flex items-center">
                <div class="flex-1">
                    主页面切换动画
                </div>
                <div>
                    <el-select v-model="getThemeConfig.animation" placeholder="请选择" size="default" class="w90px!"
                        @change="setLocalThemeConfig">
                        <el-option label="slide-right" value="slide-right" />
                        <el-option label="slide-left" value="slide-left" />
                        <el-option label="opacity" value="opacity" />
                    </el-select>
                </div>
            </div>

            <!-- 布局切换 -->
            <el-divider content-position="left">
                布局切换
            </el-divider>
            <div class="grid grid-cols-[repeat(2,1fr)] mb15px gap-15px">
                <!-- defaults 布局 -->
                <div class="layout-pane-item cursor-pointer" :class="{ on: getThemeConfig.layout === 'default' }"
                    @click="onSetLayout('default')">
                    <el-container class="h100%">
                        <el-aside width="20px" class="layout-pane-aside" />
                        <el-container>
                            <el-header height="10px" class="layout-pane-header" />
                            <el-main class="layout-pane-main" />
                        </el-container>
                    </el-container>
                    <div class="layout-pane-text">
                        默认
                    </div>
                </div>
                <!-- classic 布局 -->
                <div class="layout-pane-item cursor-pointer" :class="{ on: getThemeConfig.layout === 'classic' }"
                    @click="onSetLayout('classic')">
                    <el-container class="h100%">
                        <el-header height="10px" class="layout-pane-header" />
                        <el-container>
                            <el-aside width="20px" class="layout-pane-aside" />
                            <el-main class="layout-pane-main" />
                        </el-container>
                    </el-container>
                    <div class="layout-pane-text">
                        经典
                    </div>
                </div>
                <!-- transverse 布局 -->
                <div class="layout-pane-item cursor-pointer" :class="{ on: getThemeConfig.layout === 'transverse' }"
                    @click="onSetLayout('transverse')">
                    <el-container class="h100%">
                        <el-header height="10px" class="layout-pane-header" />
                        <el-container>
                            <el-main class="layout-pane-main" />
                        </el-container>
                    </el-container>
                    <div class="layout-pane-text">
                        横向
                    </div>
                </div>
                <!-- columns 布局 -->
                <div class="layout-pane-item cursor-pointer" :class="{ on: getThemeConfig.layout === 'columns' }"
                    @click="onSetLayout('columns')">
                    <el-container class="h100%">
                        <el-aside width="10px" class="layout-pane-aside-dark" />
                        <el-aside width="20px" class="layout-pane-aside" />
                        <el-container>
                            <el-header height="10px" class="layout-pane-header" />
                            <el-main class="layout-pane-main" />
                        </el-container>
                    </el-container>
                    <div class="layout-pane-text">
                        分栏
                    </div>
                </div>
            </div>

            <el-alert title="点击下方按钮，复制布局配置去 `src/store/base/theme.ts` 中修改。" type="warning" :closable="false" />
            <div class="my10px">
                <el-button size="default" class="w100%" type="primary" @click="onCopyConfigClick">
                    <el-icon class="mr5px">
                        <ele-CopyDocument />
                    </el-icon>
                    一键复制配置
                </el-button>
            </div>
            <div class="my10px">
                <el-button size="default" class="w100%" type="info" @click="onResetConfigClick">
                    <el-icon class="mr5">
                        <ele-RefreshRight />
                    </el-icon>
                    一键恢复默认
                </el-button>
            </div>
        </el-scrollbar>
    </el-drawer>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import { useThemeConfig } from '@/stores/themeConfig'
import { useChangeColor } from '@/utils/theme'
import { verifyAndSpace } from '@/utils/toolsValidate'
import { Local } from '@/utils/storage'
import Watermark from '@/utils/watermark'
import other from '@/utils/other'
import mittBus from '@/utils/mitt'

// 定义变量内容
const storesThemeConfig = useThemeConfig()
const { themeConfig, isDrawer } = storeToRefs(storesThemeConfig)
const { copy } = useClipboard({ legacy: true })
const { getLightColor, getDarkColor } = useChangeColor()
const state = reactive({
    isMobile: false,
})

// 获取布局配置信息
const getThemeConfig = computed(() => {
    return themeConfig.value
})

// 存储布局配置
const setLocalThemeConfig = () => {
    Local.remove('themeConfig')
    Local.set('themeConfig', getThemeConfig.value)
}

// 存储布局配置全局主题样式（html根标签）
const setLocalThemeConfigStyle = () => {
    Local.set('themeConfigStyle', document.documentElement.style.cssText)
}

// 1、全局主题
const onColorPickerChange = () => {
    if (!getThemeConfig.value.primary) return ElMessage.warning('全局主题 primary 颜色值不能为空')
    // 颜色加深
    document.documentElement.style.setProperty('--el-color-primary-dark-2', `${getDarkColor(getThemeConfig.value.primary, 0.1)}`)
    document.documentElement.style.setProperty('--el-color-primary', getThemeConfig.value.primary)
    // 颜色变浅
    for (let i = 1; i <= 9; i++) {
        document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, `${getLightColor(getThemeConfig.value.primary, i / 10)}`)
    }
    // setDispatchThemeConfig()
    setLocalThemeConfig()
    setLocalThemeConfigStyle()
}

// 2、菜单 / 顶栏 --> 背景渐变函数
const setGradualFun = (el: string, bool: boolean, color: string) => {
    nextTick(() => {
        setTimeout(() => {
            const els = document.querySelector(el)
            if (!els) return false
            document.documentElement.style.setProperty('--el-menu-bg-color', document.documentElement.style.getPropertyValue('--next-bg-menuBar'))
            if (bool) els.setAttribute('style', `background:linear-gradient(to bottom , ${color}, ${getLightColor(color, 0.5)})`)
            else els.setAttribute('style', ``)
            setLocalThemeConfig()
        }, 300)
    })
}

// 2、菜单 / 顶栏 --> 顶栏背景渐变
const onTopBarGradualChange = () => {
    setGradualFun('.layout-navbars-breadcrumb-index', getThemeConfig.value.isTopBarColorGradual, getThemeConfig.value.topBar)
}
// 2、菜单 / 顶栏 --> 菜单背景渐变
const onMenuBarGradualChange = () => {
    setGradualFun('.layout-container .el-aside', getThemeConfig.value.isMenuBarColorGradual, getThemeConfig.value.menuBar)
}
// 2、菜单 / 顶栏 --> 分栏菜单背景渐变
const onColumnsMenuBarGradualChange = () => {
    setGradualFun('.layout-container .layout-columns-aside', getThemeConfig.value.isColumnsMenuBarColorGradual, getThemeConfig.value.columnsMenuBar)
}

// 2、菜单 / 顶栏
const onBgColorPickerChange = (bg: keyof ThemeConfigState['themeConfig']) => {
    document.documentElement.style.setProperty(`--next-bg-${bg}`, themeConfig.value[bg] as string)
    if (bg === 'menuBar') {
        document.documentElement.style.setProperty(`--next-bg-menuBar-light-1`, getLightColor(getThemeConfig.value.menuBar, 0.05))
    }
    onTopBarGradualChange()
    onMenuBarGradualChange()
    onColumnsMenuBarGradualChange()

    setLocalThemeConfig()
    setLocalThemeConfigStyle()
}

// 2、分栏设置 ->
const onColumnsMenuHoverPreloadChange = () => {
    setLocalThemeConfig()
}
// 3、界面设置 --> 菜单水平折叠
const onThemeConfigChange = () => {
    setLocalThemeConfig()
}
// 3、界面设置 --> 固定 Header
const onIsFixedHeaderChange = () => {
    // getThemeConfig.value.isFixedHeaderChange = !getThemeConfig.value.isFixedHeader
    setLocalThemeConfig()
}
// 3、界面设置 --> 经典布局分割菜单
const onClassicSplitMenuChange = () => {
    getThemeConfig.value.isBreadcrumb = false
    setLocalThemeConfig()
    mittBus.emit('getBreadcrumbIndexSetFilterRoutes')
}
// 4、界面显示 --> 侧边栏 Logo
const onIsShowLogoChange = () => {
    getThemeConfig.value.isShowLogoChange = !getThemeConfig.value.isShowLogo
    setLocalThemeConfig()
}
// 4、界面显示 --> 面包屑 Breadcrumb
const onIsBreadcrumbChange = () => {
    if (getThemeConfig.value.layout === 'classic') {
        getThemeConfig.value.isClassicSplitMenu = false
    }
    setLocalThemeConfig()
}
// 4、界面显示 --> 开启 TagsView 拖拽
const onSortableTagsViewChange = () => {
    mittBus.emit('openOrCloseSortable')
    setLocalThemeConfig()
}
// 4、界面显示 --> 开启 TagsView 共用
const onShareTagsViewChange = () => {
    mittBus.emit('openShareTagsView')
    setLocalThemeConfig()
}
// 4、界面显示 --> 灰色模式/色弱模式
const onAddFilterChange = (attr: string) => {
    if (attr === 'grayscale') {
        if (getThemeConfig.value.isGrayscale) getThemeConfig.value.isInvert = false
    } else {
        if (getThemeConfig.value.isInvert) getThemeConfig.value.isGrayscale = false
    }
    const cssAttr
        = attr === 'grayscale' ? `grayscale(${getThemeConfig.value.isGrayscale ? 1 : 0})` : `invert(${getThemeConfig.value.isInvert ? '80%' : '0%'})`
    const appEle = document.body
    appEle.setAttribute('style', `filter: ${cssAttr}`)
    setLocalThemeConfig()
}
// 4、界面显示 --> 深色模式
const onAddDarkChange = () => {
    const body = document.documentElement as HTMLElement
    if (getThemeConfig.value.isIsDark) body.setAttribute('data-theme', 'dark')
    else body.setAttribute('data-theme', '')
}
// 4、界面显示 --> 开启水印
const onWatermarkChange = () => {
    getThemeConfig.value.isWatermark ? Watermark.set(getThemeConfig.value.watermarkText) : Watermark.del()
    setLocalThemeConfig()
}
// 4、界面显示 --> 水印文案
const onWatermarkTextInput = (val: string) => {
    getThemeConfig.value.watermarkText = verifyAndSpace(val)
    if (getThemeConfig.value.watermarkText === '') return false
    if (getThemeConfig.value.isWatermark) Watermark.set(getThemeConfig.value.watermarkText)
    setLocalThemeConfig()
}
// 5、布局切换
const onSetLayout = (layout: ThemeConfigState['themeConfig']['layout']) => {
    Local.set('oldLayout', layout)
    if (getThemeConfig.value.layout === layout) return false
    if (layout === 'transverse') getThemeConfig.value.isCollapse = false
    getThemeConfig.value.layout = layout
    getThemeConfig.value.isDrawer = false
    // initLayoutChangeFun()
}
// 设置布局切换函数
const initLayoutChangeFun = () => {
    onBgColorPickerChange('menuBar')
    onBgColorPickerChange('menuBarColor')
    onBgColorPickerChange('menuBarActiveColor')
    onBgColorPickerChange('topBar')
    onBgColorPickerChange('topBarColor')
    onBgColorPickerChange('columnsMenuBar')
    onBgColorPickerChange('columnsMenuBarColor')
}
// 关闭弹窗时，初始化变量。变量用于处理 layoutScrollbarRef.value.update() 更新滚动条高度
const onDrawerClose = () => {
    isDrawer.value = false

    getThemeConfig.value.isFixedHeaderChange = false
    getThemeConfig.value.isShowLogoChange = false
    getThemeConfig.value.isDrawer = false
    setLocalThemeConfig()
}
// 布局配置弹窗打开
const openDrawer = () => {
    getThemeConfig.value.isDrawer = true
}
// 触发 store 布局配置更新
const setDispatchThemeConfig = () => {
    setLocalThemeConfig()
    setLocalThemeConfigStyle()
}

// 一键复制配置
const onCopyConfigClick = async () => {
    const copyThemeConfig = Local.get<ThemeConfigState['themeConfig']>('themeConfig')
    if (!copyThemeConfig) return
    await copy(JSON.stringify(copyThemeConfig))

    ElMessage.success('复制成功')
}
// 一键恢复默认
const onResetConfigClick = () => {
    Local.clear()
    window.location.reload()
    // @ts-expect-error version
    Local.set('version', __NEXT_VERSION__)
}
// 初始化菜单样式等
const initSetStyle = () => {
    // 2、菜单 / 顶栏 --> 顶栏背景渐变
    onTopBarGradualChange()
    // 2、菜单 / 顶栏 --> 菜单背景渐变
    onMenuBarGradualChange()
    // 2、菜单 / 顶栏 --> 分栏菜单背景渐变
    onColumnsMenuBarGradualChange()
}
onMounted(() => {
    nextTick(() => {
        // 判断当前布局是否不相同，不相同则初始化当前布局的样式，防止监听窗口大小改变时，布局配置logo、菜单背景等部分布局失效问题
        if (!Local.get('frequency')) initLayoutChangeFun()
        Local.set('frequency', 1)
        // 监听窗口大小改变，非默认布局，设置成默认布局（适配移动端）
        mittBus.on('layoutMobileResize', (res: LayoutMobileResize) => {
            getThemeConfig.value.layout = res.layout
            getThemeConfig.value.isDrawer = false
            initLayoutChangeFun()
            state.isMobile = other.isMobile()
        })
        setTimeout(() => {
            // 默认样式
            onColorPickerChange()
            // 灰色模式
            if (getThemeConfig.value.isGrayscale) onAddFilterChange('grayscale')
            // 色弱模式
            if (getThemeConfig.value.isInvert) onAddFilterChange('invert')
            // 深色模式
            if (getThemeConfig.value.isIsDark) onAddDarkChange()
            // 开启水印
            onWatermarkChange()
            // 初始化菜单样式等
            initSetStyle()
        }, 100)
    })
})
onUnmounted(() => {
    mittBus.off('layoutMobileResize', () => { })
})

// 暴露变量
defineExpose({
    openDrawer,
})
</script>

<style scoped lang="scss">
.layout-pane-item {
    position: relative;
    border: 1px solid var(--el-color-info-light-5);
    border-radius: 2px;
    transition: all 0.5s;
    height: 60px;

    .layout-pane-text {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 40px;
        height: 40px;
        opacity: 0.6;
        transform: translate(-50%, -50%) rotate(45deg);
        border: 1px solid var(--el-color-primary);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        line-height: 12px;
        color: var(--el-color-primary);

        &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 30px;
            height: 30px;
            transform: translate(-50%, -50%);
            border: 1px solid var(--el-color-primary);
            border-radius: 50%;
            border-left-color: transparent;
            border-right-color: transparent;
        }
    }

    &.on,
    &:hover {
        border-color: var(--el-color-primary);

        .layout-pane-text {
            opacity: 1;
        }
    }

    .layout-pane-aside-dark {
        background-color: var(--next-color-setting-header);
    }

    .layout-pane-aside {
        background-color: var(--next-color-setting-aside);
    }

    .layout-pane-header {
        background-color: var(--next-color-setting-header);
    }

    .layout-pane-main {
        background-color: var(--next-color-setting-main);
    }

}
</style>
