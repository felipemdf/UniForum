<template>
  <Toast />
  <component :is="$route.meta.layout || DefaultLayout">
    <router-view />
  </component>
</template>

<script setup lang="ts">
import DefaultLayout from './presentation/layouts/DefaultLayout.vue';
const router = useRouter();
</script>

<style>
html {
  background-color: #f8f9fb;
  overflow-y: scroll;
}
</style>
