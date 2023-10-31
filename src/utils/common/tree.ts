/**
 * 根据当前一级id查找上级所有的id
 * @param classifyList 嵌套数组
 * @param val 需要查找的值
 * @param key 查找值对应的键值，默认为id
 * @param children 子类的键值，默认children
 * @returns string[]|number[]
 */
export function getParentId<T extends object, K extends keyof T>(classifyList: T[], val: T[keyof T], key = 'id' as K, children = 'children' as keyof T): T[K][] {
    const temp: any[] = [val]
    const forFn = function (arr: any[], id: T[keyof T]) {
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i]
            if (item[children]) {
                const data1 = item[children].find((item1: any) => item1[key] === id)
                if (data1) {
                    temp.unshift(item[key]) // 数组前追加进去
                    forFn(classifyList, item[key])
                    break
                } else {
                    forFn(item[children], id)
                }
            }
        }
    }
    forFn(classifyList, val)
    return temp
}

/**
 * 根据当前一级id(或字段)查找上级所有的节点内容
 * @param classifyList 嵌套数组
 * @param val 需要查找的值
 * @param key 查找值对应的键值，默认为id
 * @param children 子类的键值，默认children
 * @returns any[]
 */
export function getParentNode<T = any>(classifyList: Array<T>, val: T[keyof T], key = 'id' as keyof T, children = 'children' as keyof T): T[] {
    const temp: any[] = []
    const forFn = function (arr: any[], id: T[keyof T]) {
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i]
            // 找到值对应的那一项，追加进去
            if (item[key] === val) temp.push(item)
            if (item[children]) {
                const data1 = item[children].find((item1: any) => item1[key] === id)
                if (data1) {
                    temp.unshift(item) // 数组前面追加进去
                    forFn(classifyList, item[key])
                    break
                } else {
                    forFn(item[children], id)
                }
            }
        }
    }
    forFn(classifyList, val)
    return temp
}

/**
 * 根据当前一级id(或字段)查找父节点下的内容（获取兄弟项跟自己）
 * @param classifyList 嵌套数组
 * @param val 需要查找的值
 * @param key 查找值对应的键值，默认为id
 * @param children 子类的键值，默认children
 * @returns any[]
 */
export function getSiblingsNode<T = any>(classifyList: Array<T>, val: T[keyof T], key = 'id' as keyof T, children = 'children' as keyof T): T[] {
    let temp: any[] = []
    const forFn = function (arr: any[], id: T[keyof T]) {
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i]
            // 找到值对应的那一项，追加进去
            if (temp.length) break
            if (item[key] === val) {
                temp = arr
                break
            }
            if (item[children] && item[children].length > 0) forFn(item[children], id)
        }
    }
    forFn(classifyList, val)
    return temp
}

/**
 * @function 将普通的数组转换为父子结构（一级数组=>多级数组）
 * @param sNodes 普通的数组（需要转换成父子结构的数组）
 * @param child 子类的字段名，默认为children
 * @param id 数组项唯一的id字段名，默认为id
 * @param pid 归属于哪个id的字段名（父id字段名），默认为pid
 * @returns Array
 */
export function transformTreeArr<T = any>(sNodes: T[], child = 'children' as keyof T, id = 'id' as keyof T, pid = 'pid' as keyof T) { // 将普通的数组转换为父子结构
    // var id = "id";    //id字段名
    // var pid = "pid";  //父id字段名

    const r = []
    const tmpMap: any = {}
    for (let i = 0; i < sNodes.length; i++) {
        // 判断原先数组有没有这个字段
        if (sNodes[i][child]) {
            throw new Error(`数组中存在${String(child)}字段，换一个参数`)
        }
        tmpMap[sNodes[i][id]] = sNodes[i]
    }
    for (let i = 0; i < sNodes.length; i++) {
        const p = tmpMap[sNodes[i][pid]] // 得到会在子类的项

        if (p && sNodes[i][id] !== sNodes[i][pid]) {
            // 判断是否有child数组,没有就给个空数组（也就是刚开始的时候）
            p[child] = p[child] ? p[child] : []
            p[child].push(sNodes[i]) // 追加到当前项
        } else {
            r.push(sNodes[i])
        }
    }
    return r
}

/**
 * 树形json数据数组转平级普通数组
 * @param classifyList 嵌套数组
 * @param id 关联的键值，默认id
 * @param key 上级所属的键值，默认pid
 * @param children 嵌套数组的子类，子类的键值，默认children
 * @returns any[]
 */
