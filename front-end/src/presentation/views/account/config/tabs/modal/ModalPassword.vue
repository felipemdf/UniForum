<!-- Modal.vue -->
<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div
      class="flex flex-col items-center max-w-lg px-8 py-8 text-gray-800 bg-white border rounded-md shadow-lg min-w-[380px]"
    >
      <!--Presentation -->
      <h4 class="pb-4 mb-3 text-lg font-medium xl:text-xl text-c-gray-80">Alterar senha</h4>

      <form class="w-full" method="POST" @submit.prevent="onSubmit">
        <!-- Password -->
        <div class="mb-4">
          <div class="flex justify-between">
            <label
              class="inline-block mb-2 text-xs font-medium uppercase text-c-gray-800"
              for="password"
              >Senha</label
            >
          </div>
          <div class="relative flex flex-wrap items-stretch w-full">
            <input
              type="password"
              id="password"
              class="block w-full py-2.5 px-3 text-sm bg-white border border-gray-400 rounded-md outline-none text-c-gray-800 focus:border-c-blue-500 focus:ring-c-blue-500 focus:shadow"
              name="password"
              placeholder="Senha (mínimo de 8 caracteres)"
              required
              v-model="form.password"
            />
          </div>
        </div>

        <!-- Password -->
        <div class="mb-6">
          <div class="flex justify-between">
            <label
              class="inline-block mb-2 text-xs font-medium uppercase text-c-gray-800"
              for="confirmPassword"
              >Confirmar senha</label
            >
          </div>
          <div class="relative flex flex-wrap items-stretch w-full">
            <input
              type="password"
              id="confirmPassword"
              class="block w-full py-2.5 px-3 text-sm bg-white border border-gray-400 rounded-md outline-none text-c-gray-800 focus:border-c-blue-500 focus:ring-c-blue-500 focus:shadow"
              name="confirmPassword"
              placeholder="Senha (mínimo de 8 caracteres)"
              required
              v-model="form.confirmPassword"
            />
          </div>
        </div>

        <div class="flex justify-center gap-4">
          <button
            class="px-4 py-2 font-medium text-white rounded-md bg-c-blue-600 whitespace-nowrap"
            type="submit"
          >
            Confirmar
          </button>
          <button
            class="px-4 py-2 font-medium bg-gray-200 rounded-md whitespace-nowrap"
            @click.prevent="$emit('cancel')"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['updatePassword', 'cancel']);
const form = ref({ password: '', confirmPassword: '' });

async function onSubmit() {
  if (form.value.password.trim() !== form.value.confirmPassword.trim()) {
    throw new Error('Senhas não coincidem!');
  }

  emit('updatePassword', form.value.password);
}
</script>
