// 一些静态变量，可能多个组件会用到这个变量

// 角色标识
export const USER_ROLE = {
    root: 'super_admin', // 超级管理员
    sale: 'salesman', // 业务员
    purchase: 'purchase', // 采购
    finance: 'finance', // 财务
    supplier: 'supplier', // 供应商
    warehouse: 'warehouse', // 仓管
    company_admin: 'company_admin', // 管理员

    wm_warehouse: 'wm_ckrc', // 外贸仓管（入仓）
    wm_warehouse2: 'wm_ckdb', // 外贸仓管（打包）

    wm_finance: 'wm_cwfk', // 外贸财务（付款）
    wm_finance2: 'wm_cwsk', // 外贸财务（收款）

    wm_finance3: 'wm_wlxjcwsk', // 物流询价@财务收款

}

export const STATE_DATA = [
    {
        label: '未审核',
        value: 1,
    },
    {
        label: '已审核',
        value: 2,
    },
]

/**
 * 全局默认分页设置
 */
export const PAGINATION = {
    page: 1, // 当前页面
    page_size: 20, // 每页显示的数量
    page_sizes: [20, 50, 100, 200, 500],
    total: 0,
}
