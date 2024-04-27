<template>
  <div class="px-4 mx-2 my-10 bg-white border-gray-200 rounded shadow sm:px-8">
    <!-- User Info -->
    <div class="flex flex-col py-8 border-b gap-y-6 sm:flex-row sm:items-center sm:justify-between">
      <!-- User Info -->
      <div class="flex items-center">
        <img
          class="object-cover rounded-full h-14 w-14"
          src="../../../public/userIcon.png"
          alt="Simon Lewis"
        />
        <div class="ml-4">
          <p class="text-xl font-bold text-gray-900">Podório Desu</p>
          <p class="text-gray-600">6º Período de Sistemas de Informação</p>
        </div>
      </div>

      <!-- Follow -->
      <button
        class="flex items-center justify-center gap-1 px-4 py-2 font-medium border rounded-lg outline-none border-emerald-500 text-emerald-500 focus:outline-none hover:bg-emerald-100 focus:ring-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-4 h-4"
        >
          <path
            d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
          />
        </svg>

        <span>Seguir</span>
      </button>
    </div>

    <ul class="flex flex-wrap gap-4 mb-2">
      <router-link to="/config/account">
        <li
          class="py-2 mt-5 font-semibold text-blue-700 transition border-transparent cursor-pointer sm:px-2 sm:border-b-2 sm:hover:border-b-blue-700 hover:text-blue-700 sm:border-b-blue-700"
        >
          Tópicos
        </li>
      </router-link>

      <router-link to="/config/account">
        <li
          :class="{ 'text-blue-700 sm:border-b-blue-700': $route.path === '/config/account' }"
          class="py-2 mt-5 font-semibold transition border-transparent cursor-pointer sm:px-2 sm:border-b-2 sm:hover:border-b-blue-700 hover:text-blue-700"
        >
          Comentários
        </li>
      </router-link>
    </ul>

    <!-- ESTATISTICAS -->
    <div class="flex justify-between py-8 mb-2 text-sm border-b sm:text-base">
      <div class="flex flex-col items-center">
        <p class="mb-1 text-xl font-extrabold text-slate-700">14</p>
        <p class="text-sm font-medium text-slate-500">Tópicos</p>
      </div>
      <div class="flex flex-col items-center">
        <p class="mb-1 text-xl font-extrabold text-slate-700">1124</p>
        <p class="text-sm font-medium text-slate-500">Seguidores</p>
      </div>
      <div class="flex flex-col items-center">
        <p class="mb-1 text-xl font-extrabold text-slate-700">25</p>
        <p class="text-sm font-medium text-slate-500">Curtidas</p>
      </div>
      <div class="flex flex-col items-center">
        <p class="mb-1 text-xl font-extrabold text-slate-700">3</p>
        <p class="text-sm font-medium text-slate-500">Comentarios</p>
      </div>
    </div>
  </div>

  <section>
    <Topic v-for="topic in topicsStore.topics" :key="topic.id" :topic="topic" />
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useTopicsStore } from '@/stores/TopicsStore';
import { useRoute } from 'vue-router';

// Components
import Topic from '@/components/Topic.vue';

const topicsStore = useTopicsStore();
const route = useRoute();

onMounted(() => {
  // topicsStore.fetch(parseInt(route.params.id.toString()));
});

onUnmounted(() => {
  topicsStore.clearFilters();
});
</script>
