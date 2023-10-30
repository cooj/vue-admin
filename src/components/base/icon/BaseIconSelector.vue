<template>
    <div class="icon-selector h100% w100%">
        <el-popover placement="bottom" :width="fontIconWidth" trigger="click" transition="el-zoom-in-top"
            popper-class="icon-selector-popper" @show="onPopoverShow">
            <template #reference>
                <ElInput ref="inputWidthRef" v-model="fontIconSearch" :placeholder="fontIconPlaceholder"
                    :clearable="clearable" :disabled="disabled" :size="inputSize" @clear="onClearFontIcon"
                    @focus="onIconFocus" @blur="onIconBlur">
                    <template #prepend>
                        <SvgIcon v-if="fontIconPrefix === '' ? prepend?.indexOf('ele-') > -1 : fontIconPrefix?.indexOf('ele-') > -1"
                            :name="fontIconPrefix === '' ? prepend : fontIconPrefix" class="text-14px" />
                        <i v-else :class="fontIconPrefix === '' ? prepend : fontIconPrefix" class="text-14px" />
                    </template>
                </ElInput>
            </template>
            <template #default>
                <div class="icon-selector-warp">
                    <div class="icon-selector-warp-title flex">
                        <div class="input-x flex-auto">
                            <ElInput v-model="searchText" :placeholder="title" />
                        </div>
                        <div v-if="type === 'all'" class="icon-selector-warp-title-tab">
                            <span :class="{ 'span-active': fontIconType === 'ali' }" class="ml10" title="iconfont 图标"
                                @click="onIconChange('ali')">ali</span>
                            <span :class="{ 'span-active': fontIconType === 'ele' }" class="ml10" title="elementPlus 图标"
                                @click="onIconChange('ele')">ele</span>
                            <span :class="{ 'span-active': fontIconType === 'awe' }" class="ml10" title="font awesome 图标"
                                @click="onIconChange('awe')">awe</span>
                        </div>
                    </div>
                    <div class="icon-selector-warp-row">
                        <el-scrollbar ref="selectorScrollbarRef">
                            <el-row v-if="fontIconSheetsFilterList.length > 0" :gutter="10">
                                <el-col v-for="(v, k) in fontIconSheetsFilterList" :key="k" :xs="6" :sm="4" :md="4" :lg="4"
                                    :xl="4" @click="onColClick(v)">
                                    <div class="icon-selector-warp-item"
                                        :class="{ 'icon-selector-active': fontIconPrefix === v }">
                                        <div class="ma">
                                            <div class="icon-selector-warp-item-value">
                                                <SvgIcon :name="v" />
                                            </div>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-empty v-if="fontIconSheetsFilterList.length <= 0" :image-size="100"
                                :description="emptyDescription" />
                        </el-scrollbar>
                    </div>
                </div>
            </template>
        </el-popover>
    </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, reactive, ref, toRefs, watch } from 'vue'
import { ElInput } from 'element-plus'
import { initIcon, initIconElement } from '@/utils/getStyleSheets'

const props = defineProps({
    // 输入框前置内容
    prepend: {
        type: String,
        default: () => 'ele-Pointer',
    },
    // 输入框占位文本
    placeholder: {
        type: String,
        default: () => '请输入内容搜索图标或者选择图标',
    },
    // 输入框占位文本
    size: {
        type: String,
        default: () => '',
    },
    // 弹窗标题
    title: {
        type: String,
        default: () => '请选择图标',
    },
    // icon 图标类型
    type: {
        type: String,
        default: () => 'ele',
    },
    // 禁用
    disabled: {
        type: Boolean,
        default: () => false,
    },
    // 是否可清空
    clearable: {
        type: Boolean,
        default: () => true,
    },
    // 自定义空状态描述文字
    emptyDescription: {
        type: String,
        default: () => '无相关图标',
    },
    // 双向绑定值，默认为 modelValue，
    // 参考：https://v3.cn.vuejs.org/guide/migration/v-model.html#%E8%BF%81%E7%A7%BB%E7%AD%96%E7%95%A5
    // 参考：https://v3.cn.vuejs.org/guide/component-custom-events.html#%E5%A4%9A%E4%B8%AA-v-model-%E7%BB%91%E5%AE%9A
    modelValue: {
        type: String,
        default: '',
    },
})

const emits = defineEmits(['update:modelValue', 'get', 'clear'])

