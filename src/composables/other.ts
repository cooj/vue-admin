import Big from 'big.js'

/**
 * vue路由获取Param类型的参数   /goods/list/1
 * @param name 名称 （必须）
 * @param init 默认值
 * @returns {T} value
 */
export function useRouteParam<T = string>(name: string, init = '' as T) {
    const route = useRoute()
    return computed(() => (route.params as any)[name] as T ?? init)
}
/**
 * vue路由获取query参数（获取？后面的参数）   /goods/list?name=foo&price=10
 * @param name 名称 （必须）
 * @param init
 * @returns {T} value
 */
export function useRouteQuery<T = string>(name: string, init = '' as T) {
    const route = useRoute()
    return computed(() => route.query[name] as T ?? init)
}

/**
 * 数字格式化，默认保留两位小数
 * @param {number} num  - 需要格式化的数字
 * @param {number} [scale] - number   保留的小数位数，默认保留两位
 * @returns {string} value
 */
export const formatNumber = (num: number, scale = 2) => {
    return new Big(num).toFixed(scale)
}
