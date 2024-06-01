<template>
  <!-- Title -->
  <div class="pt-4">
    <h1 class="py-2 text-2xl font-medium">Personalizar perfil</h1>
  </div>

  <form method="POST" @submit.prevent="onSubmit">
    <!-- Email -->
    <hr class="mt-4 mb-8" />
    <div class="col-span-full">
      <p class="font-semibold">Nome de exibição <span class="text-red-600">*</span></p>
      <p class="mb-2 text-sm text-gray-600 sm:pb-1">Defina um nome de exibição</p>

      <input
        type="text"
        id="search"
        class="block w-full py-2.5 p-2 pl-5 text-sm text-c-gray-800 border bg-white border-c-gray-300 rounded-md outline-none md:bg-c-gray-50 focus:border-c-blue-500 focus:ring-c-blue-500"
        placeholder="Nome de exibição"
        required
        v-model="form.username"
      />
    </div>

    <hr class="mt-4 mb-8" />
    <div class="grid gap-5 sm:grid-cols-8">
      <!-- Course -->
      <div class="sm:col-span-4">
        <p class="font-semibold">Curso <span class="text-red-600">*</span></p>
        <p class="mb-2 text-sm text-gray-600 sm:pb-1">Especifique o seu curso</p>

        <SelectButton
          default-label="Selecione um curso"
          :data="coursesFilterManager.itens"
          :is-scroll="true"
        />
      </div>

      <!-- Período -->
      <div class="sm:col-span-4">
        <p class="font-semibold">Período <span class="text-red-600">*</span></p>
        <p class="mb-2 text-sm text-gray-600 sm:pb-1">Especifique o período do seu curso</p>

        <div class="relative">
          <input
            type="text"
            id="price"
            name="price"
            class="block w-full py-3 pl-4 text-sm border border-gray-200 rounded-md shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 md:bg-c-gray-50"
            v-model="form.period"
            placeholder="Digite o período"
          />
          <div class="absolute inset-y-0 right-0 z-10 flex items-center pr-4 pointer-events-none">
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
        <img src="../../../../../../public/userIcon.png" class="w-16 h-16 rounded-full" />
        <p class="text-sm text-gray-600">
          Solte o arquivo de imagem desejado aqui para iniciar o upload
        </p>

        <input
          type="file"
          class="max-w-full px-2 font-medium text-blue-600 rounded-lg outline-none ring-blue-600 focus:ring-1"
          accept="image/*"
          v-on:change="onChangePhoto"
        />
      </div>
    </div>

    <div class="flex justify-end gap-4 mb-8">
      <button
        class="px-4 py-2 font-medium text-white rounded-md bg-c-blue-600 whitespace-nowrap"
        type="submit"
      >
        Salvar
      </button>
      <button
        class="px-4 py-2 font-medium bg-gray-200 rounded-md whitespace-nowrap"
        @click.prevent="$router.push('/home')"
      >
        Cancelar
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
// Stores
const authStore = useAuthStore();
const toastStore = useToastStore();

// Refs
const defautCourse = getCourseValue(authStore.user.course);
const coursesFilterManager = ref(new SelectManager(COURSE_LABELS, defautCourse));

const form = ref({
  username: authStore.user.username,
  period: authStore.user.period,
  photo: ''
});

async function onChangePhoto(event: any) {
  console.log(event.target.files[0].size)
  var files = event.target.files || event.dataTransfer.files;
  form.value.photo = (await toBase64(files[0])) as string;
}

const toBase64 = (file: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = reject;
  });

async function onSubmit() {
  try {
    if (!form.value.username || form.value.username.trim().length === 0) {
      throw new Error('Username não definido!');
    }

    if (coursesFilterManager.value.getSelectedItem() == -1) {
      throw new Error('Curso não definido!');
    }

    if (!form.value.period) {
      throw new Error('Período não definido!');
    }

    await authStore.updateProfile(
      form.value.username,
      form.value.period,
      form.value.photo,
      coursesFilterManager.value.getSelectedItem()
    );
    toastStore.notify('Perfil atualizado com sucesso', NotificationType.Success);
  } catch (error: any) {
    toastStore.notify(error.message, NotificationType.Error);
  }
}
</script>
