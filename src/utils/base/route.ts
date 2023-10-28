import type { RouteRecordRaw } from 'vue-router'

/**
 * 路由过滤递归函数，过滤隐藏路由
 * @param arr
 * @returns array
 */
export const filterRoutesFunc = <T extends (RouteItem | RouteRecordRaw)>(arr: T[]): T[] => {
    return arr.filter((item: T) => !item.meta?.isHide).map((item: T) => {
        item = Object.assign({}, item)
        if (item.children) item.children = filterRoutesFunc(item.children)
        return item
    })
}
