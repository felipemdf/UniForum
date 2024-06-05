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
      Seu endereço de email é <strong>{{ authStore.user.email }}</strong>
    </p>
    <button
      class="inline-flex text-sm font-medium text-blue-600"
      @click.prevent="toggleConfirmModal('EMAIL')"
    >
      Alterar
    </button>
    <ModalEmail
      v-if="isModalOpen['EMAIL']"
      @cancel="toggleConfirmModal('EMAIL')"
      @updateEmail="onUpdateEmail"
    />
  </div>

  <!-- Password -->
  <hr class="mt-4 mb-8" />
  <p class="font-semibold">Alterar senha</p>
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
    <p class="pb-3 text-sm text-gray-600 sm:pb-1">A senha deve ter ao menos 8 caracteres.</p>
    <button
      class="inline-flex text-sm font-medium text-blue-600"
      @click.prevent="toggleConfirmModal('PASSWORD')"
    >
      Alterar
    </button>
    <ModalPassword
      v-if="isModalOpen['PASSWORD']"
      @cancel="toggleConfirmModal('PASSWORD')"
      @updatePassword="onUpdatePassword"
    />
  </div>

  <!-- Delete account -->
  <hr class="mt-4 mb-8" />
  <p class="font-semibold">Excluir Conta</p>
  <div class="flex flex-col mb-8 sm:flex-row sm:items-center sm:justify-between">
    <p class="pb-3 text-sm text-gray-600 sm:pb-1">
      Não há como acessar sua conta depois dessa ação.
    </p>
    <button
      class="inline-flex text-sm font-medium text-rose-600"
      @click.prevent="toggleConfirmModal('DELETE')"
    >
      Excluir
    </button>
    <PopupConfirmDelete v-if="isModalOpen['DELETE']" @confirmDelete="onConfirmDelete" />
  </div>
</template>

<script setup lang="ts">
// Refs
const isModalOpen: Ref<Record<string, boolean>> = ref({});

// Stores
const authStore = useAuthStore();
const toastStore = useToastStore();
const router = useRouter();

async function onUpdatePassword(password: string) {
  try {
    await authStore.updateUser(null, password);
  } catch (error: any) {
    toastStore.notify(error.message, NotificationType.Error);
  } finally {
    toggleConfirmModal('PASSWORD');
  }
}

async function onUpdateEmail(email: string) {
  try {
    await authStore.updateUser(email, null);
  } catch (error: any) {
    toastStore.notify(error.message, NotificationType.Error);
  } finally {
    toggleConfirmModal('EMAIL');
  }
}

async function onConfirmDelete(confirm: boolean) {
  if (confirm) {
    try {
      await authStore.deleteUser();
      router.push('/home');
    } catch (error: any) {
      toastStore.notify(error.message, NotificationType.Error);
    }
  }
  toggleConfirmModal('DELETE');
}
function toggleConfirmModal(modal: string) {
  isModalOpen.value[modal] = !isModalOpen.value[modal];
}
</script>
