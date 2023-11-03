<template>
    <el-cascader v-model="dat" class="co-cascader" :style="{ width: setElWidth(props.width as any) }" :props="props.props"
        clearable filterable @change="getChangeValue">
        <template #default="{ node, data: row }">
            <template v-if="!node.isLeaf">
                <span>{{ node.label }}</span>
                <span> ({{ node.children.length }}) </span>
            </template>
            <span v-else class="block" @click.stop="getLastPid(node, row)">{{ node.label }}</span>
        </template>
    </el-cascader>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { ref, watch } from 'vue'
import type { CascaderNode, CascaderProps, CascaderValue } from 'element-plus'
import { deepClone } from '@/utils/other'

// type PropsModelValue = string | number | string[] | number[]
type PropsModelValue = CascaderValue

const props = defineProps({
    modelValue: {
        type: [String, Number, Array] as PropType<PropsModelValue>,
        required: true,
    },
    width: {
        type: [String, Number],
        default: '',
    },
    props: {
        type: Object as PropType<CascaderProps>,
        default: () => {
        },
    },
})
const emits = defineEmits<{
    (e: 'update:modelValue', param: PropsModelValue): void
}>()

const dat = ref(props.modelValue)

const setElWidth = (wid?: string) => {
    if (!wid) return ''
    return Number.isNaN(Number(wid)) ? wid : `${wid}px`
}

// 级联选择事件 { valueByOption: PropsModelValue; isDisabled: boolean }
const getLastPid = (node: CascaderNode, data: any) => {
    if (node.isDisabled) return
    if (node.config.emitPath === false && node.config.multiple) {
        const arr = deepClone(dat.value) as any[]
        if (arr.includes(node.valueByOption)) {
            const index = arr.indexOf(node.valueByOption)
            arr.splice(index, 1)
        } else {
            arr.push(node.valueByOption)
        }
        dat.value = arr
        emits('update:modelValue', arr)
    } else {
        dat.value = node.valueByOption
        emits('update:modelValue', node.valueByOption)
    }
}

const getChangeValue = (val: PropsModelValue) => {
    const m = Array.isArray(val) ? [] : ''
    emits('update:modelValue', val ?? m)
}
watch(() => props.modelValue, (n, o) => {
    const m = Array.isArray(props.modelValue) ? [] : ''
    dat.value = n || m
})
</script>

<style lang="scss">
// .my-cascader {
//     font-size: 14px;

//     &>.el-cascader__tags {
//         flex-wrap: nowrap;
//     }

//     .el-tag {
//         margin: 0px 0 0px 6px;

//         +.el-cascader__search-input {
//             margin: 0px 0px 0px 4px;
//         }
//     }

//     .el-cascader__search-input {

//         min-width: 40px;
//     }
// }
</style>
