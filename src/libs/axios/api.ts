import { AxiosResponse } from 'axios'

export interface ResponsePage {
    page: {
        current: number
        total: number
    }
}

export interface ResponseData<T> {
    code: string
    data?: T
    message?: string
}
export interface API {
    '/resource': {
        request: null
        response: ResponseData<{
            menus: []
            buttons: []
        }>
    }
    '/book/add': {
        request: {
            name: string
            sold: number
        }
        response: ResponseData<{
            id: number
        }>
    }
    '/book/detail': {
        request: {
            id: number
        }
        response: ResponseData<{
            id: number
            name: string
            sold: number
        }>
    }
}
export type Request<T extends keyof API> = API[T]['request'] | null
export type Response<T extends keyof API> = AxiosResponse<API[T]['response']>
