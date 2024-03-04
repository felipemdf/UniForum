<template>
  <Navbar />
  <div class="container px-3 mx-auto md:px-16"><RouterView /></div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';

import Navbar from './components/Navbar.vue';
</script>

<style>
html {
  background-color: #f8f9fb;
}
</style>
