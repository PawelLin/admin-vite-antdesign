<script lang="ts" setup>
import { inject, reactive } from 'vue'
import { ConfigProvider } from 'ant-design-vue'
import { Breadcrumb } from './hooks/model'
const skinList = ['#1890ff', '#ff4d4f', '#faad14', '#52c41a']
const theme = reactive({
    primaryColor: skinList[0],
})
ConfigProvider.config({
    theme,
})
const props = defineProps<{
    collapsed: boolean
    setCollapsed: () => void
    breadcrumbs: Breadcrumb[]
}>()
const onSkinChange = (type: string, skin: string) => {
    Object.assign(theme, { [type]: skin })
    ConfigProvider.config({
        theme,
    })
}
const themeName = inject('theme')
</script>

<template>
    <a-layout-header class="header">
        <div class="title" :class="props.collapsed ? 'title-collapsed' : null">
            <IconfontIcon type="icon-brave" class="title-icon" />
            <span class="title-text">PawelLin</span>
        </div>
        <div class="header-nav">
            <div class="collapsed" @click="props.setCollapsed">
                <MenuUnfoldOutlined v-if="props.collapsed" />
                <MenuFoldOutlined v-else />
            </div>
            <a-breadcrumb v-if="props.breadcrumbs.length > 1" class="breadcrumb">
                <a-breadcrumb-item v-for="item in props.breadcrumbs" :key="`${item.id || ''}${item.name}`">
                    <router-link v-if="item.link" :to="item">
                        {{ item.title }}
                    </router-link>
                    <span v-else>{{ item.title }}</span>
                </a-breadcrumb-item>
            </a-breadcrumb>
            <div class="header-right">
                <a-dropdown>
                    <a class="custom-link right-item" href="javascript:;">
                        <user-outlined />
                        pawel
                    </a>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item>
                                <key-outlined />
                                修改密码
                            </a-menu-item>
                            <a-menu-item>
                                <poweroff-outlined />
                                退出
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
                <a-switch v-model:checked="themeName" checkedValue="theme-light" unCheckedValue="theme-dark">
                    <template #checkedChildren><IconfontIcon type="icon-taiyang" /></template>
                    <template #unCheckedChildren><IconfontIcon type="icon-yueliang" /></template>
                </a-switch>
                <a-dropdown>
                    <a class="right-item" href="javascript:;">
                        <skin-outlined
                            :style="{
                                color: theme.primaryColor,
                            }"
                        />
                    </a>
                    <template #overlay>
                        <a-menu>
                            <a
                                v-for="skin in skinList"
                                class="skin-item"
                                href="javascript:;"
                                :style="{ backgroundColor: skin }"
                                :key="skin"
                                @click="onSkinChange('primaryColor', skin)"
                            ></a>
                            <input
                                class="skin-item"
                                type="color"
                                :value="theme.primaryColor"
                                @input="(e) => onSkinChange('primaryColor', (e.target as HTMLInputElement).value)"
                            />
                        </a-menu>
                    </template>
                </a-dropdown>
            </div>
        </div>
    </a-layout-header>
</template>

<style lang="less" scoped>
.title {
    padding-left: 20px;
    width: 200px;
    font-size: 24px;
    white-space: nowrap;
    transition: width 0.2s @ease-out;
    overflow: hidden;
    &-icon {
        transition: font-size 0.15s @ease-out;
    }
    &-text {
        margin-left: 5px;
        opacity: 1;
        transition: opacity 0.3s @ease-in-out;
    }
}
.title-collapsed {
    padding-left: 18px;
    width: 63px;
    .title-icon {
        font-size: 28px;
    }
    .title-text {
        opacity: 0;
    }
}
.header-nav {
    display: flex;
    align-items: center;
    flex: 1;
}
.collapsed {
    margin-left: 10px;
    font-size: 18px;
    cursor: pointer;
}
.breadcrumb {
    margin-left: 20px;
}
.header-right {
    display: flex;
    align-items: center;
    margin-left: auto;
    padding-right: 10px;
}
.right-item {
    padding: 0 12px;
    & + .right-item {
        margin-top: 5px;
    }
}
.skin-item {
    display: block;
    width: 40px;
    height: 20px;
    cursor: pointer;
    & + .skin-item {
        margin-top: 5px;
    }
}
</style>
