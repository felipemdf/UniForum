import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useAuthStore } from '@/stores/AuthStore';

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
      meta: { requiresAuth: false},
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
      meta: { requiresAuth: true},
    },

    {
      path: '/topic/:id',
      name: 'topic',
      component: () => import('../views/TopicView.vue'),
      meta: { requiresAuth: false },
    }
  ]
});


router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  
  if (to.matched.some(record => record.meta.requiresAuth) && !auth.isAuthenticated) {
    next('/signin');
  } else {
    next();
  }
});

export default router;
