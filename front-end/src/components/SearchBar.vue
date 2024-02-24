<template>
  <button
    @click="toggleModal"
    type="button"
    class="text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-2"
  >
    <span class="sr-only">Search</span>
    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
      />
    </svg>
  </button>

  <div v-if="isOpen" class="fixed w-full inset-0 z-10 flex justify-center items-center">
    <!--Body-->
    <div class="relative w-10/12 sm:max-w-md overflow-y-auto rounded-lg z-20 shadow-md shadow-black/5">
      <div class="absolute inset-y-0 start-0 flex items-center ps-2">
        <button class="p-1">
          <svg
            class="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span class="sr-only">Search icon</span>
        </button>
      </div>
      <input
        type="search"
        class="block w-full p-2 ps-10 text-sm text-gray-600 rounded-lg bg-gray-50 border border-gray-300 outline-none"
        ref="search"
        placeholder="Pesquisar..."
      />
    </div>

    <div
      v-if="isOpen"
      @click.self="toggleModal"
      class="bg-gray-800 bg-opacity-50 fixed bottom-0 left-0 w-full h-full z-10"
    ></div>
  </div>
</template>

<script setup>
  import { onUpdated, ref } from 'vue';

  let isOpen = ref(false);
  const search = ref(null);

  function toggleModal() {
    isOpen.value = !isOpen.value;
  }

  onUpdated(() => {
    if (search.value != null) {
      search.value.focus();
    }
  });
</script>
