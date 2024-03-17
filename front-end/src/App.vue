<template>
  <Navbar v-if="showNavbar" />
  <div class="container px-3 mx-auto md:px-16">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router';

import Navbar from './components/Navbar.vue';
import { computed } from 'vue';

const router = useRouter();

const showNavbar = computed(() => {
  const routerName = router.currentRoute.value.name;
  return !(routerName === 'signIn' || routerName === 'signUp');
});
</script>

<style>
html {
  background-color: #f8f9fb;
}
</style>
