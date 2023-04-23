<script lang="ts" setup>
import { computed } from 'vue'
import { Menu } from './hooks/model'

const props = defineProps<{
    width?: string
    data: Menu[]
    selectedKeys: string[]
    openKeys: string[]
    collapsed: boolean
}>()
const emit = defineEmits(['update:selectedKeys', 'update:openKeys'])
const selectedKeysModel = computed<string[]>({
    get() {
        return props.selectedKeys
    },
    set(value) {
        emit('update:selectedKeys', value)
    },
})
const openKeysModel = computed<string[]>({
    get() {
        return props.openKeys
    },
    set(value) {
        emit('update:openKeys', value)
    },
})
</script>

<template>
    <a-layout-sider :width="props.width" :collapsed="collapsed">
        <a-menu mode="inline" v-model:selectedKeys="selectedKeysModel" v-model:openKeys="openKeysModel">
            <SubMenu :data="data" />
        </a-menu>
    </a-layout-sider>
</template>
