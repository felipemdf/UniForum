<template>
  <!-- Main Navigation Container -->
  <nav class="sticky top-0 z-10 w-full px-4 py-5 mb-2 bg-white shadow-md start-0 shadow-black/5 md:px-8">
    <div class="flex flex-wrap items-center justify-between w-full mx-auto md:px-12">
      <!-- Logo -->
      <a @click="this.$router.push({ name: 'home' })" class="p-0 text-2xl text-blue-600 whitespace-nowrap" href="#"
        >UniForum</a
      >

      <!-- Menu Container -->
      <div class="flex items-center md:order-2 gap-0.2 md:gap-1">
        <!-- Mobile Search Button -->
        <!-- <SearchBarComponent /> -->

        <!-- Connect Buttons -->
        <div v-if="!isLogged" class="my-2">
          <a
            href="#"
            class="text-gray-800 hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 md:px-5 py-2 md:py-2.5 mr-4 focus:outline-none"
            >Entrar</a
          >
          <a
            href="#"
            class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 md:px-5 py-2 md:py-2.5 mr-2 focus:outline-none"
            >Cadastrar</a
          >
        </div>

        <!-- Logged Avatar -->
        <div v-if="isLogged" class="relative md:mx-8">
          <div class="inline-flex items-center justify-center gap-4 align-middle">
            <button @click="toggleUserMenu" type="button" class="flex items-center gap-3 text-sm md:me-0">
              <span class="sr-only">Open user menu</span>
              <img class="w-10 h-10 rounded-full" src="../assets/perfil.png" alt="user photo" />

              <p class="text-base font-medium text-gray-800">Podório</p>
            </button>
          </div>

          <!-- Dropdown menu -->
          <div
            v-on-click-outside="toggleUserMenu"
            v-if="isUserMenuOpen"
            class="absolute right-0 mt-2 bg-white divide-gray-100 rounded shadow w-36"
          >
            <ul class="py-1 text-sm">
              <li>
                <a href="#" class="block px-4 py-2 font-normal hover:bg-gray-100">Meu perfil</a>
              </li>

              <li>
                <a href="#" class="block px-4 py-2 font-normal hover:bg-gray-100">Configurações</a>
              </li>

              <li>
                <a href="#" class="block px-4 py-2 font-normal text-red-600 hover:bg-gray-100">Sair</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
  import { ref } from 'vue';

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
