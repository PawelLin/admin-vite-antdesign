import { useRoute, useRouter, RouteLocationRaw } from 'vue-router'
import { message } from 'ant-design-vue'
import { useTagStore } from '@/store/index'
export function useCommon() {
    const route = useRoute()
    const router = useRouter()
    const tagStore = useTagStore()
    function routerPush(data: RouteLocationRaw) {
        tagStore.removeData(route)
        router.push(data)
    }
    function routerPushTip(data: RouteLocationRaw, content: string, timeout = 1) {
        routerPush(data)
        message.success(content, timeout)
    }
    return { routerPush, routerPushTip }
}
