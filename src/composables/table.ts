import type { TableColumnCtx, TableInstance } from 'element-plus'
import { ref } from 'vue'
import { wait } from '@/utils/common'

export interface TableSummaryContent<T> {
    countText?: [number, string] // 显示合计的位置和文字，[0,'合计']
    precision?: number // 保留小数位数
    data: {
        [key in keyof T]?: {
            value?: number
            precision?: number
            text?: string
        }
    }
}

/**
 * element-plus table组件合计方法
 * @param param 原有element-plus合计计算方法返回的参数
 * @param option 合计的数据选项，需要合计的字段、保留小数位数、合计文字显示等等
 * @returns string[]
 */
export const useTableSummaries = <T = any>(param: {
    columns: TableColumnCtx<T>[]
    data: T[]
}, option: TableSummaryContent<T>) => {
    const { columns } = param
    const data = ref(param.data)
    const sums: string[] = []
    const num = option.countText?.[0] ?? 0
    const countText = option.countText?.[1] ?? '合计'
    columns.forEach((column, index) => {
        if (index === num) return sums[index] = countText

        const textArr = Object.keys(option.data)
        const key = column.property as keyof T
        if (textArr.includes(key as string)) {
            let count = 0
            if (option.data[key]?.text) {
                return sums[index] = option.data[key]?.text || ''
            } else if (option.data[key]?.value || Number(option.data[key]?.value) === 0) {
                count = Number(option.data[key]?.value) ?? 0
            } else {
                const values = data.value.map(item => Number(item[key]))
                count = values.reduce((prev, curr) => {
                    const value = Number(curr)
                    return Number.isNaN(value) ? prev : prev + curr
                }, 0)
            }
            let num = option.precision ?? 2 // 默认保留两位小数
            if (typeof (option.data[key]?.precision) === 'number') num = option.data[key]?.precision ?? 0

            return sums[index] = `${count.toFixed(num)}`
        }
        return sums[index] = ''
    })
    return sums
}

/**
 * element-plus table组件缓存滚动位置不对的情况
 * @param tableRef table组件对象
 * @returns string[]
 */
export const useTableScrollbarLoad = async (tableRef?: TableInstance) => {
    if (!tableRef) return
    // const scrollBarRef = tableRef?.scrollBarRef
    // console.log(scrollBarRef)
    // scrollBarRef.handleScroll()
    // scrollBarRef.wrapRef.scrollLeft
    // scrollBarRef.update()
    // tableRef.value?.doLayout()

    function getTranslateValue(translateString: string) {
        const reg = /[1-9][0-9]*\.?[0-9]*/g
        const matchArr = translateString.match(reg)
        if (!matchArr?.[0]) return 0

        return Number(matchArr?.[0]) * 0.01
    }

    await wait(150)
    nextTick(() => {
        // 获取y轴滚动距离
        const vertical = tableRef.$el.querySelector('.el-scrollbar__bar.is-vertical')
        // console.log(vertical)
        // console.log(vertical.offsetHeight)
        // console.log(vertical.clientHeight)
        const y = vertical.querySelector('.el-scrollbar__thumb').style.transform
        // console.log('y :>> ', y);
        const translateY = getTranslateValue(y)

        const numY = translateY ? vertical.offsetHeight * translateY : 0

        // 获取x轴滚动距离
        const horizontal = tableRef.$el.querySelector('.el-scrollbar__bar.is-horizontal')
        // console.log(horizontal)
        // console.log('horizontal.offsetWidth :>> ', horizontal.offsetWidth)
        const x = horizontal.querySelector('.el-scrollbar__thumb').style.transform
        // console.log('x :>> ', x)
        const translateX = getTranslateValue(x)
        // console.log('translateX :>> ', translateX)

        const numX = translateX ? horizontal.offsetWidth * translateX : 0
        // console.log({
        //     left: numX,
        //     top: numY,
        // })
        tableRef.scrollTo({
            left: numX,
            top: numY,
        })
    })
}
