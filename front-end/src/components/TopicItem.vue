<template>
  <article class="p-6 mb-4 bg-white border-gray-200 shadow rounded">
    <!-- Header -->
    <header class="flex-col">
      <!-- First line -->
      <div class="flex justify-between mb-4">
        <!-- User and topic info -->
        <div class="flex items-center gap-1 flex-wrap">
          <button class="inline-flex items-center gap-1">
            <img
              class="mr-2 w-8 h-8 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
              alt="Username"
            />
            <p class="text-sm font-medium text-gray-900">Podório</p>
          </button>
          <p class="text-sm text-gray-500">- Há 2 horas</p>
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
            <span class="sr-only">Topic settings</span>
          </button>

          <!-- Dropdown menu -->
          <div v-if="isOptionsOpen" class="absolute right-0 w-36 bg-white rounded divide-y divide-gray-100 shadow">
            <ul class="py-1 text-sm text-gray-700">
              <li>
                <a href="#" class="block py-2 px-4 hover:bg-gray-100 text-red-600">Denunciar</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Title -->
      <p class="text-gray-900 text-xl font-medium leading-5 border-b pb-4 border-x-gray-100">
        The Future of Magazines Is on Tablets
      </p>
    </header>

    <!-- Content preview -->
    <main>
      <p class="text-sm leading-5 pt-4 text-gray-600">
        Today, we're looking at three particularly interesting stories. Pinterest added a new location-based feature...
      </p>

      <!-- Tags -->
      <div class="flex flex-wrap mt-4 gap-2">
        <div class="py-2 px-3 text-xs leading-3 text-indigo-700 rounded-xl bg-indigo-100">Sistema de Informação</div>
        <div class="py-2 px-3 text-xs leading-3 text-indigo-700 rounded-xl bg-indigo-100">Projeto Integrador</div>
      </div>
    </main>

    <footer>
      <!-- Info -->
      <div class="flex gap-5 mt-4">
        <button type="button" class="flex items-center text-sm text-gray-400 hover:underline font-normal gap-1">
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

          891
        </button>

        <button type="button" class="flex items-center text-sm text-gray-400 hover:underline font-normal gap-1">
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

          891
        </button>
      </div>
    </footer>
  </article>
</template>

<script setup>
  import { ref } from 'vue';

  let isOptionsOpen = ref(false);

  function toggleMenuOptions() {
    isOptionsOpen.value = !isOptionsOpen.value;
  }
</script>
