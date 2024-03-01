<template>
  <!-- Title -->
  <div class="pb-6 my-5 border-b border-x-gray-100">
    <h2 class="text-xl font-semibold leading-7 text-gray-900">Criar um novo tópico</h2>
    <!-- <p class="mt-1 text-sm leading-6 text-gray-600">
      This information will be displayed publicly so be careful what you share.
    </p> -->
  </div>
  <form class="p-4 mt-8 bg-white border-gray-200 rounded-lg shadow md:p-8">
    <!-- Form -->
    <div class="grid grid-cols-1 pb-8 gap-x-6 gap-y-6 sm:grid-cols-6">
      <!-- Title -->
      <div class="col-span-full">
        <!-- <label for="street-address" class="block text-sm font-medium leading-6 text-gray-900">Título</label> -->
        <div class="mt-2">
          <input
            required
            type="text"
            placeholder="Título"
            class="block w-full py-2 pl-4 text-sm text-gray-900 border-0 rounded-md outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 bg-gray-50"
          />
        </div>
      </div>

      <!-- Course -->
      <div class="sm:col-span-3">
        <!-- <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Curso</label> -->
        <div class="w-full mt-2">
          <SelectDropdown :default-text="selectedCourse || 'Selecione um curso'" :options="selectCourses" />
        </div>
      </div>

      <!-- Tags -->
      <div class="sm:col-span-3">
        <!-- <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Tags</label> -->
        <div class="w-full mt-2">
          <SelectDropdown :default-text="selectedTag || 'Selecione uma tag'" :options="selectTags" />
        </div>
      </div>

      <!-- Description -->
      <div class="col-span-full">
        <!-- <label for="about" class="block text-sm font-medium leading-6 text-gray-900">Descrição</label> -->
        <div class="mt-2">
          <textarea
            required
            id="about"
            name="about"
            rows="6"
            placeholder="Texto"
            class="block w-full py-2 pl-4 text-sm text-gray-900 border-0 rounded-md shadow-sm outline-none resize-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 bg-gray-50"
          ></textarea>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-end">
      <button
        @click="this.$router.push('/')"
        class="text-gray-800 hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 md:px-5 py-2 md:py-2.5 mr-4 focus:outline-none"
      >
        Cancelar
      </button>
      <button
        type="submit"
        class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 md:px-5 py-2 md:py-2.5 mr-2 focus:outline-none"
      >
        Publicar
      </button>
    </div>
  </form>
</template>

<script setup>
  import SelectDropdown from '@/components/SelectDropdown.vue';
  import { computed, ref } from 'vue';

  const selectTags = ref([
    { id: '1', label: 'Dúvida', selected: false },
    { id: '2', label: 'Artigo', selected: false },
    { id: '3', label: 'Projeto', selected: false },
    { id: '4', label: 'Oportunidade', selected: false },
    { id: '5', label: 'Recurso', selected: false },
  ]);

  const selectCourses = ref([
    { id: '1', label: 'Análise e Desenvolvimento de Sistemas', selected: false },
    { id: '2', label: 'Sistemas de Informação', selected: false },
    { id: '3', label: 'Arquitetura', selected: false },
  ]);

  const selectedTag = computed(() => {
    return selectTags.value.find((tag) => tag.selected)?.label;
  });

  const selectedCourse = computed(() => {
    return selectCourses.value.find((course) => course.selected)?.label;
  });
</script>
