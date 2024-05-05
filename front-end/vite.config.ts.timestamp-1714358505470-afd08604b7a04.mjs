// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///D:/repositorio%20github/UniForum/front-end/node_modules/vite/dist/node/index.js";
import Components from "file:///D:/repositorio%20github/UniForum/front-end/node_modules/unplugin-vue-components/dist/vite.js";
import AutoImport from "file:///D:/repositorio%20github/UniForum/front-end/node_modules/unplugin-auto-import/dist/vite.js";
import vue from "file:///D:/repositorio%20github/UniForum/front-end/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/repositorio%20github/UniForum/front-end/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///D:/repositorio%20github/UniForum/front-end/vite.config.ts";
var vite_config_default = defineConfig({
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
      imports: ["vue", "vue-router", "pinia"],
      dts: "src/core/declarations/auto-imports.d.ts",
      dirs: ["src/services/**"],
      vueTemplate: true
    }),
    Components({
      dirs: ["src/presentation/components"],
      dts: "src/core/declarations/components.d.ts"
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"]
  },
  build: {}
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxyZXBvc2l0b3JpbyBnaXRodWJcXFxcVW5pRm9ydW1cXFxcZnJvbnQtZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxyZXBvc2l0b3JpbyBnaXRodWJcXFxcVW5pRm9ydW1cXFxcZnJvbnQtZW5kXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9yZXBvc2l0b3JpbyUyMGdpdGh1Yi9VbmlGb3J1bS9mcm9udC1lbmQvdml0ZS5jb25maWcudHNcIjsvLyBVdGlsaXRpZXNcclxuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnO1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcclxuXHJcbi8vIFBsdWdpbnNcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSc7XHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnO1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XHJcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCc7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHNlcnZlcjoge1xyXG4gICAgcG9ydDogODA4MFxyXG4gIH0sXHJcbiAgcHJldmlldzoge1xyXG4gICAgcG9ydDogODA4MFxyXG4gIH0sXHJcbiAgcGx1Z2luczogW1xyXG4gICAgdnVlKCksXHJcbiAgICB2dWVKc3goKSxcclxuICAgIEF1dG9JbXBvcnQoe1xyXG4gICAgICBpbXBvcnRzOiBbJ3Z1ZScsICd2dWUtcm91dGVyJywgJ3BpbmlhJ10sXHJcbiAgICAgIGR0czogJ3NyYy9jb3JlL2RlY2xhcmF0aW9ucy9hdXRvLWltcG9ydHMuZC50cycsXHJcbiAgICAgIGRpcnM6IFsnc3JjL3NlcnZpY2VzLyoqJ10sXHJcbiAgICAgIHZ1ZVRlbXBsYXRlOiB0cnVlXHJcbiAgICB9KSxcclxuICAgIENvbXBvbmVudHMoe1xyXG4gICAgICBkaXJzOiBbJ3NyYy9wcmVzZW50YXRpb24vY29tcG9uZW50cyddLFxyXG4gICAgICBkdHM6ICdzcmMvY29yZS9kZWNsYXJhdGlvbnMvY29tcG9uZW50cy5kLnRzJ1xyXG4gICAgfSlcclxuICBdLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXHJcbiAgICB9LFxyXG4gICAgZXh0ZW5zaW9uczogWycuanMnLCAnLmpzb24nLCAnLmpzeCcsICcubWpzJywgJy50cycsICcudHN4JywgJy52dWUnXVxyXG4gIH0sXHJcbiAgYnVpbGQ6IHt9XHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsU0FBUyxlQUFlLFdBQVc7QUFDbkMsU0FBUyxvQkFBb0I7QUFHN0IsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQVI0SyxJQUFNLDJDQUEyQztBQVdoUCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLE9BQU87QUFBQSxJQUNQLFdBQVc7QUFBQSxNQUNULFNBQVMsQ0FBQyxPQUFPLGNBQWMsT0FBTztBQUFBLE1BQ3RDLEtBQUs7QUFBQSxNQUNMLE1BQU0sQ0FBQyxpQkFBaUI7QUFBQSxNQUN4QixhQUFhO0FBQUEsSUFDZixDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDVCxNQUFNLENBQUMsNkJBQTZCO0FBQUEsTUFDcEMsS0FBSztBQUFBLElBQ1AsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxJQUNBLFlBQVksQ0FBQyxPQUFPLFNBQVMsUUFBUSxRQUFRLE9BQU8sUUFBUSxNQUFNO0FBQUEsRUFDcEU7QUFBQSxFQUNBLE9BQU8sQ0FBQztBQUNWLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
