// Plugins
import pinia from '@/stores';
import router from '@/router';

// Types
import type { App } from 'vue';

export function registerPlugins(app: App) {
  app.use(router).use(pinia);
}
