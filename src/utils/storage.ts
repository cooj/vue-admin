// import Cookies from 'js-cookie'

/**
 * window.localStorage 浏览器永久缓存
 * @method set 设置永久缓存
 * @method get 获取永久缓存
 * @method remove 移除永久缓存
 * @method clear 移除全部永久缓存
 */
export const Local = {
    // 查看 v2.4.3版本更新日志
    setKey(key: string) {
        // @ts-expect-error v2.4.3
        return `${__NEXT_NAME__}:${key}`
    },
    // 设置永久缓存
    set<T>(key: string, val: T) {
        window.localStorage.setItem(Local.setKey(key), JSON.stringify(val))
    },
    // 获取永久缓存
    get<T = unknown>(key: string): T | null {
        const json = window.localStorage.getItem(Local.setKey(key))
        try {
            return JSON.parse(json as string)
        } catch (err) {
            return json as T
        }
    },
    // 移除永久缓存
    remove(key: string) {
        window.localStorage.removeItem(Local.setKey(key))
    },
    // 移除全部永久缓存
    clear() {
        window.localStorage.clear()
    },
}

/**
 * window.sessionStorage 浏览器临时缓存
 * @method set 设置临时缓存
 * @method get 获取临时缓存
 * @method remove 移除临时缓存
 * @method clear 移除全部临时缓存
 */
export const Session = {
    // 设置临时缓存
    set<T>(key: string, val: T) {
        // if (key === 'token') return Cookies.set(key, val)
        window.sessionStorage.setItem(Local.setKey(key), JSON.stringify(val))
    },
    // 获取临时缓存
    get<T = unknown>(key: string): T | null {
        // if (key === 'token') return Cookies.get(key)
        const json = window.sessionStorage.getItem(Local.setKey(key))
        try {
            return JSON.parse(json as string)
        } catch (err) {
            return json as T
        }
        // return json ? JSON.parse(json) : json
    },
    // 移除临时缓存
    remove(key: string) {
        // if (key === 'token') return Cookies.remove(key)
        window.sessionStorage.removeItem(Local.setKey(key))
    },
    // 移除全部临时缓存
    clear() {
        // Cookies.remove('token')
        window.sessionStorage.clear()
    },
}
