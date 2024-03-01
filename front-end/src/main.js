import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import '@/style.css';
import onClickOutside from './directives/onClickOutside';

createApp(App).use(router).directive('onClickOutside', onClickOutside).mount('#app');
