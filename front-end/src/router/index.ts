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
      meta: { requiresAuth: false }
    },

    {
      path: '/topic/:id',
      name: 'topic',
      component: () => import('../views/TopicView.vue'),
      meta: { requiresAuth: false }
    },

    {
      path: '/config',
      redirect: '/config/account'
    },

    {
      path: '/config',
      component: () => import('../views/ConfigView.vue'),
      meta: { requiresAuth: false },
      children: [
        {
          path: 'account',
          component: import('../views/config/ConfigAccountView.vue')
        },
        {
          path: 'profile',
          component: import('../views/config/ConfigProfileView.vue')
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  const notification = useNotifyStore();

  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    next();
    return;
  }

  if (!validateToken(auth.token?.access_token)) {
    next('/signin');
    notification.notify(
      'É necessário realizar login para acessar essa função!',
      NotificationType.Warning
    );
    return;
  }

  if (!auth.isValidProfile()) {
    notification.notify(
      'O perfil de usuário não foi preenchido completamente. É necessário preencher o perfil para acessar essa função!',
      NotificationType.Warning
    );
    return;
  }

  next();
});

export default router;
