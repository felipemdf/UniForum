import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/topic/create',
      name: 'topic_form',
      component: () => import('../views/TopicFormView.vue')
    }
  ]
});

export default router;
