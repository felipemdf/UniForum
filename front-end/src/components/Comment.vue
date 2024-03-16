<template>
  <article class="p-6 mb-1 rounded">
    <!-- Header -->
    <header class="flex-col">
      <!-- First line -->
      <div class="flex justify-between">
        <!-- User and Comment info -->
        <div class="flex flex-wrap items-center gap-1">
          <button class="inline-flex items-center gap-1">
            <img
              class="w-8 h-8 mr-2 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
              alt="Username"
            />
            <p class="text-sm font-medium text-gray-900">{{ props.comment.username }}</p>
          </button>
          <p class="text-sm text-gray-500">- {{ formattedActivity }}</p>
        </div>

        <!-- Option Button-->
        <div class="relative">
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
            <span class="sr-only">Comment settings</span>
          </button>

          <!-- Dropdown menu -->
          <div
            v-on-click-outside="toggleMenuOptions"
            v-if="isOptionsOpen"
            class="absolute right-0 bg-white divide-y divide-gray-100 rounded shadow w-36"
          >
            <ul class="py-1 text-sm text-gray-700">
              <li>
                <a href="#" class="block px-4 py-2 text-red-600 hover:bg-gray-100">Denunciar</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>

    <!-- Content preview -->
    <main>
      <p class="pt-3 text-sm leading-5 text-gray-600 ml-11">
        {{ props.comment.content }}
      </p>
    </main>

    <footer>
      <!-- Info -->
      <div class="flex gap-5 mt-4">
        <button
          type="button"
          class="flex items-center gap-1 text-sm font-normal text-gray-400 hover:underline"
        >
          <svg
            class="w-[16px] h-[16px] text-red-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="m12.7 20.7 6.2-7.1c2.7-3 2.6-6.5.8-8.7A5 5 0 0 0 16 3c-1.3 0-2.7.4-4 1.4A6.3 6.3 0 0 0 8 3a5 5 0 0 0-3.7 1.9c-1.8 2.2-2 5.8.8 8.7l6.2 7a1 1 0 0 0 1.4 0Z"
            />
          </svg>

          {{ props.comment.likes }}
        </button>
      </div>
    </footer>
  </article>
</template>

<script setup lang="ts">
import { ref, defineProps, computed } from 'vue';

const props = defineProps(['comment']);
let isOptionsOpen = ref(false);

const toggleMenuOptions = () => {
  isOptionsOpen.value = !isOptionsOpen.value;
};

const formattedActivity = computed(() => {
  const diff = Date.now() - new Date(props.comment.updatedAt).getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `Há ${years} ano${years > 1 ? 's' : ''}`;
  } else if (months > 0) {
    return `Há ${months} mês${months > 1 ? 'es' : ''}`;
  } else if (weeks > 0) {
    return `Há ${weeks} semana${weeks > 1 ? 's' : ''}`;
  } else if (days > 0) {
    return `Há ${days} dia${days > 1 ? 's' : ''}`;
  } else if (hours > 0) {
    return `Há ${hours} hora${hours > 1 ? 's' : ''}`;
  } else if (minutes > 0) {
    return `Há ${minutes} minuto${minutes > 1 ? 's' : ''}`;
  } else {
    return `Há alguns segundos`;
  }
});
</script>
