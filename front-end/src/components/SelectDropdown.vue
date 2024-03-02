<template>
  <div class="relative text-sm text-gray-900">
    <button
      @click="toggleMenu"
      class="flex items-center justify-between w-full px-4 py-2 md:py-2.5 bg-white md:bg-gray-50 border-0 rounded-md outline-none ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
      type="button"
    >
      {{ value || defaultText }}
      <svg
        class="mr-1 ml-1.5 w-5 h-5"
        fill="rgb(107 114 128)"
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
      v-if="menu"
      class="absolute z-10 w-full mt-1 bg-white rounded-md shadow md:w-full"
    >
      <ul class="h-48 p-3 pr-5 overflow-y-auto">
        <li>
          <div class="flex items-center pl-2 pr-3 rounded hover:bg-gray-100">
            <button
              @click="selectCourse(-1)"
              type="button"
              class="block w-full px-2 py-2 rounded-lg hover:bg-gray-100 text-start"
            >
              {{ defaultText }}...
            </button>
          </div>
        </li>
        <li v-for="option in props.options" :key="option.id">
          <div class="flex items-center pl-2 pr-3 rounded hover:bg-gray-100">
            <button
              @click="selectCourse(option.id)"
              type="button"
              class="block w-full px-2 py-2 rounded-lg hover:bg-gray-100 text-start"
            >
              {{ option.label }}
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
  import { ref, defineProps } from 'vue';
  const props = defineProps(['value', 'options', 'defaultText']);
  const menu = ref(false);

  const selectCourse = (id) => {
    props.options.forEach((option) => (option.selected = option.id === id));

    toggleMenu();
  };

  function toggleMenu() {
    menu.value = !menu.value;
  }
</script>
