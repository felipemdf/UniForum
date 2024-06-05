<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div class="fixed top-0 z-30 flex flex-col items-center justify-center w-full p-3">
    <div v-for="notification in notifications" :class="notification.type">
      <div
        class="relative max-w-sm px-12 py-6 m-2 my-2 bg-white border border-gray-100 rounded-lg shadow-md"
      >
        <button
          @click="toastStore.removeToast(notification)"
          class="absolute top-0 right-0 p-4 text-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="3"
            stroke="currentColor"
            class="w-4 h-5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div v-if="notification.type == NotificationType.Success">
          <p class="relative mb-1 text-sm font-medium">
            <span
              class="absolute flex items-center justify-center w-5 h-5 text-white bg-green-400 -left-7 rounded-xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-3 h-3"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </span>
            <span class="text-gray-700">Sucesso!</span>
          </p>
        </div>

        <div v-if="notification.type == NotificationType.Error">
          <p class="relative mb-1 text-sm font-medium">
            <span
              class="absolute flex items-center justify-center w-5 h-5 text-white bg-red-400 -left-7 rounded-xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-3 h-3"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
            <span class="text-gray-700">Erro!</span>
          </p>
        </div>

        <div v-if="notification.type == NotificationType.Warning">
          <p class="relative mb-1 text-sm font-medium">
            <span
              class="absolute flex items-center justify-center w-5 h-5 text-white bg-yellow-400 -left-7 rounded-xl"
            >
              !
            </span>
            <span class="text-gray-700">Atenção</span>
          </p>
        </div>

        <p class="text-sm text-gray-600">
          {{ notification.message }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const toastStore = useToastStore();

const { notifications } = storeToRefs(toastStore);
</script>
