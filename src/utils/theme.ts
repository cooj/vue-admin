import { ElMessage } from 'element-plus'

/**
 * 颜色转换函数
 * @method hexToRgb hex 颜色转 rgb 颜色
 * @method rgbToHex rgb 颜色转 Hex 颜色
 * @method getDarkColor 加深颜色值
 * @method getLightColor 变浅颜色值
 */
export function useChangeColor() {
    // str 颜色值字符串
    const hexToRgb = (str: string): any => {
        let hex: any = ''
        const reg = /^\#?[0-9A-Fa-f]{6}$/
        if (!reg.test(str)) {
            ElMessage.warning('输入错误的hex')
            return ''
        }
        str = str.replace('#', '')
        hex = str.match(/../g)
        for (let i = 0; i < 3; i++) hex[i] = Number.parseInt(hex[i], 16)
        return hex
    }
    // r 代表红色 | g 代表绿色 | b 代表蓝色
    const rgbToHex = (r: any, g: any, b: any): string => {
        const reg = /^\d{1,3}$/
        if (!reg.test(r) || !reg.test(g) || !reg.test(b)) {
            ElMessage.warning('输入错误的rgb颜色值')
            return ''
        }
        const hex = [r.toString(16), g.toString(16), b.toString(16)]
        for (let i = 0; i < 3; i++) if (hex[i].length === 1) hex[i] = `0${hex[i]}`
        return `#${hex.join('')}`
    }
    // color 颜色值字符串 | level 变浅的程度，限0-1之间
    const getDarkColor = (color: string, level: number): string => {
        const reg = /^\#?[0-9A-Fa-f]{6}$/
        if (!reg.test(color)) {
            ElMessage.warning('输入错误的hex颜色值')
            return ''
        }
        const rgb = useChangeColor().hexToRgb(color)
        for (let i = 0; i < 3; i++) rgb[i] = Math.floor(rgb[i] * (1 - level))
        return useChangeColor().rgbToHex(rgb[0], rgb[1], rgb[2])
    }
    // color 颜色值字符串 | level 加深的程度，限0-1之间
    const getLightColor = (color: string, level: number): string => {
        const reg = /^\#?[0-9A-Fa-f]{6}$/
        if (!reg.test(color)) {
            ElMessage.warning('输入错误的hex颜色值')
            return ''
        }
        const rgb = useChangeColor().hexToRgb(color)
        for (let i = 0; i < 3; i++) rgb[i] = Math.floor((255 - rgb[i]) * level + rgb[i])
        return useChangeColor().rgbToHex(rgb[0], rgb[1], rgb[2])
    }
    return {
        hexToRgb,
        rgbToHex,
        getDarkColor,
        getLightColor,
    }
}
