<template>
    <BaseBox>
        <CoFormTool :data="searchData" inline @submit.prevent="onSearch">
            <el-button type="success" @click="onOpenDialog('add')">
                <el-icon>
                    <ele-FolderAdd />
                </el-icon>
                新增角色
            </el-button>
        </CoFormTool>
        <div v-loading="!!tableData.loading" class="flex-1 overflow-hidden">
            <CoTable v-model:page="tableData.pagination" v-model:table-header="tableData.tableHeader" :data="tableData.data"
                @update:page="onHandleCurrentChanges">
                <template #status="{ scopes }">
                    <el-tag v-if="scopes.row.status === 1" type="success">
                        启用
                    </el-tag>
                    <el-tag v-else type="info">
                        禁用
                    </el-tag>
                </template>
                <template #operate="{ scopes }">
                    <el-button size="small" text type="primary" @click="onOpenDialog('edit', scopes.row)">
                        修改
                    </el-button>
                    <el-button size="small" text type="primary" @click="onRowDel(scopes.row)">
                        删除
                    </el-button>
                </template>
            </CoTable>
        </div>

        <UserDialog ref="dialogRef" @refresh="initTableData()" />
    </BaseBox>
</template>

<script setup lang="ts" name="systemUser">
import { defineAsyncComponent, onMounted, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 引入组件
const UserDialog = defineAsyncComponent(() => import('@/views/system/user/ComponentDialog.vue'))

interface UserApi_ListResponse {
    id: number
    account: string
    username: string
    group_name: string
    role_name: string
    company_name: string
    phone: string
    last_login_time: string
    status: string
}

const dialogRef = ref<InstanceType<typeof UserDialog>>()

// form表单数据类型
interface FormSearchData {
    name: ''
    class_id: '' | number
    company_id: '' // 公司id
    role: '' | number // 角色id
    is_goods_role: '' | 0 | 1 // 商品负责人
}
const searchData = reactive<SearchDataType<FormSearchData>>({
    data: {
        name: '',
        class_id: '',
        company_id: '', // 公司id
        role: '', // 角色id
        is_goods_role: '', // 商品负责人
    },
    config: [
        { column: { label: '员工名称', prop: 'name' }, placeholder: '请输入员工名称', width: '180' },
        { column: { label: '员工分类', prop: 'class_id' }, slot: true, width: '180' },
        { column: { label: '公司分类', prop: 'company_id' }, slot: true, width: '310' },
        { column: { label: '所属角色', prop: 'role' }, slot: true, width: '150' },
        { column: { label: '商品负责人', prop: 'is_goods_role' }, slot: true, width: '90' },
    ],
    hideBtn: false,
    // showAll: true,
    searchFunc: () => initTableData(),
})

// table 表格数据
type TableDataItem = UserApi_ListResponse
const tableData = reactive<CoTableType<TableDataItem>>({
    data: [],
    tableHeader: [
        { property: 'id', label: 'id', width: 90 },
        { property: 'account', label: '登录账号', minWidth: 120 },
        { property: 'username', label: '员工名称', minWidth: 150 },
        { property: 'group_name', label: '员工分类', minWidth: 150, slot: true },
        { property: 'role_name', label: '关联角色', width: 130 },
        { property: 'company_name', label: '所属公司', minWidth: 130 },
        { property: 'phone', label: '手机号', width: 120 },
        { property: 'last_login_time', label: '最后登录时间', width: 155 },
        { property: 'status', label: '员工状态', width: 85, align: 'center', slot: true },
        { property: 'operate', label: '操作', width: 100, fixed: 'right', align: 'center', slot: true },
    ],
    pagination: {
        ...PAGINATION,
        // total: 0,
    },
})

// 初始化列表数据
const initTableData = () => {
    tableData.loading = true
    const data: TableDataItem[] = []
    for (let i = 0; i < 21; i++) {
        data.push({
            username: i === 0 ? 'admin' : 'test',
            // userNickname: i === 0 ? '我是管理员' : '我是普通用户',
            // roleSign: i === 0 ? 'admin' : 'common',
            // department: i === 0 ? ['vueNextAdmin', 'IT外包服务'] : ['vueNextAdmin', '资本控股'],
            phone: '12345678910',
            // email: 'vueNextAdmin@123.com',
            // sex: '女',
            // password: '123456',
            // overdueTime: new Date(),
            // status: true,
            // describe: i === 0 ? '不可删除' : '测试用户',
            // createTime: new Date().toLocaleString(),
            id: i,
            account: '',
            group_name: '',
            role_name: '',
            company_name: '',
            last_login_time: '',
            status: '',
        })
    }

    tableData.data = data
    tableData.pagination.total = data.length

    setTimeout(() => {
        tableData.loading = false
    }, 1000)
}

const onSearch = () => {
    initTableData()
}

// 新增、修改
const onOpenDialog = (type: 'add' | 'edit', row?: TableDataItem) => {
    dialogRef.value?.openDialog(type, row)
}

// 删除用户
const onRowDel = (row: RowUserType) => {
    ElMessageBox.confirm(`此操作将永久删除账户名称：“${row.userName}”，是否继续?`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
    })
        .then(() => {
            initTableData()
            ElMessage.success('删除成功')
        })
        .catch(() => { })
}

// 分页改变
const onHandleCurrentChanges = () => {
    initTableData()
}

// 页面加载时
onMounted(() => {
    initTableData()
})
</script>

<style scoped lang="scss"></style>
