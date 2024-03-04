<template>
  <!-- Filters -->
  <div class="relative mb-4 bg-white rounded shadow border-c-gray-100">
    <div class="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0">
      <!-- Search Input -->
      <div class="w-full md:w-1/2">
        <form class="flex items-center mr-2.5">
          <label for="search" class="sr-only">Search</label>
          <div class="relative w-full">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-c-gray-500"
                fill="currentColor"
                viewbox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="search"
              class="block w-full py-2.5 p-2 pl-10 text-sm text-c-gray-800 border border-c-gray-300 rounded-lg outline-none bg-c-gray-50 focus:border-c-blue-500 focus:ring-c-blue-500"
              placeholder="Pesquisar..."
              required
            />
          </div>
        </form>
      </div>

      <!-- Filter Button -->
      <div
        class="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3"
      >
        <!-- Button Novo Tópico -->
        <router-link
          class="flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-c-blue-600 rounded-lg hover:bg-c-blue-700"
          to="/topic/create"
        >
          <svg
            class="w-[14px] h-[14px] mr-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              d="M5 12h14m-7 7V5"
            />
          </svg>
          Novo Tópico</router-link
        >

        <!-- Filters -->
        <FilterCheckbox :data="topicsStore.filters.courseFilter" label="Cursos" />
        <FilterCheckbox :data="topicsStore.filters.tagFilter" label="Tags" />
      </div>
    </div>
  </div>

  <!-- Order by -->
  <div class="relative overflow-hidden">
    <div class="flex flex-row items-center justify-between px-2 py-4">
      <div class="inline-flex flex-row w-full gap-4">
        <a
          class="text-sm cursor-pointer text-c-gray-500"
          @click="topicsStore.setOrderBy('mais recentes')"
          ><p :class="{ 'text-c-blue-500  ': topicsStore.orderBy == 'mais recentes' }">
            Mais recentes
          </p></a
        >

        <a
          class="text-sm cursor-pointer text-c-gray-500"
          @click="topicsStore.setOrderBy('melhores')"
          ><p :class="{ 'text-c-blue-500  ': topicsStore.orderBy == 'melhores' }">Melhores</p></a
        >
      </div>
    </div>
  </div>

  <!-- Topics -->
  <section>
    <Topic v-for="topic in topicsStore.topics" :key="topic.id" :topic="topic" />
  </section>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue';

// Store
import { useTopicsStore } from '@/stores/TopicsStore';

// Components
import FilterCheckbox from '@/components/FilterCheckbox.vue';
import Topic from '@/components/Topic.vue';

const topicsStore = useTopicsStore();

onUnmounted(() => {
  topicsStore.clearFilters();
});
</script>
