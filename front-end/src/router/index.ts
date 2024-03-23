import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useAuthStore } from '@/stores/AuthStore';
import { validateToken } from '@/utils/authUtils';
import { NotificationType, useNotifyStore } from '@/stores/NotifiyStore';

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
      component: HomeView,
      meta: { requiresAuth: false }
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
      component: () => import('../views/TopicFormView.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/topic/:id',
      name: 'topic',
      component: () => import('../views/TopicView.vue'),
      meta: { requiresAuth: false }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  const notification = useNotifyStore()
  
  if (to.matched.some((record) => record.meta.requiresAuth) && !validateToken(auth.token?.access_token)) {
    next('/signin');
    notification.notify("É necessário realizar login para acessar essa função!", NotificationType.Warning)
  } else {
    next();
  }
});

export default router;
