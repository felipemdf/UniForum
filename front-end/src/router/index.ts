import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 };
  },
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },

    {
      path: '/topic/create',
      name: 'topic_form',
      component: () => import('../views/TopicFormView.vue')
    },

    {
      path: '/topic/:id',
      name: 'topic',
      component: () => import('../views/TopicView.vue')
    }
  ]
});

export default router;
