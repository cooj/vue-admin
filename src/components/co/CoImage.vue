<template>
    <el-image :z-index="10000" :preview-teleported="true" v-bind="$attrs">
        <template #error>
            <div class="el-image__error">
                <el-icon>
                    <ele-Picture />
                </el-icon>
            </div>
        </template>
    </el-image>
</template>

<script lang="ts" setup>
const props = defineProps({
    iconSize: {
        type: Number,
        default: 16,
    },
})
const iconSize = computed(() => {
    return `${props.iconSize}px`
})
</script>

<style lang="scss" scoped>
.el-image__error {
    font-size: v-bind('iconSize');
}
</style>
