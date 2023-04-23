import { defineStore } from 'pinia'
import { RouteLocationRaw } from 'vue-router'
import { Tag } from '@/components/layout/hooks/model'
import { objNotEqual } from '@/libs/tools'

export const useTagStore = defineStore('tag', {
    state: () => {
        return {
            data: (JSON.parse(sessionStorage.getItem('tag') || '{}').data || []) as Tag[],
            tagFilterKeys: ['name', 'query', 'params'],
        }
    },
    actions: {
        changeData(item: Tag) {
            let nonExist = true
            this.data.forEach((item1) => {
                if (objNotEqual(item, item1, this.tagFilterKeys)) {
                    item1.meta.active = false
                } else {
                    item1.meta.active = true
                    nonExist = false
                }
            })
            if (nonExist) {
                item.meta.active = true
                this.data.push(item)
            }
        },
        removeData(item: Tag | RouteLocationRaw) {
            let index = -1
            for (let i = 0; i < this.data.length; i++) {
                if (!objNotEqual(item as object, this.data[i], this.tagFilterKeys)) {
                    this.data.splice(i, 1)
                    index = i
                    break
                }
            }
            return index
        },
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'tag',
                storage: sessionStorage,
                paths: ['data'],
            },
        ],
    },
})
