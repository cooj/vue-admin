import { get, post } from '@/utils/request'

/**
 * 公共api
 * @method upload 文件上传
 * @method delImg 删除图片
 */
export const ApiCommon = {
    // 验证码
    getCode: () => get('/api/admin_auth/validate_code'),

    /**
     * 文件上传
     * @param data
     */
    upload: (data: CommonUploadType) => post<{ src: string }>('/api/common/upload_image', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        timeout: 60000,
    }),

    /**
     * 删除图片
     * @param data 参数
     * @param data.src src 图片地址
     */
    delImg: (data: { src: string }) => post('/api/common/delete_image', data),

    /**
     * 生成单号
     * @param data 参数
     * @param data.prefix prefix   单号前缀
     */
    billNum: (data: { prefix: string }) => post<{ sn: string }>('/api/common/create_sn', data),

    /**
     * 清除后端数据缓存
     */
    clear: () => post('/api/common/clear_cache'),

}
