<template>
    <div class="layout-search-dialog">
        <el-dialog v-model="state.isShowSearch" destroy-on-close :show-close="false">
            <template #footer>
                <el-autocomplete ref="layoutMenuAutocompleteRef"
                    v-model="state.menuQuery"
                    :fetch-suggestions="menuSearch"
                    placeholder="菜单搜索：支持中文、路由路径"
                    :fit-input-width="true"
                    @select="onHandleSelect">
                    <template #prefix>
                        <el-icon class="el-input__icon">
                            <ele-Search />
                        </el-icon>
                    </template>
                    <template #default="{ item }">
                        <div>
                            <SvgIcon :name="item.meta.icon" class="mr5" />
                            {{ item.meta.title }}
                        </div>
                    </template>
                </el-autocomplete>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts" name="layoutBreadcrumbSearch">
import { nextTick, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTagsViewRoutes } from '/@/stores/tagsViewRoutes'

// 定义变量内容
const storesTagsViewRoutes = useTagsViewRoutes()
const { tagsViewRoutes } = storeToRefs(storesTagsViewRoutes)
const layoutMenuAutocompleteRef = ref()
const router = useRouter()
const state = reactive<SearchState>({
    isShowSearch: false,
    menuQuery: '',
    tagsViewList: [],
})

// 搜索弹窗打开
const openSearch = () => {
    state.menuQuery = ''
    state.isShowSearch = true
    initTageView()
    nextTick(() => {
        setTimeout(() => {
            layoutMenuAutocompleteRef.value.focus()
        })
    })
}
// 搜索弹窗关闭
const closeSearch = () => {
    state.isShowSearch = false
}
// 菜单搜索数据过滤
const menuSearch = (queryString: string, cb: Function) => {
    const results = queryString ? state.tagsViewList.filter(createFilter(queryString)) : state.tagsViewList
    cb(results)
}
// 菜单搜索过滤
const createFilter = (queryString: string) => {
    return (restaurant: RouteItem) => {
        return (
            restaurant.path.toLowerCase().includes(queryString.toLowerCase())
			|| restaurant.meta!.title!.toLowerCase().includes(queryString.toLowerCase())
			|| restaurant.meta!.title!.includes(queryString.toLowerCase())
        )
    }
}
// 初始化菜单数据
const initTageView = () => {
    if (state.tagsViewList.length > 0) return false
    tagsViewRoutes.value.map((v: RouteItem) => {
        if (!v.meta?.isHide) state.tagsViewList.push({ ...v })
    })
}
// 当前菜单选中时
const onHandleSelect = (item: RouteItem) => {
    const { path, redirect } = item
    if (item.meta?.isLink && !item.meta?.isIframe) window.open(item.meta?.isLink)
    else if (redirect) router.push(redirect)
    else router.push(path)
    closeSearch()
}

// 暴露变量
defineExpose({
    openSearch,
})
</script>

<style scoped lang="scss">
.layout-search-dialog {
	position: relative;
	:deep(.el-dialog) {
		.el-dialog__header,
		.el-dialog__body {
			display: none;
		}
		.el-dialog__footer {
			width: 100%;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			top: -53vh;
		}
	}
	:deep(.el-autocomplete) {
		width: 560px;
		position: absolute;
		top: 150px;
		left: 50%;
		transform: translateX(-50%);
	}
}
</style>
