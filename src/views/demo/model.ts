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
