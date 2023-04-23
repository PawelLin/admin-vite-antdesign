# admin-vite-antdesign

## 简介
admin-vite-antdesign是基于Vue3，由Vite+Ant Design构建的一套管理端模板。
[在线访问](https://admin-vite-antdesign.vercel.app/)
## 整体模块

## 请求模块
请求公共数据类型定义
```js
// @/libs/axios/api.ts
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
}
export type Request<T extends keyof API> = API[T]['request'] | null
export type Response<T extends keyof API> = AxiosResponse<API[T]['response']>
```
### Basic Usage
在相应功能下新增model.ts文件定义数据类型及请求
```js
// model.ts
export interface SearchForm {
    name: string
    type: string
    address: string
}
export interface Form extends SearchForm {
    id: number | undefined
}
declare module '@/libs/axios/api' {
    interface API {
        '/demo/list': {
            request: SearchForm & { current: number }
            response: ResponseData<Form[]> & ResponsePage
        }
        '/demo/add': {
            request: Form
            response: null
        }
    }
}
```

## 开发模板
```shell
.
└─ demo
    ├── enums.ts      枚举定义
    ├── FormDemo.vue  表单页面
    ├── List.vue      列表页面
    └── model.ts      数据类型及接口定义
```
## 自定义组件
### CustomIcon
### IconfontIcon

## 自定义主题色