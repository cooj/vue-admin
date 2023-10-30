<template>
    <div class="main-box-absolute p15px" :class="{ 'min-hei': props.minHeight }">
        <!-- <div class="flex flex-col bg-#fff p15px">
            <slot />
        </div> -->
        <div class="box-theme flex flex-col p15px" :class="{ 'box-theme-no': props.noTheme }">
            <slot />
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    minHeight: {
        type: Boolean,
        default: false,
    },
    noTheme: {
        type: Boolean,
        default: false,
    },
})
</script>

<style lang="scss" scoped>
.main-box-absolute {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &.min-hei {
        height: auto;
        min-height: 100%;
        padding: 0;
    }
}

.box-theme {
    background: var(--el-color-white);
    border: 1px solid var(--el-border-color-light, #ebeef5);
    border-radius: 4px;
    width: 100%;
    height: 100%;

    &.box-theme-no {
        background: unset;
        border: none;
    }
}

// .max-box {
//     overflow: auto;
//     height: $height;
//     position: relative;
//     z-index: 3;
//     padding: 20px;
//     display: flex;
//     flex-direction: column;

//     >:deep(*) {
//         flex-shrink: 0;
//     }

//     >:deep(.jm-box) {
//         flex: 1;
//         overflow: auto;
//         margin: 0 -20px;
//         padding: 0 20px;
//     }
// }

// .min-hei {
//     min-height: $height;
//     padding: 20px;

//     &.no-theme {
//         padding: 0;
//     }
// }
</style>
