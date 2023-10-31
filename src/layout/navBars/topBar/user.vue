<template>
    <div class="layout-navbars-breadcrumb-user pr15px" :style="{ flex: layoutUserFlexNum }">
        <el-dropdown :show-timeout="70" :hide-timeout="50" trigger="click" @command="onComponentSizeChange">
            <div class="layout-navbars-breadcrumb-user-icon">
                <i class="iconfont icon-ziti" title="组件大小" />
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="large" :disabled="themeConfig.globalComponentSize === 'large'">
                        大型
                    </el-dropdown-item>
                    <el-dropdown-item command="default" :disabled="themeConfig.globalComponentSize === 'default'">
                        默认
                    </el-dropdown-item>
                    <el-dropdown-item command="small" :disabled="themeConfig.globalComponentSize === 'small'">
                        小型
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <div class="layout-navbars-breadcrumb-user-icon" @click="onSearchClick">
            <el-icon title="菜单搜索">
                <ele-Search />
            </el-icon>
        </div>
        <div class="layout-navbars-breadcrumb-user-icon" @click="onLayoutSetingClick">
            <i class="iconfont icon-skin" title="布局配置" />
        </div>
        <div ref="userNewsBadgeRef" v-click-outside="onUserNewsClick" class="layout-navbars-breadcrumb-user-icon">
            <el-badge :is-dot="true">
                <el-icon title="消息">
                    <ele-Bell />
                </el-icon>
            </el-badge>
        </div>
        <el-popover ref="userNewsRef" :virtual-ref="userNewsBadgeRef" placement="bottom" trigger="click"
            transition="el-zoom-in-top" virtual-triggering :width="300" :persistent="false">
            <UserNews />
        </el-popover>
        <div class="layout-navbars-breadcrumb-user-icon mr10px" @click="onScreenFullClick">
            <i class="iconfont" :title="state.isScreenFull ? '关全屏' : '开全屏'"
                :class="!state.isScreenFull ? 'icon-fullscreen' : 'icon-tuichuquanping'" />
        </div>
        <el-dropdown :show-timeout="70" :hide-timeout="50" @command="onHandleCommandClick">
            <span class="layout-navbars-breadcrumb-user-link">
                <img :src="userInfo?.photo" class="layout-navbars-breadcrumb-user-link-photo mr5px">
                {{ userInfo?.username === '' ? 'common' : userInfo?.username }}
                <el-icon class="el-icon--right">
                    <ele-ArrowDown />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="/home">
                        首页
                    </el-dropdown-item>
                    <el-dropdown-item command="wareHouse">
                        代码仓库
                    </el-dropdown-item>
                    <el-dropdown-item command="/404">
                        404
                    </el-dropdown-item>
                    <el-dropdown-item command="/401">
                        401
                    </el-dropdown-item>
                    <el-dropdown-item divided command="logOut">
                        退出登录
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <Search ref="searchRef" />
    </div>
</template>

<script setup lang="ts" name="layoutBreadcrumbUser">
import { computed, defineAsyncComponent, reactive, ref, unref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox, ClickOutside as vClickOutside } from 'element-plus'

import { storeToRefs } from 'pinia'
import { Local, Session } from '@/utils/storage'

// 引入组件
const UserNews = defineAsyncComponent(() => import('@/layout/navBars/topBar/userNews.vue'))
const Search = defineAsyncComponent(() => import('@/layout/navBars/topBar/search.vue'))

// 定义变量内容
const userNewsRef = ref()
const userNewsBadgeRef = ref()
const router = useRouter()
const stores = useUserInfo()
const storesThemeConfig = useThemeConfig()
const { userInfo } = storeToRefs(stores)
const { themeConfig, isDrawer } = storeToRefs(storesThemeConfig)
const searchRef = ref()
const state = reactive({
    isScreenFull: false,
})

// 设置分割样式
const layoutUserFlexNum = computed(() => {
    let num: string | number = ''
    const { layout, isClassicSplitMenu } = themeConfig.value
    const layoutArr: string[] = ['default', 'columns']
    if (layoutArr.includes(layout) || (layout === 'classic' && !isClassicSplitMenu)) num = '1'
    else num = ''
    return num
})

// 全屏点击时
const { isSupported, isFullscreen, toggle } = useFullscreen()
const onScreenFullClick = () => {
    if (!isSupported) return ElMessage.warning('暂不不支持全屏')
    toggle() // 全屏切换
    state.isScreenFull = !isFullscreen.value
}

// 消息通知点击时
const onUserNewsClick = () => {
    unref(userNewsRef).popperRef?.delayHide?.()
}
// 布局配置 icon 点击时
const onLayoutSetingClick = () => {
    isDrawer.value = true
}
// 下拉菜单点击时
const onHandleCommandClick = (path: string) => {
    if (path === 'logOut') {
        ElMessageBox({
            closeOnClickModal: false,
            closeOnPressEscape: false,
            title: '提示',
            message: '此操作将退出登录, 是否继续?',
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            buttonSize: 'default',
            beforeClose: (action, instance, done) => {
                if (action === 'confirm') {
                    instance.confirmButtonLoading = true
                    instance.confirmButtonText = '退出中'
                    setTimeout(() => {
                        done()
                        setTimeout(() => {
                            instance.confirmButtonLoading = false
                        }, 300)
                    }, 700)
                } else {
                    done()
                }
            },
        })
            .then(async () => {
                // 清除缓存/token等
                Session.clear()
                // 使用 reload 时，不需要调用 resetRoute() 重置路由
                window.location.reload()
            })
            .catch(() => { })
    } else if (path === 'wareHouse') {
        window.open('https://gitee.com/lyt-top/vue-next-admin')
    } else {
        router.push(path)
    }
}
// 菜单搜索点击
const onSearchClick = () => {
    searchRef.value.openSearch()
}
// 组件大小改变
const onComponentSizeChange = (size: ThemeConfigGlobalComponentSize) => {
    Local.remove('themeConfig')
    themeConfig.value.globalComponentSize = size
    Local.set('themeConfig', themeConfig.value)

    window.location.reload()
}
</script>

<style scoped lang="scss">
.layout-navbars-breadcrumb-user {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    &-link {
        height: 100%;
        display: flex;
        align-items: center;
        white-space: nowrap;

        &-photo {
            width: 25px;
            height: 25px;
            border-radius: 100%;
        }
    }

    &-icon {
        padding: 0 10px;
        cursor: pointer;
        color: var(--next-bg-topBarColor);
        height: 50px;
        line-height: 50px;
        display: flex;
        align-items: center;

        &:hover {
            background: var(--next-color-user-hover);

            i {
                display: inline-block;
                animation: logoAnimation 0.3s ease-in-out;
            }
        }
    }

    :deep(.el-dropdown) {
        color: var(--next-bg-topBarColor);
    }

    :deep(.el-badge) {
        height: 40px;
        line-height: 40px;
        display: flex;
        align-items: center;
    }

    :deep(.el-badge__content.is-fixed) {
        top: 12px;
    }
}
</style>
