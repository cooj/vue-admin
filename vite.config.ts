import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import type { ConfigEnv } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import viteCompression from 'vite-plugin-compression'
import VueDevTools from 'vite-plugin-vue-devtools'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'
import { buildConfig } from './src/utils/build'

const alias: Record<string, string> = {
    '/@': resolve(__dirname, '.', './src/'),
    '@': resolve(__dirname, 'src'), // 配置src的别名
}

const viteConfig = defineConfig((mode: ConfigEnv) => {
    const env = loadEnv(mode.mode, process.cwd())
    return {
        plugins: [
            vue(),
            // https://github.com/antfu/unplugin-auto-import
            AutoImport({
                imports: [
                    'vue',
                    'vue-router',
                    '@vueuse/head',
                    '@vueuse/core',
                ],
                dts: 'src/types/auto-imports.d.ts',
                dirs: [
                    'src/composables',
                    'src/stores',
                    'src/utils/base',
                ],
                vueTemplate: true,
                resolvers: [ElementPlusResolver()],
            }),

            // https://github.com/antfu/unplugin-vue-components
            Components({
                // allow auto load markdown components under `./src/components/`
                extensions: ['vue', 'md'],
                // allow auto import and register components used in markdown
                include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
                dts: 'src/types/components.d.ts',
                resolvers: [ElementPlusResolver()],
            }),

            // https://github.com/antfu/unocss
            // see uno.config.ts for config
            Unocss(),

            // https://github.com/webfansplz/vite-plugin-vue-devtools
            VueDevTools(),

            // vueSetupExtend(),
            viteCompression(),
            JSON.parse(env.VITE_OPEN_CDN) ? buildConfig.cdn() : null,
        ],
        root: process.cwd(),
        resolve: { alias },
        base: mode.command === 'serve' ? './' : env.VITE_PUBLIC_PATH,

        server: {
            host: '0.0.0.0',
            port: env.VITE_PORT as unknown as number,
            open: JSON.parse(env.VITE_OPEN),
            hmr: true,
            proxy: {
                '/gitee': {
                    target: 'https://gitee.com',
                    ws: true,
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/gitee/, ''),
                },
            },
        },
        build: {
            outDir: 'dist',
            chunkSizeWarningLimit: 1500,
            rollupOptions: {
                output: {
                    chunkFileNames: 'assets/js/[name]-[hash].js',
                    entryFileNames: 'assets/js/[name]-[hash].js',
                    assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return id.toString().match(/\/node_modules\/(?!.pnpm)(?<moduleName>[^\/]*)\//)?.groups!.moduleName ?? 'vender'
                        }
                    },
                },
                ...(JSON.parse(env.VITE_OPEN_CDN) ? { external: buildConfig.external } : {}),
            },
        },
        css: { preprocessorOptions: { css: { charset: false } } },
        define: {
            __NEXT_VERSION__: JSON.stringify(process.env.npm_package_version),
            __NEXT_NAME__: JSON.stringify(process.env.npm_package_name),
        },
    }
})

export default viteConfig
