import { defineAsyncComponent, nextTick } from 'vue'
import type { App } from 'vue'
import * as svg from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import router from '@/router/index'
import pinia from '@/stores/index'
import { verifyUrl } from '@/utils/toolsValidate'

// 引入组件
const SvgIcon = defineAsyncComponent(() => import('@/components/svgIcon/index.vue'))

/**
 * 导出全局注册 element plus svg 图标
 * @param app vue 实例
 * @description 使用：https://element-plus.gitee.io/zh-CN/component/icon.html
 */
export function elSvg(app: App) {
    const icons = svg as any
    for (const i in icons) {
        app.component(`ele-${icons[i].name}`, icons[i])
    }
    app.component('SvgIcon', SvgIcon)
}

/**
 * 设置 自定义 tagsView 名称
 * @param item 路由 query、params 中的 tagsViewName
 * @returns 返回当前 tagsViewName 名称
 */
export function setTagsViewNameI18n(item: any) {
    let tagsViewName: string = ''
    const { query, params, meta } = item
    if (query?.tagsViewName || params?.tagsViewName) {
        // 非国际化
        tagsViewName = query?.tagsViewName || params?.tagsViewName
    } else {
        // 非自定义 tagsView 名称
        tagsViewName = meta.title
    }
    return tagsViewName
}

/**
 * 设置浏览器标题国际化
 * @method const title = setTitle(); ==> title()
 */
export function setTitle() {
    const stores = useThemeConfig(pinia)
    const { themeConfig } = storeToRefs(stores)
    nextTick(() => {
        let webTitle: string | undefined
        const globalTitle: string = themeConfig.value.globalTitle
        const { path, meta } = router.currentRoute.value
        if (path === '/login') {
            webTitle = meta.title
        } else {
            webTitle = setTagsViewNameI18n(router.currentRoute.value)
        }
        document.title = webTitle ? `${webTitle} - ${globalTitle}` : globalTitle
    })
}

/**
 * 图片懒加载
 * @param el dom 目标元素
 * @param arr 列表数据
 * @description data-xxx 属性用于存储页面或应用程序的私有自定义数据
 */
export const lazyImg = (el: string, arr: EmptyArrayType) => {
    const io = new IntersectionObserver((res) => {
        res.forEach((v: any) => {
            if (v.isIntersecting) {
                const { img, key } = v.target.dataset
                v.target.src = img
                v.target.onload = () => {
                    io.unobserve(v.target)
                    arr[key].loading = false
                }
            }
        })
    })
    nextTick(() => {
        document.querySelectorAll(el).forEach(img => io.observe(img))
    })
}

/**
 * 对象深克隆
 * @param obj 源对象
 * @returns 克隆后的对象
 */
export function deepClone<T = any>(obj: T): T {
    let newObj: any
    try {
        newObj = Array.isArray(obj) ? [] : {}
    } catch (error) {
        newObj = {}
    }
    for (const attr in obj) {
        if (obj[attr] && typeof obj[attr] === 'object') {
            newObj[attr] = deepClone(obj[attr])
        } else {
            newObj[attr] = obj[attr]
        }
    }
    return newObj
}

/**
 * 判断是否是移动端
 */
export function isMobile() {
    if (
        navigator.userAgent.match(
            /('phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone')/i,
        )
    ) {
        return true
    } else {
        return false
    }
}

/**
 * 判断数组对象中所有属性是否为空，为空则删除当前行对象
 * @description @感谢大黄
 * @param list 数组对象
 * @returns 删除空值后的数组对象
 */
export function handleEmpty(list: EmptyArrayType) {
    const arr = []
    for (const i in list) {
        const d = []
        for (const j in list[i]) {
            d.push(list[i][j])
        }
        const len = d.filter(item => item === '').length
        if (len !== d.length) {
            arr.push(list[i])
        }
    }
    return arr
}

/**
 * 打开外部链接
 * @param val 当前点击项菜单
 */
export function handleOpenLink(val: RouteItem) {
    const { origin, pathname } = window.location
    router.push(val.path)
    if (verifyUrl(val.meta?.isLink || '')) window.open(val.meta?.isLink)
    else window.open(`${origin}${pathname}#${val.meta?.isLink}`)
}

// 页面添加水印效果
const setWatermark = (str: string) => {
    const id = '1.23452384164.123412416'
    if (document.getElementById(id) !== null) document.body.removeChild(<HTMLElement>document.getElementById(id))
    const can = document.createElement('canvas')
    can.width = 200
    can.height = 130
    const cans = <CanvasRenderingContext2D>can.getContext('2d')
    cans.rotate((-20 * Math.PI) / 180)
    cans.font = '12px Vedana'
    cans.fillStyle = 'rgba(200, 200, 200, 0.30)'
    cans.textBaseline = 'middle'
    cans.fillText(str, can.width / 10, can.height / 2)
    const div = document.createElement('div')
    div.id = id
    div.style.pointerEvents = 'none'
    div.style.top = '0px'
    div.style.left = '0px'
    div.style.position = 'fixed'
    div.style.zIndex = '10000000'
    div.style.width = `${document.documentElement.clientWidth}px`
    div.style.height = `${document.documentElement.clientHeight}px`
    div.style.background = `url(${can.toDataURL('image/png')}) left top repeat`
    document.body.appendChild(div)
    return id
}

/**
 * 页面添加水印效果
 * @method set 设置水印
 * @method del 删除水印
 */
export const watermark = {
    // 设置水印
    set: (str: string) => {
        let id = setWatermark(str)
        if (document.getElementById(id) === null) id = setWatermark(str)
    },
    // 删除水印
    del: () => {
        const id = '1.23452384164.123412416'
        if (document.getElementById(id) !== null) document.body.removeChild(<HTMLElement>document.getElementById(id))
    },
}
