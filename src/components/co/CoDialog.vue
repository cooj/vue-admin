<template>
    <el-dialog v-model="visible" :fullscreen="defData.fullscreen" draggable v-bind="$attrs" @close="onClose">
        <template #header>
            <span class="el-dialog__title">
                {{ props.title }}
            </span>
            <button v-if="!props.hideFull" class="el-dialog__headerbtn mr54px" @click="onToggle">
                <SvgIcon class="el-dialog__close" :class="{ active: iconName === 'ele-CopyDocument' }" :name="iconName" />
            </button>
        </template>
        <slot />

        <template #footer>
            <el-button @click="onCancel">
                取 消
            </el-button>
            <el-button type="primary" :loading="props.loading" @click="onConfirm">
                确 定
            </el-button>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'

const props = defineProps({
    visible: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        default: '',
    },
    autoHeight: {
        type: Boolean,
        default: false,
    },
    hideFull: {
        type: Boolean,
        default: false,
    },
    loading: {
        type: Boolean,
        default: false,
    },
})

const emits = defineEmits<{
    (e: 'update:visible', value: boolean): void
    (e: 'cancel'): void
    (e: 'close'): void
    (e: 'confirm'): void
}>()

const defData = reactive({
    visible: props.visible,
    fullscreen: false,
})

// 子组件定义自己的visible
const visible = computed({
    get: () => props.visible,
    set: (value) => {
        emits('update:visible', value)
    },
})

const iconName = computed(() => {
    return defData.fullscreen ? 'ele-CopyDocument' : 'ele-FullScreen'
})

// 关闭弹窗
const onClose = () => {
    emits('close')
    visible.value = false
}

// 点击取消
const onCancel = () => {
    emits('cancel')
    visible.value = false
}

// 点击确定
const onConfirm = () => {
    emits('confirm')
    // visible.value = false
}

// 最大、最小化
const onToggle = () => {
    defData.fullscreen = !defData.fullscreen
    // emits('update:fullscreen', defData.fullscreen)
}
</script>

<style lang="scss" scoped>

</style>
