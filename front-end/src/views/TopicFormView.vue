<template>
  <!-- Title -->
  <div class="pb-6 border-b mt-14 mb-9 border-x-c-gray-100">
    <h2 class="text-xl leading-7 text-c-gray-800 md:text-xl">Criar um novo tópico</h2>
    <p class="mt-1 text-sm leading-6 text-c-gray-500">
      Compartilhe suas ideias publicando um tópico!
    </p>
  </div>

  <!-- Form -->
  <form class="mt-4 mb-8 rounded-lg md:shadow md:border-c-gray-100 md:bg-white md:p-8">
    <div class="grid grid-cols-1 pb-7 gap-x-6 gap-y-6 sm:grid-cols-6">
      <!-- Title -->
      <div class="col-span-full">
        <div>
          <input
            type="text"
            id="search"
            class="block w-full py-2.5 px-3 text-sm text-c-gray-800 border bg-white border-c-gray-300 rounded-md outline-none md:bg-c-gray-50 focus:border-c-blue-500 focus:ring-c-blue-500"
            placeholder="Título"
            required
          />
        </div>
      </div>

      <!-- Course -->
      <div class="sm:col-span-3">
        <SelectButton default-label="Selecione um curso" :data="selectCourses" class="w-full" />
      </div>

      <!-- Tags -->
      <div class="sm:col-span-3">
        <SelectButton default-label="Selecione uma tag" :data="selectTags" class="w-full" />
      </div>

      <!-- Description -->
      <div class="col-span-full">
        <div class="mt-2">
          <textarea
            required
            id="about"
            name="about"
            rows="6"
            placeholder="Texto"
            class="block w-full py-2.5 px-3 text-sm bg-white border-gray-300 rounded-md shadow-sm outline-none resize-none text-c-gray-800 focus:border-c-blue-500 focus:ring-c-blue-500 sm:leading-6 md:bg-gray-50"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- Buttons -->
    <div class="flex items-center justify-between md:justify-end">
      <router-link
        to="/"
        class="px-4 py-3 mr-4 text-sm font-medium rounded-lg outline-none md:mr-6 text-c-gray-800 hover:bg-c-gray-100"
        >Cancelar</router-link
      >

      <button
        type="submit"
        class="px-4 py-3 text-sm font-medium text-white rounded-lg bg-c-blue-600 hover:bg-c-blue-700 focus:outline-none"
      >
        Publicar
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import SelectButton from '@/components/SelectButton.vue';
import { ref } from 'vue';

const selectTags = ref([
  { id: '1', label: 'Dúvida', selected: false },
  { id: '2', label: 'Artigo', selected: false },
  { id: '3', label: 'Projeto', selected: false },
  { id: '4', label: 'Oportunidade', selected: false },
  { id: '5', label: 'Recurso', selected: false }
]);

const selectCourses = ref([
  { id: '1', label: 'Análise e Desenvolvimento de Sistemas', selected: false },
  { id: '2', label: 'Sistemas de Informação', selected: false },
  { id: '3', label: 'Arquitetura', selected: false }
]);
</script>
