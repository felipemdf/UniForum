import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/presentation/views/forum/home/HomePage.vue';
import EmptyLayout from '@/presentation/layouts/EmptyLayout.vue';

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
      component: HomePage
    },

    {
      path: '/signin',
      name: 'signIn',
      component: () => import('@/presentation/views/account/authentication/SignInPage.vue'),
      meta: { layout: EmptyLayout }
    },

    {
      path: '/signup',
      name: 'signUp',
      component: () => import('@/presentation/views/account/authentication/SignUpPage.vue'),
      meta: { layout: EmptyLayout }
    },

    {
      path: '/topic/create',
      name: 'topic_form',
      component: () => import('@/presentation/views/forum/topic/TopicFormPage.vue'),
      meta: { requiresAuth: false }
    },

    {
      path: '/topic/:id/edit',
      name: 'topic_form_edit',
      component: () => import('@/presentation/views/forum/topic/TopicFormPage.vue'),
      meta: { requiresAuth: false }
    },

    {
      path: '/topic/:id',
      name: 'topic',
      component: () => import('@/presentation/views/forum/topic/TopicPage.vue'),
      meta: { requiresAuth: false }
    },

    {
      path: '/config',
      redirect: '/config/account'
    },

    {
      path: '/config',
      component: () => import('@/presentation/views/account/config/ConfigPage.vue'),
      meta: { requiresAuth: false },
      children: [
        {
          path: 'account',
          component: import('@/presentation/views/account/config/tabs/ConfigAccountTab.vue')
        },
        {
          path: 'profile',
          component: import('@/presentation/views/account/config/tabs/ConfigProfileTab.vue')
        }
      ]
    },

    {
      path: '/profile/:id',
      name: 'profile',
      component: () => import('@/presentation/views/account/profile/ProfilePage.vue'),
      meta: { requiresAuth: true }
    },
  ]
});

// router.beforeEach((to, from, next) => {
//   const auth = useAuthStore();
//   const notification = useNotifyStore();

//   if (!to.matched.some((record) => record.meta.requiresAuth)) {
//     next();
//     return;
//   }

//   if (!validateToken(auth.token?.access_token)) {
//     next('/signin');
//     notification.notify(
//       'É necessário realizar login para acessar essa função!',
//       NotificationType.Warning
//     );
//     return;
//   }

//   if (!auth.isValidProfile()) {
//     notification.notify(
//       'O perfil de usuário não foi preenchido completamente. É necessário preencher o perfil para acessar essa função!',
//       NotificationType.Warning
//     );
//     return;
//   }

//   next();
// });

export default router;
