<template>
  <div class="relative">
    <div class="relative text-sm font-medium text-c-gray-800">
      <button
        @click="toggleMenu"
        class="flex items-center justify-center w-full px-4 py-2 md:py-2.5 bg-white border border-gray-200 rounded-lg outline-none md:w-auto focus:outline-none hover:bg-gray-100"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          class="w-4 h-4 mr-2 text-gray-400"
          viewbox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
            clip-rule="evenodd"
          />
        </svg>
        Filtros

        <svg
          class="-mr-1 ml-1.5 w-5 h-5"
          fill="currentColor"
          viewbox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          />
        </svg>
      </button>
    </div>

    <!-- Dropdown Menu -->
    <div
      v-on-click-outside="toggleMenu"
      v-if="isMenuOpen"
      class="absolute right-0 z-10 flex flex-col mt-1 bg-white rounded-md shadow md:w-fit"
    >
      <!-- Filters Container -->
      <div class="flex overflow-y-auto h-60">
        <!-- Filters Block -->
        <div v-for="(checkboxes, filterLabel) in filters" :key="filterLabel" class="w-full">
          <!-- Filter Label -->
          <legend class="block w-full px-5 py-3 text-xs font-medium bg-gray-50">
            {{ filterLabel }}
          </legend>

          <!-- Filter List -->
          <ul>
            <li v-for="item in checkboxes" :key="item.id" class="px-5 py-2">
              <div class="flex items-center">
                <input
                  v-model="item.checked"
                  :id="'checkbox_' + item.id"
                  :value="item.id"
                  type="checkbox"
                  name="type[New]"
                  class="w-5 h-5 border-gray-300 rounded cursor-pointer focus:ring-transparent"
                  checked
                />
                <label for="New" class="ml-3 text-sm font-medium"> {{ item.label }} </label>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="flex justify-between gap-3 px-5 py-3 border-t border-gray-200">
        <button
          @click.prevent="$emit('clean')"
          name="reset"
          type="button"
          class="text-xs font-medium underline rounded text-c-gray-500 hover:text-c-gray-800"
        >
          Resetar
        </button>

        <button
          @click.prevent="$emit('filter')"
          name="commit"
          type="button"
          class="px-5 py-3 text-xs font-medium text-white rounded-lg bg-c-blue-600 hover:bg-c-blue-700"
        >
          Filtrar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps(['filters']);

const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
</script>
