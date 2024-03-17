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
      path: '/signin',
      name: 'signIn',
      component: () => import('../views/SignInView.vue')
    },

    {
      path: '/signup',
      name: 'signUp',
      component: () => import('../views/SignUpView.vue')
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