const inputWidthRef = ref<InstanceType<typeof ElInput>>()
const selectorScrollbarRef = ref()
const state = reactive({
    searchText: '',
    fontIconPrefix: '',
    fontIconWidth: 0,
    fontIconSearch: '',
    fontIconTabsIndex: 0,
    fontIconSheetsList: [] as string[], // 图标类名或组件名
    fontIconPlaceholder: '',
    fontIconType: 'ali',
    fontIconShow: true,
})
const inputSize = computed(() => props.size as '' | 'small' | 'default' | 'large')

// 处理 icon 双向绑定数值回显
const initModeValueEcho = () => {
    if (props.modelValue === '') return (state.fontIconPlaceholder = props.placeholder)
    state.fontIconPlaceholder = props.modelValue
    state.fontIconPrefix = props.modelValue
}

// 初始化数据
const initFontIconData = async (type: string) => {
    let iconClass: string[] = []
    if (type === 'ali') {
        const res = await initIcon('.icon-', 'iconfont')
        if (res?.length > 0) iconClass = res
    } else if (type === 'ele') {
        const res = await initIconElement()
        if (res?.length > 0) iconClass = res
    } else if (type === 'awe') {
        const res = await initIcon('.fa-', 'fa')
        if (res?.length > 0) iconClass = res
    }
    if (state.searchText) {
        state.fontIconSheetsList = iconClass.filter(item => item.includes(state.searchText))
    } else {
        state.fontIconSheetsList = iconClass
    }

    // 初始化 input 的 placeholder
    // 参考（单项数据流）：https://cn.vuejs.org/v2/guide/components-props.html?#%E5%8D%95%E5%90%91%E6%95%B0%E6%8D%AE%E6%B5%81
    state.fontIconPlaceholder = props.placeholder

    // 初始化双向绑定回显
    initModeValueEcho()
}
// 图标点击切换
const onIconChange = (type: string) => {
    state.fontIconType = type
    initFontIconData(type)
}

// 处理 input 获取焦点时，modelValue 有值时，改变 input 的 placeholder 值
const onIconFocus = () => {
    if (!props.modelValue) return false
    state.fontIconSearch = ''
    state.fontIconPlaceholder = props.modelValue
}
// 处理 input 失去焦点时，为空将清空 input 值，为点击选中图标时，将取原先值
const onIconBlur = () => {
    setTimeout(() => {
        const icon = state.fontIconSheetsList.filter(icon => icon === state.fontIconSearch)
        if (icon.length <= 0) state.fontIconSearch = ''
    }, 300)
}

// 处理 icon type 类型为 all 时，类型 ali、ele、awe 回显问题
const initFontIconTypeEcho = () => {
    if (props.modelValue?.indexOf('iconfont') > -1) onIconChange('ali')
    else if (props.modelValue?.indexOf('ele-') > -1) onIconChange('ele')
    else if (props.modelValue?.indexOf('fa') > -1) onIconChange('awe')
    else onIconChange('ali')
}
// 图标搜索及图标数据显示
const fontIconSheetsFilterList = computed(() => {
    if (!state.fontIconSearch) return state.fontIconSheetsList
    const search = state.fontIconSearch.trim().toLowerCase()
    return state.fontIconSheetsList.filter(item => item.toLowerCase().includes(search),
    )
})
// 获取 input 的宽度
const getInputWidth = () => {
    nextTick(() => {
        state.fontIconWidth = inputWidthRef.value?.$el.offsetWidth
    })
}
// 监听页面宽度改变
const initResize = () => {
    window.addEventListener('resize', () => {
        getInputWidth()
    })
}

// 获取当前点击的 icon 图标
const onColClick = (v: string) => {
    state.fontIconPlaceholder = v
    state.fontIconPrefix = v
    emits('get', state.fontIconPrefix)
    emits('update:modelValue', state.fontIconPrefix)
}
// 清空当前点击的 icon 图标
const onClearFontIcon = () => {
    state.fontIconPrefix = ''
    emits('clear', state.fontIconPrefix)
    emits('update:modelValue', state.fontIconPrefix)
}
// 监听 Popover 打开，用于双向绑定值回显
const onPopoverShow = () => {
    initModeValueEcho()
    initFontIconTypeEcho()
}
// 页面加载时
onMounted(() => {
    initModeValueEcho()
    initResize()
    getInputWidth()
})

// 监听双向绑定 modelValue 的变化
watch(
    () => props.modelValue,
    () => {
        initModeValueEcho()
    },
)

const { searchText, fontIconPrefix, fontIconWidth, fontIconSearch, fontIconPlaceholder, fontIconType } = toRefs(state)
</script>

<style lang="scss" scoped>
.input-x {
    :deep(.el-input__wrapper) {
        box-shadow: none !important;
    }
}
</style>
