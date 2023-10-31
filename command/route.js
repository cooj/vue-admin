// 导入fs模块
import { readFile, writeFile } from 'node:fs'

// import { dynamicRoutes } from './src/router/route'

// console.log('dynamicRoutes :>> ', dynamicRoutes)

/**
 * 树形json数据数组转平级普通数组
 * @param classifyList 嵌套数组
 * @param id 关联的键值，默认id
 * @param key 上级所属的键值，默认pid
 * @param children 嵌套数组的子类，子类的键值，默认children
 * @returns any[]
 */
function transformLevelArr(classifyList, id = 'id', key = 'pid', children = 'children') {
    const temp = []
    const forFn = function (arr, val = 0) {
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i]
            if (val) item[key] = val
            temp.push(item)

            if (item[children]) forFn(item[children], item[id])
        }
    }
    forFn(classifyList)
    return temp
}

const readUrl = './src/router/route.ts'
const writeUrl = './src/router/layout.ts'

readFile(readUrl, 'utf8', (err, data) => {
    // 如果读取成功，则err的值为null，dataStr会显示例1.txt的文本内容
    // 如果读取失败，err的值为错误对象，展示出错误信息，data的值为undefined
    if (err) return
    // console.log(err)
    // console.log("------")
    // console.log(data)
    if (data) {
        const arr = data.split('// ||****')
        // console.log('arr :>> ', arr);
        // console.log('arr[1] :>> ', arr[1].replaceAll("() => import", ''));
        const str = arr[1] || ''
        if (!str) return console.log('未查找到‘// ||****’包括的内容')
        const reg = /.*\=/
        // let regex = /(\[)[\s\S]*(\])/;      // 匹配[]的内容
        // console.log('str.match(regex) :>> ', str.match(regex));
        let str2 = str.replace(reg, '')
        str2 = str2.replaceAll('() => import', '')
        // console.log('str2 :>> ', JSON.parse(str2))
        // // console.log('Array.from(str2) :>> ', Array.from(str2));
        // console.log('eval(str2) :>> ', eval(str2));
        const treeArr = eval(str2) // eslint-disable-line no-eval
        const treeArrChild = treeArr[0].children
        const routeList = transformLevelArr(treeArrChild)
        // console.log('res :>> ', routeList);
        const layouts = []
        routeList.forEach((item, index) => {
            // console.log('item :>> ', item.component);
            if (!item.component) return
            const res = item.component
            // console.log(res)
            if (!res.includes('layout/route')) {
                const urlReg = /(?<=\/views\/).+(?=\.vue)/g
                const option = {}
                const txt = res.match(urlReg)
                if (txt) {
                    option.value = txt[0]
                    option.name = item.name
                    option.title = item.meta.title
                    option.component = item.component
                    layouts.push(option)
                }
            }
        })
        // console.log('layouts :>> ', layouts);
        // 过滤 undefined 的数据
        const layout = layouts.filter(Boolean)
        // console.log(layout);
        const main = [
            {
                title: '主结构',
                name: 'layout',
                value: 'layout/route/parent',
                component: '@/layout/route/parent.vue',
            },
            {
                title: 'iframe',
                name: 'iframe',
                value: 'layout/route/iframe',
                component: '@/layout/route/iframe.vue',
            },
            ...layout,
        ]
        const content = `/* eslint-disable style/quote-props */
export const MainPage = ${JSON.stringify(main)}
`
        // const content = `export const MainPage = ${main}`
        // console.log('content :>> ', content);
        // 调用fs.writeFile()方法
        writeFile(writeUrl, content, (err) => {
            // 如果err为true，则文件写入失败，并返回失败信息
            if (err) {
                return console.log(`文件写入失败！${err.message}`)
            }
            // 若文件写入成功，将显示“文件写入成功”
            console.log('ready!')
        })
    }
})
