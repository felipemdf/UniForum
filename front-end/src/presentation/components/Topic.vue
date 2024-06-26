<template>
  <article class="p-6 mb-4 bg-white border-gray-200 rounded shadow">
    <!-- Header -->
    <header class="flex-col">
      <!-- First line -->
      <div class="flex justify-between mb-4">
        <!-- User and topic info -->
        <div class="flex flex-wrap items-center gap-1">
          <router-link
            :to="'/auth/profile/' + props.topic.user.id"
            class="inline-flex items-center gap-1"
          >
            <img
              class="w-8 h-8 mr-2 rounded-full"
              :src="
                props.topic.user.photo
                  ? 'data:image/png;base64,' + props.topic.user.photo
                  : '/userIcon.png'
              "
              alt="Username"
            />
            <p class="text-sm font-medium text-gray-900">{{ props.topic.user.username }}</p>
          </router-link>
          <p class="text-sm text-gray-500">- {{ formattedActivity }}</p>
        </div>

        <!-- Option Button-->
        <div
          class="relative"
          v-on-click-outside="closeMenuOptions"
          v-if="props.topic.user.id === authStore.user.id"
        >
          <button
            @click="toggleMenuOptions"
            class="inline-flex items-center p-2 text-center text-gray-500 rounded-lg hover:bg-gray-100"
            type="button"
          >
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path
                d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
              />
            </svg>
            <span class="sr-only">Topic settings</span>
          </button>

          <!-- Dropdown menu -->
          <div
            v-if="isOptionsOpen"
            class="absolute right-0 bg-white divide-y divide-gray-100 rounded shadow w-36"
          >
            <ul class="py-1 text-sm text-gray-700">
              <li>
                <button
                  @click.prevent="$emit('deleteTopic', props.topic.id)"
                  class="block px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Excluir
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Title -->
      <router-link :to="'/topic/' + props.topic.id">
        <p class="pb-4 text-xl font-medium leading-5 text-gray-900 border-b border-x-gray-100">
          {{ props.topic.title }}
        </p>
      </router-link>
    </header>

    <!-- Content preview -->
    <main>
      <p class="pt-4 text-sm leading-5 text-gray-600">
        {{ props.topic.preview }}
      </p>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mt-4">
        <div class="px-3 py-2 text-xs leading-3 text-indigo-700 bg-indigo-100 rounded-xl">
          {{ getCourseLabel(props.topic.course) }}
        </div>
        <div class="px-3 py-2 text-xs leading-3 text-indigo-700 bg-indigo-100 rounded-xl">
          {{ getTagLabel(props.topic.tag) }}
        </div>
      </div>
    </main>

    <footer>
      <!-- Info -->
      <div class="flex gap-5 mt-4">
        <button
          type="button"
          class="flex items-center gap-1 text-sm font-normal text-gray-400 hover:underline"
          @click.prevent="$emit('likeDeslikeTopic', props.topic)"
        >
          <svg
            :class="isLikedClass(props.topic)"
            class="w-[16px] h-[16px]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="m12.7 20.7 6.2-7.1c2.7-3 2.6-6.5.8-8.7A5 5 0 0 0 16 3c-1.3 0-2.7.4-4 1.4A6.3 6.3 0 0 0 8 3a5 5 0 0 0-3.7 1.9c-1.8 2.2-2 5.8.8 8.7l6.2 7a1 1 0 0 0 1.4 0Z"
            />
          </svg>

          {{ props.topic.usersLikes.length }}
        </button>

        <button
          type="button"
          class="flex items-center gap-1 text-sm font-normal text-gray-400 hover:underline"
        >
          <svg
            class="w-[18px] h-[18px]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M3.6 4.5c.3-.3.8-.5 1.3-.5H19a1.9 1.9 0 0 1 2 1.9V15a1.9 1.9 0 0 1-1.9 1.9h-3.6l-2.7 3.6a1 1 0 0 1-1.6 0L8.5 17H4.9A1.9 1.9 0 0 1 3 15.1V6c0-.5.2-1 .6-1.4Zm4 3a1 1 0 1 0 0 2h8a1 1 0 0 0 0-2h-8Zm0 3.5a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2H7.6Z"
              clip-rule="evenodd"
            />
          </svg>

          {{ props.topic.qtComments }}
        </button>
      </div>
    </footer>
  </article>
</template>

<script setup lang="ts">
import type { Topic } from '@/stores/topicStore/interfaces/Topic';
import { useTimeAgo } from '@vueuse/core';

// Stores
const authStore = useAuthStore();

// Refs
const props = defineProps(['topic']);
let isOptionsOpen = ref(false);

const toggleMenuOptions = () => {
  isOptionsOpen.value = !isOptionsOpen.value;
};

const closeMenuOptions = () => {
  isOptionsOpen.value = false;
};

const formattedActivity = computed(() => {
  if (props.topic) {
    return useTimeAgo(new Date(props.topic!.createdAt)).value;
  }
});

function isLikedClass(topic: Topic) {
  return topic.usersLikes.includes(authStore.user.id) ? 'text-red-500' : 'text-gray-400';
}
</script>
