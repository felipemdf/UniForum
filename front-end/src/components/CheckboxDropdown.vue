<template>
  <div class="relative text-sm font-medium text-gray-900">
    <button
      :class="{ 'justify-between md:w-full hover:bg-white ': props.isFilter != undefined }"
      @click="toggleMenu"
      class="flex items-center justify-center w-full px-4 py-2 md:py-2.5 bg-white border border-gray-200 rounded-lg outline-none md:w-auto focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
      type="button"
    >
      <slot></slot>
    </button>

    <!-- Dropdown Menu -->
    <div
      :class="{ 'md:w-full': props.isFilter != undefined }"
      v-on-click-outside="toggleMenu"
      v-if="menu"
      class="absolute z-10 w-full mt-1 bg-white rounded-md shadow md:w-fit"
    >
      <ul :class="{ 'h-28 ': props.isFilter != undefined }" class="h-48 p-3 pr-5 overflow-y-auto">
        <li v-for="checkbox in props.checkBoxes" :key="checkbox.id">
          <div class="flex items-center pl-2.5 pr-3 rounded hover:bg-gray-100">
            <input
              v-model="checkbox.checked"
              :id="checkbox.id"
              name="tag"
              type="checkbox"
              value=""
              class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded outline-none appearance-none cursor-pointer focus:ring-blue-500 checked:bg-blue-500"
            />
            <label :for="checkbox.id" class="w-full py-2 rounded ms-2">{{ checkbox.label }} </label>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
  import { ref, defineProps } from 'vue';
  const props = defineProps(['isFilter', 'checkBoxes']);
  const menu = ref(false);

  function toggleMenu() {
    menu.value = !menu.value;
  }
</script>
