<script lang="ts" setup>
import { ref, provide, watch } from 'vue'
import themeDark from 'ant-design-vue/dist/antd.dark.css'
type Theme = 'theme-light' | 'theme-dark'
const theme = ref<Theme>('theme-light')
provide('theme', theme)
watch(theme, (theme) => {
    const head = document.getElementsByTagName('head')[0]
    let darkStyle = Array.from(head.getElementsByTagName('style')).filter(
        (style) => style.getAttribute('data-type') === 'theme'
    )[0]
    if (theme === 'theme-light' && darkStyle) {
        darkStyle.remove()
    }
    if (theme === 'theme-dark' && !darkStyle) {
        darkStyle = document.createElement('style')
        darkStyle.dataset.type = 'theme'
        darkStyle.innerHTML = themeDark
        head.appendChild(darkStyle)
    }
})
</script>

<template>
    <a-config-provider>
        <Layout :class="theme" />
    </a-config-provider>
</template>

<style lang="less">
*,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
// body {
//     background-color: @body-color;
// }
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
</style>
