<template>
  <!-- Filters -->
  <div class="relative mb-4 bg-white border-gray-200 rounded shadow">
    <div class="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
      <!-- Search Input -->
      <div class="w-full md:w-1/2">
        <form class="flex items-center">
          <label for="search" class="sr-only">Search</label>
          <div class="relative w-full">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewbox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="search"
              class="block w-full py-2.5 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg outline-none bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Pesquisar..."
              required=""
            />
          </div>
        </form>
      </div>

      <!-- Filter Button -->
      <div
        class="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3"
      >
        <!-- Button Novo Tópico -->
        <button
          @click="this.$router.push({ name: 'createTopic' })"
          type="button"
          class="flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 focus:outline-none"
        >
          <svg
            class="w-[14px] h-[14px] mr-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              d="M5 12h14m-7 7V5"
            />
          </svg>
          Novo Tópico
        </button>

        <!-- Checkbox Filter Tags -->
        <CheckboxDropdown :checkBoxes="checkboxCourses">
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
          Cursos

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
        </CheckboxDropdown>

        <!-- Checkbox Filter Tags -->
        <CheckboxDropdown :checkBoxes="checkboxFilters">
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
          Tags

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
        </CheckboxDropdown>
      </div>
    </div>
  </div>

  <!-- Order by -->
  <div class="relative overflow-hidden">
    <div class="flex flex-row items-center justify-between px-2 py-4">
      <div class="inline-flex flex-row w-full gap-4">
        <a class="text-sm text-gray-500 cursor-pointer" @click="orderBy = 'maisRecente'"
          ><p :class="{ 'text-blue-500  ': orderBy == 'maisRecente' }">Mais recentes</p></a
        >

        <a class="text-sm text-gray-500 cursor-pointer" @click="orderBy = 'melhores'"
          ><p :class="{ 'text-blue-500  ': orderBy == 'melhores' }">Melhores</p></a
        >
      </div>
    </div>
  </div>

  <!-- Topics -->
  <section>
    <TopicItem />
    <TopicItem />
  </section>
</template>

<script setup>
  import TopicItem from '@/components/TopicItem.vue';
  import CheckboxDropdown from '@/components/CheckboxDropdown.vue';

  import { ref } from 'vue';

  const checkboxFilters = ref([
    { id: '1', label: 'Dúvida', checked: false },
    { id: '2', label: 'Artigo', checked: false },
    { id: '3', label: 'Projeto', checked: false },
    { id: '4', label: 'Oportunidade', checked: false },
    { id: '5', label: 'Recurso', checked: false },
  ]);
  const checkboxCourses = ref([
    { id: '1', label: 'Análise e Desenvolvimento de Sistemas', checked: false },
    { id: '2', label: 'Sistemas de Informação', checked: false },
    { id: '3', label: 'Arquitetura', checked: false },
  ]);

  const orderBy = ref('maisRecente');
</script>
