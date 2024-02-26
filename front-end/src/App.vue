<template>
  <Navbar />
  <div class="container mx-auto px-4 md:px-6 py-6">
    <router-view />
  </div>
</template>

<script setup>
  import Navbar from './components/Navbar.vue';
</script>

<style>
  html {
    background-color: #f8f9fb;
  }

  #app {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  nav {
    padding: 30px;
  }

  nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  nav a.router-link-exact-active {
    color: #42b983;
  }
</style>
