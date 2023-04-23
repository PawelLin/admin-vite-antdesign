<script lang="ts" setup>
import { Menu } from './hooks/model'

const props = defineProps<{ data: Menu[] }>()
</script>

<template>
    <template v-for="{ title, children, name, icon, parent } in props.data">
        <template v-if="children?.length">
            <a-sub-menu :title="title" :key="name">
                <template #icon>
                    <CustomIcon :icon="icon" />
                </template>
                <SubMenu :data="children" />
            </a-sub-menu>
        </template>
        <a-menu-item v-else :key="name">
            <template #icon>
                <CustomIcon :icon="icon" />
            </template>
            <router-link :to="name.match(/^https?:/) ? { name: parent?.name, query: { iframe: name } } : { name }">
                {{ title }}
            </router-link>
        </a-menu-item>
    </template>
</template>
