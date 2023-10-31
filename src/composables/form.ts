import { ElMessage, type FormInstance } from 'element-plus'
import type { Ref } from 'vue'
import { ref } from 'vue'

type AutoLoadingResult = [
    <T>(requestPromise: Promise<T>) => Promise<T>,
    Ref<boolean>,
]

/* 在给run方法传入一个promise，会在promise执行前或执行后将loading状态设为true，在执行完成后设为false */
export function useLoadingSubmit(defaultLoading = false): AutoLoadingResult {
    const loading = ref(defaultLoading)

    async function run<T>(requestPromise: Promise<T>): Promise<T> {
        loading.value = true
        try {
            return await requestPromise
        } finally {
            loading.value = false
        }
    }

    return [run, loading]
}

/**
 * 验证el-form组件表单验证
 * @param formEl
 * @returns boolean true-验证通过，false-验证不通过
 */
export const useFormVerify = async (formEl: FormInstance | undefined) => {
    if (!formEl) {
        ElMessage.error('未获取到对应的组件,formEl为空')
        return false
    }
    return await formEl.validate((valid, fields) => {
        if (valid) {
            return true
        } else {
            const obj: any = fields
            const firstKey = Object.keys(obj)[0]
            const text = obj[firstKey][0].message
            ElMessage.error(text)
            return false
        }
    })
}
