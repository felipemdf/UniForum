<!-- Modal.vue -->
<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div
      class="flex flex-col items-center max-w-lg px-8 py-10 text-gray-800 bg-white border rounded-md shadow-lg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-16 h-16 p-2 text-red-500 rounded-xl bg-red-50"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
      <p class="mt-4 text-lg text-center">
        Você tem certeza que deseja excluir?
      </p>
      <div
        class="flex flex-col justify-center mt-8 space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0"
      >
         <button
          class="px-4 py-3 font-medium text-white bg-red-500 rounded-md whitespace-nowrap"
          @click.prevent="$emit('confirmDelete', true)"
        >
          Confirmar
        </button>
        <button
          class="px-4 py-3 font-medium bg-gray-200 rounded-md whitespace-nowrap"
          @click.prevent="$emit('confirmDelete', false)"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>
