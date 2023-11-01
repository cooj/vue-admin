<template>
    <div class="box-color">
        <div class="jm-box">
            <div class="content">
                <img src="@/assets/images/logo-gyj.png" alt="">
                <h1 class="text">
                    <sub>欢迎进入</sub>
                    <br>&emsp;工游记后台管理系统
                </h1>
            </div>
            <BaseIconSelector v-model="icon" type="all" />
            <div class="min-h300px">
                <!-- <BaseIconList /> -->
                <i class="block" :class="name" />
            </div>
            <BaseTinymce v-model="name" />
            <el-button @click="defData.visible = true">
                获取菜单
            </el-button>
            <BaseDialog v-model:visible="defData.visible" title="菜单列表" :width="600" :auto-height="false">
                弹窗
                <div class="h100vh">
                    133
                </div>
                弹窗
            </BaseDialog>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ApiMenu } from '@/api/system/menu'

// import IconList from '@/layout/component/icon.vue'

const defData = reactive({
    visible: false,
})

const icon = ref('')
const name = ref('')
// setTimeout(() => {
//     const user = 'user'
//     name.value = `i-ep-${user}`
// }, 2000)

const getIconName = async () => {
    const res = await ApiMenu.getList()
    console.log(res)
    name.value = `i-ep-${res}`
}

onMounted(async () => {
    // const res = await initIcon('.fa-', 'fa')
    // console.log(res)

    getIconName()
})
</script>

<style lang="scss" scoped>
.box-color {
    background-color: #fafafa !important;
}

.content {
    // width: 100%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    // flex-direction: column;

    >img {
        width: 100px;
    }

    .text {
        // margin-bottom: 80px;
        margin: 0 20px;
        font-size: 32px;
        color: #444;
        // text-align: center;
        text-shadow: 4px 4px 0px #fff,
            10px 10px 0px #cbcbcd;
        text-shadow: 0 1px 0 #ccc,
            0 2px 0 #c9c9c9,
            0 3px 0 #bbb,
            0 4px 0 #b9b9b9,
            0 5px 0 #aaa,
            0 6px 1px rgba(0, 0, 0, .1),
            0 0 5px rgba(0, 0, 0, .1),
            0 1px 3px rgba(0, 0, 0, .3),
            0 3px 5px rgba(0, 0, 0, .2),
            0 5px 10px rgba(0, 0, 0, .25),
            0 10px 10px rgba(0, 0, 0, .2),
            0 20px 20px rgba(0, 0, 0, .15);
    }
}

.notion {
    --el-notification-width: 440px;
    position: absolute;
}
</style>
