<template>
  <div>
    <!-- Title -->
    <div class="pb-6 border-b mt-14 mb-9 border-x-c-gray-100">
      <h2 class="text-xl leading-7 text-c-gray-800 md:text-xl">Configurações</h2>
      <p class="mt-1 text-sm leading-6 text-c-gray-500">Ajuste suas configurações de conta e perfil.</p>
    </div>
  </div>

  <!-- Container -->
  <div class="grid grid-cols-8 sm:grid-cols-10">
    <!-- Sidebar Container -->
    <div class="col-span-8 pb-2 sm:col-span-2 sm:block border-x-c-gray-100">
      <ul class="flex gap-4 sm:block">
        <router-link to="/config/account">
          <li
            :class="{ 'text-blue-700 sm:border-l-blue-700': $route.path === '/config/account' }"
            class="py-2 mt-5 font-semibold transition border-transparent cursor-pointer sm:px-2 sm:border-l-2 sm:hover:border-l-blue-700 hover:text-blue-700"
          >
            Conta
          </li>
        </router-link>

        <router-link to="/config/profile">
          <li
            :class="{ 'text-blue-700 sm:border-l-blue-700': $route.path === '/config/profile' }"
            class="py-2 mt-5 font-semibold transition border-transparent cursor-pointer sm:px-2 sm:border-l-2 sm:hover:border-l-blue-700 hover:text-blue-700"
          >
            Perfil
          </li>
        </router-link>
      </ul>
    </div>

    <!-- Content Container -->
    <div class="col-span-8 my-3 rounded-xl sm:bg-white sm:px-8 sm:shadow">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts"></script>
