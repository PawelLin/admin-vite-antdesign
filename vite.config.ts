import { resolve } from 'path'
import { defineConfig, splitVendorChunkPlugin, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import mockjs from './mock/mock.js'

const mockPlugin = () => ({
    name: 'configure-server',
    configureServer(server) {
        server.middlewares.use(
            mockjs({
                root: resolve('mock'),
                route: '/api',
            })
        )
    },
})

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    console.log('mode =', mode)
    const params: UserConfigExport = {
        server: {
            open: true,
        },
        resolve: {
            alias: {
                '@': resolve('src'),
            },
        },
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true,
                    additionalData: `@import '@/assets/less/vars.less';`,
                },
            },
            postcss: {
                plugins: [require('autoprefixer')],
            },
        },
        plugins: [
            vue(),
            Components({
                resolvers: [AntDesignVueResolver({ importStyle: false })],
            }),
            splitVendorChunkPlugin(),
        ],
    }
    if (mode === 'development') {
        params.plugins.push(mockPlugin())
    }
    if (mode === 'proxy') {
        params.server.proxy = {
            '/api': {
                target: 'https://www.fastmock.site/mock/69320153fd31dd2b99516a23375225d5/api',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        }
    }
    return params
})
