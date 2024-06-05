<template>
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
      {{ props.label }}

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
      class="absolute z-10 w-full mt-1 bg-white rounded-md shadow md:w-fit"
    >
      <ul class="h-48 p-3 pr-5 overflow-y-auto">
        <li v-for="item in data" :key="item.id">
          <div class="flex items-center pl-2.5 pr-3 rounded hover:bg-gray-100">
            <input
              @change="$emit('toggleCheckbox')"
              v-model="item.checked"
              :id="'filter_' + item.id"
              :value="item.id"
              type="checkbox"
              class="w-4 h-4 text-blue-600 border-gray-300 rounded outline-none appearance-none cursor-pointer focus:ring-blue-500 checked:bg-blue-500"
            />
            <label :for="'course_' + item.id" class="w-full py-2 rounded ms-2"
              >{{ item.label }}
            </label>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['data', 'label', 'toggleCheckbox']);
const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
</script>
