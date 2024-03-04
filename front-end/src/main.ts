import '../style.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import onClickOutside from './directives/onClickOutside';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.directive('onClickOutside', onClickOutside);

app.mount('#app');
