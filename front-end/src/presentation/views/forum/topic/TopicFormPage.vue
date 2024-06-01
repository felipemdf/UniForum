<template>
  <!-- Title -->
  <div class="pb-6 border-b mt-14 mb-9 border-x-c-gray-100">
    <h2 class="text-xl leading-7 text-c-gray-800 md:text-xl">Criar um novo tópico</h2>
    <p class="mt-1 text-sm leading-6 text-c-gray-500">
      Compartilhe suas ideias publicando um tópico!
    </p>
  </div>

  <!-- Form -->
  <form
    @submit.prevent="onsubmit"
    class="mt-4 mb-8 rounded-lg md:shadow md:border-c-gray-100 md:bg-white md:p-8"
  >
    <div class="grid grid-cols-1 pb-7 gap-x-6 gap-y-6 sm:grid-cols-6">
      <!-- Title -->
      <div class="col-span-full">
        <div>
          <input
            type="text"
            id="search"
            class="block w-full py-2.5 p-2 pl-5 text-sm text-c-gray-800 border bg-white border-c-gray-300 rounded-md outline-none md:bg-c-gray-50 focus:border-c-blue-500 focus:ring-c-blue-500"
            placeholder="Título"
            v-model="formData.title"
            required
          />
        </div>
      </div>

      <!-- Course -->
      <div class="sm:col-span-3">
        <SelectButton
          default-label="Selecione um curso"
          :data="coursesFilterManager.itens"
          class="w-full"
          :is-full-width="true"
          :is-scroll="true"
        />
      </div>

      <!-- Tags -->
      <div class="sm:col-span-3">
        <SelectButton
          default-label="Selecione uma tag"
          :data="tagsFilterManager.itens"
          class="w-full"
          :is-full-width="true"
          :is-scroll="true"
        />
      </div>

      <!-- Description -->
      <div class="col-span-full">
        <div class="mt-2">
          <textarea
            required
            id="about"
            name="about"
            rows="6"
            placeholder="Texto"
            class="block w-full py-2 pl-4 text-sm bg-white border-gray-300 rounded-md shadow-sm outline-none resize-none text-c-gray-800 focus:border-c-blue-500 focus:ring-c-blue-500 sm:leading-6 md:bg-gray-50"
            v-model="formData.content"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- Buttons -->
    <div class="flex items-center justify-between md:justify-end">
      <router-link
        to="/"
        class="px-4 py-3 mr-4 text-sm font-medium rounded-lg outline-none md:mr-6 text-c-gray-800 hover:bg-c-gray-100"
        >Cancelar</router-link
      >

      <button
        type="submit"
        class="px-4 py-3 text-sm font-medium text-white rounded-lg bg-c-blue-600 hover:bg-c-blue-700 focus:outline-none"
      >
        Publicar
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
// Refs
const coursesFilterManager = ref(new SelectManager(COURSE_LABELS)); 
const tagsFilterManager = ref(new SelectManager(TAG_LABELS));

// Stores
const topicStore = useTopicStore();
const toastStore = useToastStore();
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

// Type
let typeForm: 'CREATE' | 'UPDATE' = 'CREATE';

const formData = ref({
  title: '',
  content: ''
});

onMounted(async () => {
  typeForm = route.params.id ? 'UPDATE' : 'CREATE';
  if (typeForm === 'UPDATE') {
    await topicStore.fetchTopic(1);

    formData.value.title = topicStore.topic?.title || '';
    formData.value.content = topicStore.topic?.content || '';
    coursesFilterManager.value.select(topicStore.topic?.course || -1);
    tagsFilterManager.value.select(topicStore.topic?.tag || -1);
  }
});

onUnmounted(() => {
  topicStore.cleanTopic();
});

function validateSelect() {
  if (coursesFilterManager.value.getSelectedItem() === -1) {
    throw new Error('Curso não selecionado!');
  } else if (tagsFilterManager.value.getSelectedItem() === -1) {
    throw new Error('Tag não selecionada!');
  }
}

async function onsubmit() {
  try {
    validateSelect();

    let topicId!: number;

    if (typeForm === 'CREATE') topicId = await createTopic();
    else topicId = await updateTopic();

    router.push(`/topic/${topicId}`);
  } catch (error: any) {
    toastStore.notify(error.message, NotificationType.Error);
  }

  async function createTopic() {
    return await topicStore.createTopic(
      formData.value.title,
      coursesFilterManager.value.getSelectedItem(),
      tagsFilterManager.value.getSelectedItem(),
      formData.value.content,
      authStore.user.id
    );
  }

  async function updateTopic() {
    return await topicStore.updateTopic(
      formData.value.title,
      coursesFilterManager.value.getSelectedItem(),
      tagsFilterManager.value.getSelectedItem(),
      formData.value.content
    );
  }
}
</script>
