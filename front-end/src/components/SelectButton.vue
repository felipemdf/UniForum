<template>
  <div class="relative w-full text-sm text-c-gray-800">
    <button
      @click="toggleMenu"
      class="flex items-center justify-between w-full px-4 py-2.5 bg-white border border-c-gray-200 rounded-md outline-none focus:outline-none md:bg-gray-50 hover:bg-c-gray-100"
      type="button"
    >
      {{ selectedItem || props.defaultLabel }}

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

    <!-- Dropdown Menu -->
    <div
      v-on-click-outside="toggleMenu"
      v-if="isMenuOpen"
      class="absolute z-10 w-full mt-1 bg-white rounded-md shadow"
    >
      <ul :class="{ 'h-48': isScroll == true }" class="p-3 pr-5 overflow-y-auto">
        <li v-if="props.defaultLabel != undefined && props.defaultLabel != ''">
          <div class="flex items-center pl-2.5 pr-3 rounded hover:bg-c-gray-100">
            <button
              @click="selectItem(-1)"
              type="button"
              class="block w-full px-2 py-2 rounded-lg hover:bg-gray-100 text-start"
            >
              {{ props.defaultLabel }}...
            </button>
          </div>
        </li>

        <li v-for="item in props.data" :key="item.id">
          <div class="flex items-center pl-2.5 pr-3 rounded hover:bg-c-gray-100">
            <button
              @click="selectItem(item.id)"
              type="button"
              class="block w-full px-2 py-2 rounded-lg hover:bg-gray-100 text-start"
            >
              {{ item.label }}
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, computed } from 'vue';

const props = defineProps(['data', 'defaultLabel', 'isScroll']);
const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

const selectItem = (id: number) => {
  props.data.forEach((item: any) => (item.selected = item.id === id));
  toggleMenu();
};

const selectedItem = computed(() => props.data.find((item: any) => item.selected)?.label);
</script>
