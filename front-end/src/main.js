import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import '@/style.css';
import onClickOutside from './directives/onClickOutside';

const app = createApp(App).use(router).directive('onClickOutside', onClickOutside).mount('#app');
app.use(router).mount('#app');
