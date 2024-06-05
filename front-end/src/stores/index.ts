// Utilities
import router from '@/router';

import { createPinia } from 'pinia';
export default createPinia().use(({ store }) => { store.router = markRaw(router) });
