<template>
  <div class="px-4 mx-2 my-10 bg-white border-gray-200 rounded shadow sm:px-8">
    <!-- User Info -->
    <div class="flex flex-col py-8 border-b gap-y-6 sm:flex-row sm:items-center sm:justify-between">
      <!-- User Info -->
      <div class="flex items-center">
        <img
          class="object-cover rounded-full h-14 w-14"
          :src="'data:image/png;base64,' + profileStore.user.photo"
          alt="Simon Lewis"
        />

        <div class="ml-4">
          <p class="text-xl font-bold text-gray-900">{{ profileStore.user.username }}</p>
          <p class="text-gray-600">
            {{ profileStore.user.period ? profileStore.user.period + 'º Período de' : '' }}
            {{ profileStore.user.course ? getCourseLabel(profileStore.user.course) : '' }}
          </p>
        </div>
      </div>
    </div>

    <!-- ESTATISTICAS -->
    <div class="flex justify-between py-8 mb-2 text-sm border-b sm:text-base">
      <div class="flex flex-col items-center">
        <p class="mb-1 text-xl font-extrabold text-slate-700">
          {{ profileStore.user.totalizers?.topics || 0 }}
        </p>
        <p class="text-sm font-medium text-slate-500">Tópicos</p>
      </div>

      <div class="flex flex-col items-center">
        <p class="mb-1 text-xl font-extrabold text-slate-700">
          {{ profileStore.user.totalizers?.likes || 0 }}
        </p>
        <p class="text-sm font-medium text-slate-500">Curtidas</p>
      </div>
      <div class="flex flex-col items-center">
        <p class="mb-1 text-xl font-extrabold text-slate-700">
          {{ profileStore.user.totalizers?.commentaries || 0 }}
        </p>
        <p class="text-sm font-medium text-slate-500">Comentarios</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Stores
const profileStore = useProfileStore();
const routeStore = useRoute();

onMounted(async () => {
  await profileStore.fetchProfile(parseInt(routeStore.params.id as string));
});
</script>
