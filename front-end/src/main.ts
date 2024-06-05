import { createApp } from 'vue';
import App from './App.vue';
import { registerPlugins } from '@/core/plugins';

import '../style.css';
import { vInfiniteScroll, vOnClickOutside } from '@vueuse/components';

const app = createApp(App)
  .use(registerPlugins)
  .directive('onClickOutside', vOnClickOutside)
  .directive('infiniteScroll', vInfiniteScroll)
  .mount('#app');
