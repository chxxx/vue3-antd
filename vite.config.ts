import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    viteMockServe({
      ignore: /^_/, // 正则匹配忽略的文件
      mockPath: 'mock', // 设置mock.ts 文件的存储文件夹
      localEnabled: true, // 设置是否启用本地 xxx.ts 文件，不要在生产环境中打开它.设置为 false 将禁用 mock 功能
      prodEnabled: true, // 设置生产环境是否启用 mock 功能
      watchFiles: true, // 设置是否监视mockPath对应的文件夹内文件中的更改
      // 代码注入
      injectCode: ` 
        import { setupProdMockServer } from '../mock/_createProductionServer';
        setupProdMockServer();
      `
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: true, //'0.0.0.0'
    proxy: {
      // 字符串简写写法
      '/foo': 'http://localhost:4567',
      // 选项写法
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      // 正则表达式写法
      '^/fallback/.*': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fallback/, '')
      }

      // "/api": {
      //   target: "http://jsonplaceholder.typicode.com",
      //   changeOrigin: true,
      //   configure: (proxy, options) => {
      //     // proxy 是 'http-proxy' 的实例
      //   },
      // },
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        charset: false, // 避免出现: build时的 @charset 必须在第一行的警告
        additionalData: `
          @import "@/styles/mixin.less";
          @import "@/styles/variables.less";
        `
      }
    }
  }
})
