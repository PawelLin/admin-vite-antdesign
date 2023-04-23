<script lang="ts" setup>
import { ref, watch, nextTick, onUnmounted, inject, Ref } from 'vue'
import * as icons from '@ant-design/icons-vue'

const props = defineProps<{
    icon?: string
    color?: string
}>()
const iconKeys = Object.keys(icons)
const customRef = ref<HTMLElement | null>(null)
const color = ref('')
const isCustom = ref(true)
const theme = inject('theme') as Ref<string>
let observer: MutationObserver | null = null
onUnmounted(() => {
    observer && observer.disconnect()
    observer = null
})
watch(
    [() => props.icon, theme],
    ([icon]) => {
        isCustom.value = !iconKeys.includes(
            (icon || '')
                .replace(/(-[A-Za-z])/g, (value) => value[1].toUpperCase())
                .replace(/^[A-Za-z]/, (value) => value.toUpperCase())
        )
        if (props.color) {
            color.value = props.color
        } else {
            isCustom.value &&
                nextTick(() => {
                    observerCustom()
                })
        }
    },
    {
        immediate: true,
    }
)
function observerCustom() {
    observer && observer.disconnect()
    const targetNode = (customRef.value as HTMLElement).parentElement
    if (targetNode) {
        color.value = window.getComputedStyle(targetNode as HTMLElement).getPropertyValue('color')
        // 观察器的配置（需要观察什么变动）
        const config = { attributes: true }
        // 当观察到变动时执行的回调函数
        const callback: MutationCallback = (mutationsList) => {
            // Use traditional 'for loops' for IE 11
            for (let mutation of mutationsList) {
                if (mutation.type === 'attributes') {
                    color.value = window.getComputedStyle(targetNode as HTMLElement).getPropertyValue('color')
                }
            }
        }
        // 创建一个观察器实例并传入回调函数
        observer = new MutationObserver(callback)
        // 以上述配置开始观察目标节点
        observer.observe(targetNode, config)
    }
}
</script>

<template>
    <i v-if="isCustom" ref="customRef" class="anticon custom-icon" :class="props.icon">
        <span class="custom-icon-seize">占</span>
    </i>
    <component v-else :is="props.icon"></component>
</template>

<style lang="less" scoped>
.anticon.custom-icon {
    mask-size: 100% 100%;
    background-color: v-bind(color);
    vertical-align: 0;
    transition: background-color 0.3s;
}
.custom-icon-seize {
    visibility: hidden;
}
.custom-iview {
    mask-image: url(@/assets/address/iview.ico);
}
.custom-ant-design {
    mask-image: url(@/assets/address/ant-design.ico);
}
</style>
