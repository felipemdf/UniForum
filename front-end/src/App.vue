<template>
  <Navbar />
  <div class="container">
    <router-view />
  </div>
</template>

<script setup>
  import Navbar from './components/Navbar.vue';
</script>

<style>
  @import './assets/css/global.css';

  * {
    background-color: var(--color-background);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  #app {
    /* font-family: Avenir, Helvetica, Arial, sans-serif; */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
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
