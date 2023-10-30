import type { App } from 'vue'
import { judgmentSameArr } from '@/utils/arrayOperation'

/**
 * 用户权限指令
 * @directive 单个权限验证（v-auth="xxx"）
 * @directive 多个权限验证，满足一个则显示（v-auths="[xxx,xxx]"）
 * @directive 多个权限验证，全部满足则显示（v-auth-all="[xxx,xxx]"）
 */
export function authDirective(app: App) {
    // 单个权限验证（v-auth="xxx"）
    app.directive('auth', {
        mounted(el, binding) {
            const stores = useUserInfo()
            if (!stores.userInfo?.authBtnList.includes(binding.value)) el.parentNode.removeChild(el)
        },
    })
    // 多个权限验证，满足一个则显示（v-auths="[xxx,xxx]"）
    app.directive('auths', {
        mounted(el, binding) {
            const stores = useUserInfo()

            const flag = stores.userInfo?.authBtnList.find(item => binding.value.includes(item))
            if (!flag) el.parentNode.removeChild(el)
        },
    })
    // 多个权限验证，全部满足则显示（v-auth-all="[xxx,xxx]"）
    app.directive('auth-all', {
        mounted(el, binding) {
            const stores = useUserInfo()
            const flag = judgmentSameArr(binding.value, stores.userInfo?.authBtnList || [])
            if (!flag) el.parentNode.removeChild(el)
        },
    })
}