export function transformLevelArr<T = any>(classifyList: Array<T>, id = 'id' as keyof T, key = 'pid', children = 'children' as keyof T): T[] {
    const temp: any[] = []
    const forFn = function (arr: string | any[], val = 0) {
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

/**
 * 传入参数：需要遍历的json，需要匹配的id(根据id取得对应的那一项)
 * @param data 数组数据，平级或树形数组皆可
 * @param val 键值id的值，（唯一）
 * @param key id 默认（唯一不重复的键值）
 * @param children 子类
 * @returns {t|undefined} 对应的项
 */
export function findNodeItem<T = any>(data: Array<T>, val: T[keyof T], key = 'id' as keyof T, children = 'children' as keyof T): T | undefined {
    let temp: any = ''
    const forFn = function (arr: any[], id: T[keyof T]) {
        for (let i = 0; i < arr.length; i++) {
            if (temp) break // 已经拿到值了,就退出循环
            const item = arr[i]
            // 找到值对应的那一项，赋值
            if (item[key] === val) temp = item

            if (item[children]) forFn(item[children], id)
        }
    }
    forFn(data, val)
    return temp
}

/**
 * 根据当前一级id查找上级所有的id  (vue路由使用，查找meta里面的值)
 * @param classifyList 嵌套数组
 * @param val 需要查找的值
 * @param key 查找值对应的键值，默认为id
 * @param children 子类的键值，默认children
 * @returns string[]|number[]
 */
export function getParentRouterId<T = any>(classifyList: T[], val: T[keyof T], key = 'id' as keyof T, children = 'children' as keyof T) {
    const temp = [val]
    const forFn = function (arr: any[], id: T[keyof T]) {
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i]
            if (item[children]) {
                const data1 = item[children].find((item1: any) => item1.meta[key] === id)
                if (data1) {
                    temp.unshift(item.meta[key]) // 数组前追加进去
                    forFn(classifyList, item.meta[key])
                    break
                } else {
                    forFn(item[children], id)
                }
            }
        }
    }
    forFn(classifyList, val)
    return temp
}

/**
 * 相同id，及子类设置禁用
 * @param data 树形数据
 * @param val 值
 * @param key val对应的键名
 * @param children 子类集合
 * @param disable 设置禁用的字段，默认使用的是a_disable
 * @returns {T[]} array
 */
export function setDisableTree<T = any>(data: T[], val: number | string, key = 'id' as keyof T, children = 'children' as keyof T, disable = 'a_disable'): (T & { disable?: boolean })[] {
    const result = data.map((item: any) => {
        if (item[key] === val || val === '_s_') {
            item[disable] = true
            if (item[children] && item[children].length > 0) {
                // 如果有子集，则把子集作为参数重新执行本方法
                item[children] = setDisableTree(item[children], '_s_', key, children, disable)
            }
        } else {
            if (item[children] && item[children].length > 0) {
                // 如果有子集，则把子集作为参数重新执行本方法
                item[children] = setDisableTree(item[children], val, key, children, disable)
            }
        }
        return item
    })
    return result
}

/**
 * 最后一项，指定类型设置禁用
 * @param data 树形数据
 * @param val 值
 * @param key val对应的键名
 * @param children 子类集合
 * @param disable 设置禁用的字段，默认使用的是a_disable
 * @returns {t[]} array
 */
export function setLastItemDisable<T = any>(data: T[], val: number | string, key = 'id' as keyof T, children = 'children' as keyof T, disable = 'a_disable'): (T & { disable?: boolean })[] {
    const result = data.map((item: any) => {
        if (item[children] && item[children].length > 0) {
            // 如果有子集，则把子集作为参数重新执行本方法
            item[children] = setLastItemDisable(item[children], val, key, children, disable)
        } else {
            if (item[key] === val) {
                item[disable] = true
            }
        }
        return item
    })
    return result
}

/**
 * 树形数据过滤（模糊匹配），上级匹配上就直接全部返回(包括子类)，匹配到子类就往上找父级
 * @param data 全部数据
 * @param keyword 用于模糊查询的关键字
 * @param name 查找关键字对应的那个键名
 * @param children 子类元素集合的键名，默认为'children'
 */
export const filterTreeList = <T = any>(data: T[], keyword: T[keyof T], name: keyof T, children = 'children' as keyof T): T[] => {
    const result = []
    let item: any
    for (item of data) {
        if (item[name].includes(keyword)) {
            result.push(item)
        } else if (item.children && item.children.length > 0) {
            const filteredChildren = filterTreeList(item.children, keyword, name, children)
            if (filteredChildren.length > 0) result.push({ ...item, children: filteredChildren })
        }
    }
    return result
}

/**
 * 树形数据查找到上一级（父级）
 * @param data 全部数据
 * @param val 用于模糊查询的关键字
 * @param key 查找关键字对应的那个键名
 * @param children 子类元素集合的键名，默认为'children'
 */
export const getParentItem = <T = any>(data: T[], val: T[keyof T], key: keyof T, children = 'children' as keyof T): T | undefined => {
    let temp: any = ''
    const forFn = function (arr: any[], id: T[keyof T]) {
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i]
            if (item[children]) {
                const data1 = item[children].find((item1: any) => item1[key] === id)
                if (data1) {
                    temp = item
                    break
                } else {
                    forFn(item[children], id)
                }
            }
        }
    }
    forFn(data, val)
    return temp || undefined
}

/**
 * 树形数组根据指定的树形过滤
 * @param arr 需要过滤的树形数组数据
 * @param val 值
 * @param key val对应的那个键值
 * @param children 子类元素的键值
 * @returns {T} array
 */
export const filterListTreeData = <T extends object>(arr: T[], val: any, key = 'id' as keyof T, children = 'children' as keyof T) => {
    return arr
        .filter(item => item[key] === val)
        .map((item) => {
            item = Object.assign({}, item)
            // @ts-expect-error 过滤后正确的children
            if (item[children]) item[children] = filterListTreeData(item[children], val, key, children)
            return item
        })
}
