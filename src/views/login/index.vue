<template>
    <div class="h100% flex items-center justify-center">
        <div class="w700px flex">
            <div class="login-right-warp flex-margin">
                <span class="login-right-warp-one" />
                <span class="login-right-warp-two" />
                <div class="login-right-warp-main">
                    <div class="login-right-warp-main-title">
                        {{ getThemeConfig.globalTitle }} 欢迎您！
                    </div>
                    <div class="login-right-warp-main-form">
                        <div v-if="!state.isScan">
                            <el-tabs v-model="state.tabsActiveName">
                                <el-tab-pane label="账号密码登录" name="account">
                                    <Account />
                                </el-tab-pane>
                                <el-tab-pane label="手机号登录" name="mobile">
                                    <Mobile />
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                        <Scan v-if="state.isScan" />
                        <div class="login-content-main-sacn" @click="state.isScan = !state.isScan">
                            <i class="iconfont" :class="state.isScan ? 'icon-diannao1' : 'icon-barcode-qr'" />
                            <div class="login-content-main-sacn-delta" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="loginIndex">
import { computed, defineAsyncComponent, onMounted, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { NextLoading } from '@/utils/loading'

// 引入组件
const Account = defineAsyncComponent(() => import('@/views/login/component/account.vue'))
const Mobile = defineAsyncComponent(() => import('@/views/login/component/mobile.vue'))
const Scan = defineAsyncComponent(() => import('@/views/login/component/scan.vue'))

// 定义变量内容
const storesThemeConfig = useThemeConfig()
const { themeConfig } = storeToRefs(storesThemeConfig)
const state = reactive({
    tabsActiveName: 'account',
    isScan: false,
})

// 获取布局配置信息
const getThemeConfig = computed(() => {
    return themeConfig.value
})
// 页面加载时
onMounted(() => {
    NextLoading.done()
})
</script>

<style scoped lang="scss">
.login-right-warp {
    border: 1px solid var(--el-color-primary-light-3);
    border-radius: 3px;
    width: 500px;
    height: 500px;
    position: relative;
    overflow: hidden;
    background-color: var(--el-color-white);

    .login-right-warp-one,
    .login-right-warp-two {
        position: absolute;
        display: block;
        width: inherit;
        height: inherit;

        &::before,
        &::after {
            content: '';
            position: absolute;
            z-index: 1;
        }
    }

    .login-right-warp-one {
        &::before {
            filter: hue-rotate(0deg);
            top: 0px;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, transparent, var(--el-color-primary));
            animation: loginLeft 3s linear infinite;
        }

        &::after {
            filter: hue-rotate(60deg);
            top: -100%;
            right: 2px;
            width: 3px;
            height: 100%;
            background: linear-gradient(180deg, transparent, var(--el-color-primary));
            animation: loginTop 3s linear infinite;
            animation-delay: 0.7s;
        }
    }

    .login-right-warp-two {
        &::before {
            filter: hue-rotate(120deg);
            bottom: 2px;
            right: -100%;
            width: 100%;
            height: 3px;
            background: linear-gradient(270deg, transparent, var(--el-color-primary));
            animation: loginRight 3s linear infinite;
            animation-delay: 1.4s;
        }

        &::after {
            filter: hue-rotate(300deg);
            bottom: -100%;
            left: 0px;
            width: 3px;
            height: 100%;
            background: linear-gradient(360deg, transparent, var(--el-color-primary));
            animation: loginBottom 3s linear infinite;
            animation-delay: 2.1s;
        }
    }

    .login-right-warp-main {
        display: flex;
        flex-direction: column;
        height: 100%;

        .login-right-warp-main-title {
            height: 130px;
            line-height: 130px;
            font-size: 27px;
            text-align: center;
            letter-spacing: 3px;
            animation: logoAnimation 0.3s ease;
            animation-delay: 0.3s;
            color: var(--el-text-color-primary);
        }

        .login-right-warp-main-form {
            flex: 1;
            padding: 0 50px 50px;

            .login-content-main-sacn {
                position: absolute;
                top: 0;
                right: 0;
                width: 50px;
                height: 50px;
                overflow: hidden;
                cursor: pointer;
                transition: all ease 0.3s;
                color: var(--el-color-primary);

                &-delta {
                    position: absolute;
                    width: 35px;
                    height: 70px;
                    z-index: 2;
                    top: 2px;
                    right: 21px;
                    background: var(--el-color-white);
                    transform: rotate(-45deg);
                }

                &:hover {
                    opacity: 1;
                    transition: all ease 0.3s;
                    color: var(--el-color-primary) !important;
                }

                i {
                    width: 47px;
                    height: 50px;
                    display: inline-block;
                    font-size: 48px;
                    position: absolute;
                    right: 1px;
                    top: 0px;
                }
            }
        }
    }
}
</style>
