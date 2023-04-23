<script lang="ts" setup>
import { createFromIconfontCN } from '@ant-design/icons-vue'
const props = defineProps<{
    type: string
}>()
const MyIcon = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1040735_q1mcxkcsfed.js', // 在 iconfont.cn 上生成
})
</script>

<template>
    <MyIcon :type="props.type" />
</template>
