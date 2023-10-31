/* eslint-disable */
import * as axios from 'axios';
import 'vue-router';

// 扩展 axios 数据返回类型，可自行扩展
declare module 'axios' {
    export interface CreateAxiosDefaults {
        // 请求失败再次请求次数和间隔
        retry?: number
        retryDelay?: number
    }
    export interface AxiosResponse<T = any> {
        code: number;
        data: T;
        message: string;
        type?: string;
        [key: string]: T;
    }
}



/**
 * 建议：路由 path 路径与文件夹名称相同，找文件可浏览器地址找，方便定位文件位置
 *
 * 路由meta对象参数说明
 * meta: {
 *      title:          菜单栏及 tagsView 栏、菜单搜索名称（国际化）
 *      isLink：        是否超链接菜单，开启外链条件，`1、isLink: 链接地址不为空 2、isIframe:false`
 *      isHide：        是否隐藏此路由
 *      isKeepAlive：   是否缓存组件状态
 *      isAffix：       是否固定在 tagsView 栏上
 *      isIframe：      是否内嵌窗口，开启条件，`1、isIframe:true 2、isLink：链接地址不为空`
 *      roles：         当前路由权限标识，取角色管理。控制路由显示、隐藏。超级管理员：admin 普通角色：common
 *      icon：          菜单、tagsView 图标，阿里：加 `iconfont xxx`，fontawesome：加 `fa xxx`
 * }
 */

// 扩展 RouteMeta 接口
declare module 'vue-router' {
    interface RouteMeta {
        title?: string
        isLink?: string
        isHide?: boolean
        isKeepAlive?: boolean
        isAffix?: boolean
        isIframe?: boolean
        roles?: string[]
        icon?: string
        isDynamic?: boolean // 是否使用的动态路由
        isDynamicPath?: string // 动态路径
    }
}
