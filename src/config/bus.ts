/**
 * 这个文件用于声明eventBus事件总线的key值和对应类型
 */
import type { EventBusKey } from '@vueuse/core'
import type { RouteRecordRaw } from 'vue-router'

export const fooKey: EventBusKey<{ name: string }> = Symbol('symbol-key')

//  restoreDefault 分栏布局，鼠标移入、移出数据显示
export const busRestoreDefault: EventBusKey<string> = Symbol('symbol-key')

// busSendColumnsChildren 分栏布局，鼠标移入、移出菜单数据传入到 navMenu 下的菜单中
export const busSendColumnsChildren: EventBusKey<{
    children: RouteRecordRaw[]
    item?: RouteRecordRaw
}> = Symbol('symbol-key')

//  busSendClassicChildren 经典布局，开启切割菜单时，菜单数据传入到 navMenu 下的菜单中
export const busSendClassicChildren: EventBusKey<{
    children: RouteRecordRaw[]
    item?: RouteRecordRaw
}> = Symbol('symbol-key')

// busBreadcrumbIndexSetFilterRoutes 布局设置弹窗，开启切割菜单时，菜单数据传入到 navMenu 下的菜单中
export const busBreadcrumbIndexSetFilterRoutes: EventBusKey<string> = Symbol('symbol-key')

// busLayoutMobileResize 浏览器窗口改变时，用于适配移动端界面显示
export const busLayoutMobileResize: EventBusKey<{
    layout: ThemeConfigLayout
    clientWidth: number
}> = Symbol('symbol-key')

// busTagsViewRefreshRouterView tagsView 刷新界面
export const busTagsViewRefreshRouterView: EventBusKey<string> = Symbol('symbol-key')

// busCurrentContextmenuClick tagsView 右键菜单每项点击时
export const busCurrentContextmenuClick: EventBusKey<string> = Symbol('symbol-key')
