<template>
    <el-config-provider :size="getGlobalComponentSize" :locale="zhCn">
        <router-view v-show="setLockScreen" />
        <LockScreen v-if="themeConfig.isLockScreen" />
        <Settings v-show="setLockScreen" ref="settingRef" />
        <CloseFull v-if="!themeConfig.isLockScreen" />
        <div class="h0px opacity-0">
            <BaseIconList />
        </div>
    </el-config-provider>
</template>

<script setup lang="ts" name="app">
import { computed, defineAsyncComponent, nextTick, onBeforeMount, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { storeToRefs } from 'pinia'
import { useTitle } from '@/utils/other'
import { Local, Session } from '@/utils/storage'
import { setCdnScript, setCdnStyle } from '@/utils/cdn'

// 引入组件
const LockScreen = defineAsyncComponent(() => import('@/layout/lockScreen/index.vue'))
const Settings = defineAsyncComponent(() => import('@/layout/component/settings.vue'))
const CloseFull = defineAsyncComponent(() => import('@/layout/navBars/topBar/closeFull.vue'))

// 定义变量内容
const settingRef = ref<InstanceType<typeof Settings>>()
const route = useRoute()
const stores = useTagsViewRoutes()
const storesThemeConfig = useThemeConfig()
const { themeConfig } = storeToRefs(storesThemeConfig)

// 设置锁屏时组件显示隐藏
const setLockScreen = computed(() => {
    // 防止锁屏后，刷新出现不相关界面
    // https://gitee.com/lyt-top/vue-next-admin/issues/I6AF8P
    return themeConfig.value.isLockScreen ? themeConfig.value.lockScreenTime > 1 : themeConfig.value.lockScreenTime >= 0
})
// 获取版本号
const getVersion = computed(() => {
    let isVersion = false
    if (route.path !== '/login') {
        // @ts-expect-error 版本号
        if ((Local.get('version') && Local.get('version') !== __NEXT_VERSION__) || !Local.get('version')) isVersion = true
    }
    return isVersion
})
// 获取全局组件大小
const getGlobalComponentSize = computed(() => {
    const clientWidth = document.body.clientWidth
    return clientWidth < 1000 ? 'small' : themeConfig.value.globalComponentSize
})
// 设置初始化，防止刷新时恢复默认
onBeforeMount(() => {
    // 设置批量第三方 icon 图标
    setCdnStyle()
    // 设置批量第三方 js
    setCdnScript()
})
// 页面加载时
onMounted(() => {
    nextTick(() => {
        // 获取缓存中的布局配置
        const localTheme = Local.get<IThemeConfigState>('themeConfig')

        if (localTheme) {
            storesThemeConfig.setThemeConfig(localTheme)
            document.documentElement.style.cssText = Local.get('themeConfigStyle') || ''
        }
        // 获取缓存中的全屏配置
        const sessionFull = Session.get<boolean>('isTagsViewCurrentFull')
        if (sessionFull) {
            stores.setCurrentFullscreen(sessionFull)
        }
    })
})
// 页面销毁时，关闭监听布局配置/i18n监听
onUnmounted(() => {

})
// 监听路由的变化，设置网站标题
watch(
    () => route.path,
    () => {
        useTitle()
    },
    {
        deep: true,
    },
)
</script>
