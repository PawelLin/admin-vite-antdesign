<script lang="ts" setup>
import { computed, ref, Ref } from 'vue'
import { useRoute, useRouter, RouteLocationRaw } from 'vue-router'
import { useTagStore } from '@/store'
import { useTag } from './hooks/useTag'
import { objNotEqual } from '@/libs/tools'
import { Tag } from './hooks/model'

const props = defineProps<{
    collapsed: boolean
}>()

const tagStore = useTagStore()
const list = tagStore.$state.data
const route = useRoute()
const router = useRouter()
const tagCollapsed = computed(() => props.collapsed)
const { translateX, showIcon, marginX, transitionTime, moveNavScroll, navList, navScroll, navItem } = useTag(
    list,
    tagCollapsed
)
const translateX_PX = computed(() => `${translateX.value}px`)
const marginX_PX = `${marginX}px`
const transitionTime_UNIT = `${transitionTime}ms`

function handleClick(item: Tag) {
    router.push(item as RouteLocationRaw)
}
function handleClose(item: Tag) {
    const index = tagStore.removeData(item)
    const { name, params, query } = route
    if (!objNotEqual(item, { name, params, query }, tagStore.tagFilterKeys)) {
        const next = list[index] || list[index - 1]
        if (next) {
            handleClick(next)
        }
    }
}
const activeTags = ref<Tag['id'][]>([])
const onMouseover = (id: string) => {
    if (!activeTags.value.includes(id)) {
        activeTags.value.push(id)
    }
}
const onMouseleave = (id: string) => {
    const index = activeTags.value.indexOf(id)
    if (index > -1) {
        activeTags.value.splice(index, 1)
    }
}
</script>

<template>
    <div class="nav">
        <LeftOutlined v-show="showIcon" @click="moveNavScroll('left')" class="nav-icon" />
        <div ref="navList" class="nav-list">
            <div ref="navScroll" class="nav-scroll">
                <a-tag
                    ref="navItem"
                    v-for="item in list"
                    :closable="!item.meta.fixed"
                    class="nav-tag"
                    :class="item.meta.active || activeTags.includes(item.id) ? 'nav-tag-active' : null"
                    :color="item.meta.active ? 'blue' : ''"
                    :key="item.id"
                    @click="handleClick(item)"
                    @close="handleClose(item)"
                    @mouseover="onMouseover(item.id)"
                    @mouseleave="onMouseleave(item.id)"
                >
                    <template v-if="item.meta.icon" #icon>
                        <CustomIcon :icon="item.meta.icon" />
                    </template>
                    {{ item.meta.title }}
                </a-tag>
            </div>
        </div>
        <RightOutlined v-show="showIcon" @click="moveNavScroll('right')" class="nav-icon" />
    </div>
</template>

<style lang="less" scoped>
.nav {
    padding: 6px 0;
    display: flex;
    align-items: center;
    &-list {
        position: relative;
        height: 26px;
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
    }
    &-scroll {
        position: absolute;
        top: 0;
        left: 0;
        transform: translateX(v-bind(translateX_PX));
        transition: transform v-bind(transitionTime_UNIT) @ease-out;
    }
    &-icon {
        cursor: pointer;
        user-select: none;
        color: rgba(0, 0, 0, 0.45);
        transition: color v-bind(transitionTime_UNIT);
        &:hover {
            color: rgba(0, 0, 0, 0.85);
        }
        &:first-child {
            padding-left: v-bind(marginX_PX);
        }
        &:last-child {
            padding-right: v-bind(marginX_PX);
        }
    }
    &-tag {
        padding: 3px 10px;
        font-size: 14px;
        border: none;
        background: var(--custom-body-color);
        border-radius: 2px;
        box-shadow: 2px 2px 7px var(--custom-contain-shadow-color);
        cursor: pointer;
        :deep(.ant-tag-close-icon) {
            margin-left: 5px;
            user-select: none;
        }
        &.nav-tag-active {
            color: var(--custom-primary-color);
        }
        &:first-child {
            margin-left: v-bind(marginX_PX);
        }
        // 兼容图标组件的自定义图标监听获取父级dom color，取消父级的transition，增加到子级
        transition: none;
        > :deep(*) {
            transition: all v-bind(transitionTime_UNIT);
        }
    }
}
</style>
