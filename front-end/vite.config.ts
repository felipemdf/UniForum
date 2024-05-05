// Utilities
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

// Plugins
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080
  },
  preview: {
    port: 8080
  },
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'src/core/declarations/auto-imports.d.ts',
      dirs: ['src/stores/**', 'src/core/**'],
      vueTemplate: true
    }),
    Components({
      dirs: ['src/presentation/components'],
      dts: 'src/core/declarations/components.d.ts'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue']
  },
  build: {}
});
