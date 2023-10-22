import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import type { ConfigEnv } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import vueSetupExtend from 'vite-plugin-vue-setup-extend-plus'
import viteCompression from 'vite-plugin-compression'
import { buildConfig } from './src/utils/build'

const alias: Record<string, string> = {
    '/@': resolve(__dirname, '.', './src/'),
    '@/': resolve(__dirname, '.', 'src/'),
}

const viteConfig = defineConfig((mode: ConfigEnv) => {
    const env = loadEnv(mode.mode, process.cwd())
    return {
        plugins: [
            vue(),
            vueSetupExtend(),
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
