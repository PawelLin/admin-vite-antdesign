import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios'
import { message } from 'ant-design-vue'
import { API, Request, Response } from './api'

class Http {
    instance
    constructor(config?: AxiosRequestConfig) {
        this.instance = axios.create(config)
        this.instance.interceptors.request.use(
            function (config) {
                // 在发送请求之前做些什么
                config.headers = {
                    token: '',
                }
                return config
            },
            function (error) {
                // 对请求错误做些什么
                return Promise.reject(error)
            }
        )
        this.instance.interceptors.response.use(
            function (response) {
                // 2xx 范围内的状态码都会触发该函数。
                // 对响应数据做点什么
                if (response.data.code && response.data.code !== '0000') {
                    message.error(response.data.message)
                    return Promise.reject(new Error(response.data.code))
                }
                return response
            },
            function (error) {
                // 超出 2xx 范围的状态码都会触发该函数。
                // 对响应错误做点什么
                const tip = error.response.status === 404 ? '出错啦，您访问的地址不存在' : '出错啦，服务端错误'
                message.error(tip)
                return Promise.reject(error)
            }
        )
    }
    get<T extends keyof API>(url: T, params?: Request<T>, config = {}): Promise<Response<T>> {
        return this.instance.get(url, { params, ...config })
    }
    post<T extends keyof API>(url: T, data?: Request<T>, config = {}): Promise<Response<T>> {
        return this.instance.post(url, data, config)
    }
}
export default new Http({ baseURL: import.meta.env.VITE_API_URL })
