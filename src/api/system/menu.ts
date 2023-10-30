/**
 * 菜单相关api接口
 */
export const ApiMenu = {
    getList: () => Promise.resolve('view'),
    /**
     * 获取权限菜单
     * @returns {Promise}   Promise resolved when
     */
    getAuthList: () => Promise.resolve(123),
}
