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
              class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg outline-none bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
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
          type="button"
          class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 focus:outline-none"
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

        <!-- Button Filter Curso -->
        <div class="relative">
          <button
            @click="toggleFilter('filterCurso')"
            class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
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
          </button>

          <!-- Dropdown Menu -->
          <div
            v-on-click-outside="toggleFilter"
            v-if="filters.filterCurso"
            class="absolute right-0 z-10 w-full mt-1 bg-white rounded-lg shadow md:w-60"
          >
            <ul class="h-48 p-3 overflow-y-auto text-sm text-gray-700">
              <li>
                <div class="flex items-center rounded ps-2.5 hover:bg-gray-100">
                  <input
                    id="checkbox-item-1"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded outline-none appearance-none cursor-pointer focus:ring-blue-500 checked:bg-blue-500"
                  />
                  <label for="checkbox-item-1" class="w-full py-2 text-sm font-medium text-gray-900 rounded ms-2"
                    >Análise e Desenvolvimento de Sistemas
                  </label>
                </div>
              </li>
              <li>
                <div class="flex items-center rounded ps-2.5 hover:bg-gray-100">
                  <input
                    checked
                    id="checkbox-item-2"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded outline-none appearance-none cursor-pointer focus:ring-blue-500 checked:bg-blue-500"
                  />
                  <label for="checkbox-item-2" class="w-full py-2 text-sm font-medium text-gray-900 rounded ms-2"
                    >Sistemas de Informação
                  </label>
                </div>
              </li>
              <li>
                <div class="flex items-center rounded ps-2.5 hover:bg-gray-100">
                  <input
                    id="checkbox-item-3"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded outline-none appearance-none cursor-pointer focus:ring-blue-500 checked:bg-blue-500"
                  />
                  <label for="checkbox-item-3" class="w-full py-2 text-sm font-medium text-gray-900 rounded ms-2"
                    >Arquitetura
                  </label>
                </div>
              </li>
              <li>
                <div class="flex items-center rounded ps-2.5 hover:bg-gray-100">
                  <input
                    id="checkbox-item-4"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded outline-none appearance-none cursor-pointer focus:ring-blue-500 checked:bg-blue-500"
                  />
                  <label for="checkbox-item-4" class="w-full py-2 text-sm font-medium text-gray-900 rounded ms-2"
                    >Direito
                  </label>
                </div>
              </li>
              <li>
                <div class="flex items-center rounded ps-2.5 hover:bg-gray-100">
                  <input
                    id="checkbox-item-5"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded outline-none appearance-none cursor-pointer focus:ring-blue-500 checked:bg-blue-500"
                  />
                  <label for="checkbox-item-5" class="w-full py-2 text-sm font-medium text-gray-900 rounded ms-2"
                    >Engenharia Elétrica
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Button Filter Tags -->
        <div class="relative">
          <button
            @click="toggleFilter('filterTag')"
            class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
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
          </button>

          <!-- Dropdown Menu -->
          <div
            v-on-click-outside="toggleFilter"
            v-if="filters.filterTag"
            class="absolute z-10 w-full mt-1 bg-white rounded-lg shadow md:w-48"
          >
            <ul class="h-48 p-3 overflow-y-auto text-sm text-gray-700">
              <li>
                <div class="flex items-center rounded ps-2.5 hover:bg-gray-100">
                  <input
                    id="checkbox-tag-1"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded outline-none appearance-none cursor-pointer focus:ring-blue-500 checked:bg-blue-500"
                  />
                  <label for="checkbox-tag-1" class="w-full py-2 text-sm font-medium text-gray-900 rounded ms-2"
                    >Dúvida
                  </label>
                </div>
              </li>
              <li>
                <div class="flex items-center rounded ps-2.5 hover:bg-gray-100">
                  <input
                    checked
                    id="checkbox-tag-2"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded outline-none appearance-none cursor-pointer focus:ring-blue-500 checked:bg-blue-500"
                  />
                  <label for="checkbox-tag-2" class="w-full py-2 text-sm font-medium text-gray-900 rounded ms-2"
                    >Artigo
                  </label>
                </div>
              </li>
              <li>
                <div class="flex items-center rounded ps-2.5 hover:bg-gray-100">
                  <input
                    id="checkbox-tag-3"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded outline-none appearance-none cursor-pointer focus:ring-blue-500 checked:bg-blue-500"
                  />
                  <label for="checkbox-tag-3" class="w-full py-2 text-sm font-medium text-gray-900 rounded ms-2"
                    >Projeto
                  </label>
                </div>
              </li>
              <li>
                <div class="flex items-center rounded ps-2.5 hover:bg-gray-100">
                  <input
                    id="checkbox-tag-4"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded outline-none appearance-none cursor-pointer focus:ring-blue-500 checked:bg-blue-500"
                  />
                  <label for="checkbox-tag-4" class="w-full py-2 text-sm font-medium text-gray-900 rounded ms-2"
                    >Oportunidade
                  </label>
                </div>
              </li>
              <li>
                <div class="flex items-center rounded ps-2.5 hover:bg-gray-100">
                  <input
                    id="checkbox-tag-5"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded outline-none appearance-none cursor-pointer focus:ring-blue-500 checked:bg-blue-500"
                  />
                  <label for="checkbox-item-5" class="w-full py-2 text-sm font-medium text-gray-900 rounded ms-2"
                    >Recurso
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>
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
  import { ref } from 'vue';

  const filters = ref({ filterCurso: false, filterTag: false });

  function toggleFilter(filterName) {
    for (const filter in filters.value) {
      if (filter != filterName) {
        filters.value[filter] = false;
        continue;
      }

      filters.value[filter] = !filters.value[filter];
    }
  }
</script>
