import { judementSameArr } from '/@/utils/arrayOperation'

/**
 * 单个权限验证
 * @param value 权限值
 * @returns 有权限，返回 `true`，反之则反
 */
export function auth(value: string): boolean {
    const stores = useUserInfo()

    return stores.userInfo?.authBtnList.includes(value) || false
}

/**
 * 多个权限验证，满足一个则为 true
 * @param value 权限值
 * @returns 有权限，返回 `true`，反之则反
 */
export function auths(value: Array<string>): boolean {
    const stores = useUserInfo()
    const node = stores.userInfo?.authBtnList.find(val => value.includes(val))
    return !!node
}

/**
 * 多个权限验证，全部满足则为 true
 * @param value 权限值
 * @returns 有权限，返回 `true`，反之则反
 */
export function authAll(value: Array<string>): boolean {
    const stores = useUserInfo()
    return judementSameArr(value, stores.userInfo?.authBtnList || [])
}
