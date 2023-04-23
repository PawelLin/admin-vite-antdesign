import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTagStore } from '@/store'
import { firstFixedRoute } from '@/router'
import { Menu, Tag, Breadcrumb } from './model'
import http from '@/libs/axios'

export function useMenu() {
    const route = useRoute()
    const tagStore = useTagStore()
    const menus = ref<Menu[]>([])
    const selectedKeys = ref<string[]>([])
    const openKeys = ref<string[]>([])
    const breadcrumbs = ref<Breadcrumb[]>([])
    const collapsed = ref(false)
    const setCollapsed = () => (collapsed.value = !collapsed.value)
    const nameToItem: { [propName: string]: Menu } = {}
    const keyMap: { [propName: string]: string[] } = {}
    watch(
        [() => route.fullPath, () => route.name as string, collapsed],
        ([fullPath, name, collapsed], [preFullPath, preName]) => {
            if (name) {
                const { params, query, meta: routeMeta } = route
                const meta = Object.assign({ title: '', active: false }, routeMeta)
                let parent = meta.parent
                meta.title = (query.rename || meta.title) as string
                if (!parent) {
                    const item = nameToItem[(query.iframe as string) || name]
                    if (item) {
                        meta.title = item.title
                        meta.icon = item.icon
                        meta.parent = parent = item.name
                    }
                }
                selectedKeys.value = parent ? [parent] : []
                if (!collapsed) {
                    openKeys.value = parent ? (keyMap[parent] = keyMap[parent] || getKeyMap(parent)) : []
                }
                if (!tagStore.data.length) {
                    const { name: firstName, meta: firstMeta } = firstFixedRoute
                    const data = {
                        name: firstName,
                        id: `${firstName}-${Date.now()}`,
                        meta: firstMeta,
                    }
                    tagStore.changeData(data)
                }
                if (fullPath !== preFullPath || !preName) {
                    const data = { name, query, params, id: `${name}-${Date.now()}`, meta }
                    tagStore.changeData(data)
                    breadcrumbs.value = getBreadcrumbs(name, data)
                }
            }
        }
    )
    function getKeyMap(name: string) {
        const keyMap = []
        let item = nameToItem[name]
        while (item.parent?.name) {
            keyMap.unshift(item.parent.name)
            item = nameToItem[item.parent.name]
        }
        return keyMap
    }
    function getBreadcrumbs(name: string, data: Tag): Breadcrumb[] {
        const breadcrumbs: Breadcrumb[] = []
        let item = nameToItem[name]
        const queryIframe = data?.query?.iframe
        if (!item || queryIframe) {
            breadcrumbs.unshift({
                id: data.id,
                name: data.name,
                title: data.meta.title,
                query: data.query,
                params: data.params,
            })
            item = nameToItem[queryIframe ? data.name : (data.meta.parent as string)]
        }
        if (item) {
            breadcrumbs.unshift({ name: item.name, title: item.title, link: !item.children?.length })
            while (item.parent?.name) {
                item = nameToItem[item.parent.name]
                breadcrumbs.unshift({ name: item.name, title: item.title, link: !item.children?.length })
            }
        }
        return breadcrumbs
    }
    function getMenu(data: Menu[]) {
        const result = []
        const children: { [propName: number]: Menu[] } = {}
        const parent: { [propName: number]: Menu['parent'] } = {}
        for (const item of data) {
            const { parentId: pid, id } = item
            children[pid] = children[pid] || []
            parent[id] = Object.assign(parent[id] || {}, { name: item.name })
            nameToItem[item.name] = item
            if (pid === 0) {
                result.push(item)
            } else {
                children[pid].push(item)
            }
            children[id] = children[id] || []
            item.parent = parent[pid] || (parent[pid] = { name: '' })
            item.children = children[id]
        }
        return result
    }
    http.get('/resource')
        .then((res) => {
            const data = res.data.data
            menus.value = getMenu(data?.menus || [])
        })
        .catch(() => ({}))
    return { selectedKeys, openKeys, menus, breadcrumbs, collapsed, setCollapsed }
}
