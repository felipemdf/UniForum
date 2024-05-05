<template>
  <!-- Title -->
  <div class="pt-4">
    <h1 class="py-2 text-2xl font-medium">Configurações da conta</h1>
  </div>

  <!-- Email -->
  <hr class="mt-4 mb-8" />
  <p class="font-semibold">Endereço de email</p>
  <div class="flex flex-col text-sm sm:flex-row sm:items-center sm:justify-between">
    <p class="pb-3 text-sm text-gray-600 sm:pb-1">
      Seu endereço de email é <strong>felipe@gmail.com</strong>
    </p>
    <button class="inline-flex text-sm font-medium text-blue-600">Alterar</button>
  </div>

  <!-- Password -->
  <hr class="mt-4 mb-8" />
  <p class="font-semibold">Alterar senha</p>
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
    <p class="pb-3 text-sm text-gray-600 sm:pb-1">A senha deve ter ao menos 8 caracteres.</p>
    <button class="inline-flex text-sm font-medium text-blue-600">Alterar</button>
  </div>

  <!-- Delete account -->
  <hr class="mt-4 mb-8" />
  <p class="font-semibold">Excluir Conta</p>
  <div class="flex flex-col mb-8 sm:flex-row sm:items-center sm:justify-between">
    <p class="pb-3 text-sm text-gray-600 sm:pb-1">
      Não há como acessar sua conta depois dessa ação.
    </p>
    <button class="inline-flex text-sm font-medium text-rose-600">Excluir</button>
  </div>
</template>

<script setup lang="ts"></script>
