<template>
    <div class="login-scan-container">
        <div ref="codeRef" />
        <div class="login-msg mt20px text-12px">
            <i class="iconfont icon-saoyisao mr5px" />
            <span>打开手机扫一扫，快速登录/注册</span>
        </div>
    </div>
</template>

<script setup lang="ts" name="loginScan">
import { nextTick, onMounted, ref } from 'vue'

// 定义变量内容
const codeRef = ref<HTMLElement | null>(null)

// 初始化生成二维码
const initQrCode = () => {
    nextTick(() => {
        codeRef.value!.innerHTML = ''
    })
}
// 页面加载时
onMounted(() => {
    initQrCode()
})
</script>

<style scoped lang="scss">
.login-scan-animation {
    opacity: 0;
    animation-name: error-num;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
}

.login-scan-container {
    padding: 0 20px 20px;
    display: flex;
    flex-direction: column;
    text-align: center;
    @extend .login-scan-animation;
    animation-delay: 0.1s;

    :deep(img) {
        margin: auto;
    }

    .login-msg {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--el-text-color-placeholder);
        @extend .login-scan-animation;
        animation-delay: 0.2s;
    }
}
</style>
