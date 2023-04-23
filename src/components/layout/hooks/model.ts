export interface Menu {
    title: string
    icon: string
    parentId: number
    id: number
    name: string
    children?: Menu[]
    parent?: {
        name: string
    }
}

export interface Tag {
    id: string
    name: string
    query?: {
        [x in string]: unknown
    }
    params?: object
    meta: {
        title: string
        active?: boolean
        icon?: string
        fixed?: boolean
        noCache?: boolean
        parent?: string
    }
}

export interface Breadcrumb {
    name: string
    title: string
    id?: string
    link?: boolean
    query?: {
        [x in string]: unknown
    }
    params?: object
}
