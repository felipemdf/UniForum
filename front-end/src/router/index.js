import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CreateTopicView from '../views/CreateTopicView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },

  {
    path: '/topic/create',
    name: 'createTopic',
    component: CreateTopicView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
