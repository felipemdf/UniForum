<template>
  <!-- Title -->
  <div class="pt-4">
    <h1 class="py-2 text-2xl font-medium">Personalizar perfil</h1>
  </div>

  <!-- Email -->
  <hr class="mt-4 mb-8" />
  <div class="col-span-full">
    <p class="font-semibold">Nome de exibição</p>
    <p class="mb-2 text-sm text-gray-600 sm:pb-1">Defina um nome de exibição</p>

    <input
      type="text"
      id="search"
      class="block w-full py-2.5 p-2 pl-5 text-sm text-c-gray-800 border bg-white border-c-gray-300 rounded-md outline-none md:bg-c-gray-50 focus:border-c-blue-500 focus:ring-c-blue-500"
      placeholder="Nome de exibição"
      required
    />
  </div>

  <!-- Gender -->
  <hr class="mt-4 mb-8" />
  <div class="grid sm:grid-cols-8">
    <div class="sm:col-span-4">
      <p class="font-semibold">Gênero</p>
      <p class="mb-2 text-sm text-gray-600 sm:pb-1">Especifique o seu gênero</p>

      <SelectButton :data="selectGender" />
    </div>
  </div>

  <hr class="mt-4 mb-8" />
  <div class="grid gap-5 sm:grid-cols-8">
    <!-- Course -->
    <div class="sm:col-span-4">
      <p class="font-semibold">Curso</p>
      <p class="mb-2 text-sm text-gray-600 sm:pb-1">Especifique o seu curso</p>

      <SelectButton :data="selectCourse" :is-scroll="true" />
    </div>

    <!-- Período -->
    <div class="sm:col-span-4">
      <p class="font-semibold">Período</p>
      <p class="mb-2 text-sm text-gray-600 sm:pb-1">Especifique o período do seu curso</p>

      <div class="relative">
        <input
          type="text"
          id="price"
          name="price"
          class="block w-full py-3 pl-4 text-sm border border-gray-200 rounded-md shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 md:bg-c-gray-50"
          placeholder="Digite o período"
        />
        <div class="absolute inset-y-0 right-0 z-20 flex items-center pr-4 pointer-events-none">
          <span class="text-gray-500">Período</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Avatar -->
  <hr class="mt-4 mb-8" />
  <!-- Description -->
  <div class="mb-8 col-span-full">
    <p class="font-semibold">Imagem de perfil</p>
    <p class="mb-2 text-sm text-gray-600 sm:pb-1">Altere sua imagem de perfil</p>

    <div
      class="flex flex-col items-center justify-center w-full h-56 gap-4 p-5 text-center border border-gray-300 border-dashed rounded-xl"
    >
      <img src="../../../public/userIcon.png" class="w-16 h-16 rounded-full" />
      <p class="text-sm text-gray-600">
        Solte o arquivo de imagem desejado aqui para iniciar o upload
      </p>

      <input
        type="file"
        class="max-w-full px-2 font-medium text-blue-600 rounded-lg outline-none ring-blue-600 focus:ring-1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import SelectButton from '@/components/SelectButton.vue';
import { ref } from 'vue';

const selectGender = ref([
  { id: '1', label: 'Masculino', selected: true },
  { id: '2', label: 'Feminino', selected: false }
]);

const selectCourse = ref([
  { id: 1, label: 'Administração', selected: true },
  { id: 2, label: 'Biomedicina', selected: false },
  { id: 3, label: 'Enfermagem', selected: false },
  { id: 4, label: 'Engenharia Civil', selected: false },
  { id: 5, label: 'Farmácia', selected: false },
  { id: 6, label: 'Nutrição', selected: false },
  { id: 7, label: 'Arquitetura e Urbanismo', selected: false },
  { id: 8, label: 'Direito', selected: false },
  { id: 9, label: 'Engenharia Ambiental', selected: false },
  { id: 10, label: 'Letras', selected: false },
  { id: 11, label: 'Psicologia', selected: false },
  { id: 12, label: 'Análise e Desenvolvimento de Sistema', selected: false },
  { id: 13, label: 'Ciências Contábeis', selected: false },
  { id: 14, label: 'Engenharia Mecânica', selected: false },
  { id: 15, label: 'Gastronomia', selected: false },
  { id: 16, label: 'Pedagogia', selected: false },
  { id: 17, label: 'Sistemas de Informação', selected: false }
]);
</script>
