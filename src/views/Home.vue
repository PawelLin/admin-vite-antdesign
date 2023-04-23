<script lang="ts">
export default {
    name: 'Home',
}
</script>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import vue from '@/assets/address/vue.png'
import react from '@/assets/address/react.ico'
import reactBeta from '@/assets/address/react-beta.ico'
import zhongguose from '@/assets/address/zhongguose.png'
import tinypng from '@/assets/address/tinypng.ico'
import prettier from '@/assets/address/prettier.png'
import axios from '@/assets/address/axios.ico'
import astexplorer from '@/assets/address/astexplorer.png'
import singleSpa from '@/assets/address/single-spa.ico'
import qiankun from '@/assets/address/qiankun.png'
import antDesign from '@/assets/address/ant-design.ico'
import iview from '@/assets/address/iview.ico'
import elementPlus from '@/assets/address/element-plus.svg'
import pinia from '@/assets/address/pinia.svg'
import vite from '@/assets/address/vite.svg'
import webpack from '@/assets/address/webpack.ico'
import { useFullScreen } from '@/libs/hooks'
import { debounce, throttle } from '@/libs/tools'
const list = ref([
    [
        { title: 'Vue2', href: 'https://cn.vuejs.org/', src: vue },
        { title: 'Vue3', href: 'https://staging-cn.vuejs.org/', src: vue },
        { title: 'Vue SFC Playground', href: 'https://sfc.vuejs.org/', src: vue },
        { title: 'Vue3 Template Explorer', href: 'https://vue-next-template-explorer.netlify.app/', src: vue },
        { title: 'Vue Router', href: 'https://router.vuejs.org/zh/', src: vue },
        { title: 'Pinia', href: 'https://pinia.vuejs.org/', src: pinia },
    ],
    [
        { title: 'React', href: 'https://zh-hans.reactjs.org/', src: react },
        { title: 'React BEAT', href: 'https://beta.reactjs.org/', src: reactBeta },
        { title: 'React BETA中文版', href: 'https://reactjs.bootcss.com/', src: reactBeta },
    ],
    [
        { title: 'Ant Design', href: 'https://antdv.com/components/overview', src: antDesign },
        { title: 'View Design', href: 'https://www.iviewui.com/', src: iview },
        { title: 'Element+', href: 'https://element-plus.gitee.io/zh-CN/', src: elementPlus },
    ],
    [
        { title: 'Vite', href: 'https://cn.vitejs.dev/', src: vite },
        { title: 'Wepack', href: 'https://www.webpackjs.com/', src: webpack },
        { title: 'Vue cli', href: 'https://cli.vuejs.org/zh/guide/', src: vue },
    ],
    [
        { title: 'Tinypng', href: 'https://tinypng.com/', src: tinypng },
        { title: '渐变背景', href: 'http://color.oulu.me/', src: react },
        { title: '中国色', href: 'http://zhongguose.com/', src: zhongguose },
    ],
    [
        { title: 'axios', href: 'https://axios-http.com/zh/', src: axios },
        { title: 'AST Explorer', href: 'https://astexplorer.net/', src: astexplorer },
        { title: 'prettier', href: 'https://prettier.io/docs/en/index.html', src: prettier },
    ],
    [
        { title: 'single-spa', href: 'https://zh-hans.single-spa.js.org/', src: singleSpa },
        { title: 'qiankun', href: 'https://qiankun.umijs.org/zh', src: qiankun },
    ],
])
const { fullScreen, toggleFullScreen } = useFullScreen()
const fullScreenIcon = computed(() => (fullScreen.value ? 'compress-outlined' : 'expand-outlined'))
const debounceNum = ref(0)
const throttleNum = ref(0)
const debounceFun = debounce(() => {
    debounceNum.value++
}, 1000)
const throttleFun = throttle(() => {
    throttleNum.value++
}, 1000)
</script>

<template>
    <section class="home">
        <component :is="fullScreenIcon" @click="toggleFullScreen('.home')"></component>
        <div v-for="(data, index) in list" class="contain" :key="index">
            <a
                v-for="{ title, href, src } in data"
                class="tile"
                :href="href"
                :title="title"
                target="_blank"
                :key="title"
            >
                <img class="tile-icon" :src="src" alt="" />
                <p class="tile-title">{{ title }}</p>
            </a>
        </div>
    </section>
    <div>
        <button @click="debounceFun">防抖{{ debounceNum }}</button>
        <button @click="throttleFun">节流{{ throttleNum }}</button>
        <div>
            <router-link :to="{ name: 'children' }">children</router-link>
        </div>
        <div>
            <router-link :to="{ name: 'children', params: { id: '1' }, query: { rename: 'children1' } }">
                children1
            </router-link>
        </div>
        <div>
            <router-link
                :to="{
                    name: 'children',
                    params: { id: '1' },
                    query: { aa: 1, rename: 'children11' },
                }"
            >
                children1 1
            </router-link>
        </div>
    </div>
</template>

<style lang="less" scoped>
.contain {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    & + .contain {
        margin-top: 15px;
    }
}
.tile {
    padding: 2px 0;
    width: 100px;
    text-align: center;
}
.tile-icon {
    padding: 12px;
    width: 48px;
    height: 48px;
    background-color: rgba(255, 255, 255, 0.5);
    clip-path: circle(50%);
}
.tile-title {
    margin: 5px 0 0 0;
    color: var(--custom-font-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.home:fullscreen {
    background-color: @body-color;
}
</style>
