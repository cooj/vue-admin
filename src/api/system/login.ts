import { get } from '@/utils/request'

/**
 * 登录相关api接口
 */
export const ApiLogin = {
    // 登录
    login: (data: any) => get('/login', data),

    // 退出登录
    logout: () => get('/logout'),
}
