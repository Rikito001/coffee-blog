import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    server: {
        proxy: {
            '/php': {
                target: 'http://localhost',
                changeOrigin: true,
                rewrite: (path) => `/coffee-blog/coffee-blog/src${path}`
            }
        }
    }
})