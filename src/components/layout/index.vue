<script lang="ts">
export default {
    name: 'Layout',
}
</script>
<script lang="ts" setup>
import { computed } from 'vue'
import { useTagStore } from '@/store/index'
import { useMenu } from './hooks/useMenu'

const tagStore = useTagStore()
const tagNames = computed(() => tagStore.data.filter((item) => !item.meta.noCache).map((item) => item.name))
const { selectedKeys, openKeys, menus, breadcrumbs, collapsed, setCollapsed } = useMenu()
</script>

<template>
    <a-layout>
        <Header class="header" :collapsed="collapsed" :setCollapsed="setCollapsed" :breadcrumbs="breadcrumbs"></Header>
        <a-layout>
            <SiderMenu
                v-model:selectedKeys="selectedKeys"
                v-model:openKeys="openKeys"
                :data="menus"
                :collapsed="collapsed"
                class="sider"
                width="218px"
            />
            <a-layout-content class="content">
                <NavTag class="nav-tag-position" :collapsed="collapsed" />
                <div class="content-view">
                    <router-view v-slot="{ Component }">
                        <KeepAlive :include="tagNames">
                            <component :is="Component"></component>
                        </KeepAlive>
                    </router-view>
                    <div id="iframe"></div>
                </div>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<style lang="less" scoped>
@header-height: 64px;
.header {
    position: sticky;
    top: 0;
    left: 0;
    display: flex;
    padding: 0;
    height: @header-height;
    background-color: var(--custom-body-color);
    z-index: 2;
}
.sider {
    position: sticky;
    top: @header-height;
    left: 0;
    margin-right: -18px;
    height: calc(100vh - @header-height);
    overflow-y: scroll;
    background-color: var(--custom-body-color);
    :deep(.ant-menu-item):first-child {
        margin-top: 0;
    }
}
.nav-tag-position {
    position: sticky;
    top: @header-height;
    background-color: var(--custom-contain-color);
    padding-left: 2px;
    padding-right: 2px;
    z-index: 2;
}
.content {
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
    background-color: var(--custom-contain-color);
    box-shadow: 2px 0 7px var(--custom-contain-shadow-color) inset;
    z-index: 1;
    &-view {
        padding: 0 10px;
        flex: 1;
        overflow-x: hidden;
    }
}
#iframe:has(iframe:not([style*='none'])) {
    height: 100%;
    overflow: hidden;
}
</style>
