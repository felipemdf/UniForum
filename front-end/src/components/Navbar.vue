<template>
  <!-- Main Navigation Container -->
  <nav class="sticky z-10 top-0 start-0 w-full bg-white shadow-md shadow-black/5 px-4 py-4 md:px-8">
    <div class="flex flex-wrap items-center justify-between mx-auto w-full md:px-12">
      <!-- Logo -->
      <a class="text-xl whitespace-nowrap text-blue-600 p-0" href="#">UniForum</a>

      <!-- Menu Container -->
      <div class="flex items-center md:order-2 gap-0.2 md:gap-1">
        <!-- Mobile Search Button -->
        <SearchBarComponent />

        <!-- Connect Buttons -->
        <div v-if="!isLogged">
          <a
            href="#"
            class="text-gray-800 hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >Entrar</a
          >
          <a
            href="#"
            class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >Cadastrar</a
          >
        </div>

        <div v-if="isLogged" class="mx-4 md:mx-8">
          <button
            @click="toggleUserMenu"
            type="button"
            class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
          >
            <span class="sr-only">Open user menu</span>
            <img class="w-10 h-10 rounded-full" src="../assets/perfil.png" alt="user photo" />
          </button>
        </div>

        <!-- Dropdown menu -->
        <div
          v-if="isUserMenuOpen"
          class="absolute right-8 md:right-28 mt-[13.8rem] md:mt-[12.2rem] origin-top-right rounded-md shadow-lg w-48"
        >
          <div class="px-2 py-2 bg-white rounded-md shadow dark-mode:bg-gray-800">
            <a
              class="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              href="#"
              >Meu perfil</a
            >
            <a
              class="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              href="#"
              >Configurações</a
            >
            <a
              class="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              href="#"
              >Sair</a
            >
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!--Search 2-->
  <!-- <div v-if="openModal" class="relative w-full bg-white shadow-md shadow-black/5" id="search-content">
    <div class="container mx-auto px-4 md:px-0">
      <input
        id="searchfield"
        type="search"
        placeholder="Pesquisar..."
        autofocus="autofocus"
        class="w-full text-sm text-gray-900 transition focus:outline-none focus:border-transparent p-2 appearance-none leading-normal lg:text-lg"
      />
    </div>
  </div> -->
</template>

<script setup>
  import { ref } from 'vue';
  import SearchBarComponent from './SearchBar.vue';

  let isUserMenuOpen = ref(false);
  let isLogged = ref(false);

  function toggleUserMenu() {
    if (isLogged.value) {
      isUserMenuOpen.value = !isUserMenuOpen.value;
    } else {
      isUserMenuOpen.value = false;
    }
  }
</script>

<style></style>
