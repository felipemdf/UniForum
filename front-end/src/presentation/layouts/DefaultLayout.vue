<template>
  <!-- Main Navigation Container -->
  <header
    class="sticky top-0 z-20 w-full p-5 mb-12 bg-white shadow-md start-0 shadow-black/5 md:px-24"
  >
    <nav class="flex flex-wrap items-center justify-between w-full mx-auto">
      <!-- Logo -->
      <router-link to="/"><p class="text-2xl font-bold text-c-blue-600">UniForum</p></router-link>

      <!-- Menu Container -->
      <div class="flex items-center mx-4 md:mx-8">
        <!-- Disconnected Buttons -->
        <div v-if="!auth.isUserLoggedIn()" class="py-2">
          <router-link
            to="/signin"
            href="#"
            class="px-4 py-3 mr-4 text-sm font-medium rounded-lg outline-none md:mr-6 text-c-gray-800 hover:bg-c-gray-100"
            >Entrar</router-link
          >
          <router-link
            to="/signup"
            href="#"
            class="px-4 py-3 text-sm font-medium text-white rounded-lg bg-c-blue-600 hover:bg-c-blue-700 focus:outline-none"
            >Cadastrar</router-link
          >
        </div>

        <!-- Connected Avatar -->
        <div v-if="auth.isUserLoggedIn()" class="relative">
          <div class="inline-flex items-center justify-center align-middle">
            <button @click="toggleMenu" type="button" class="flex items-center gap-3 text-sm">
              <span class="sr-only">Open user menu</span>
              <img
                class="w-10 h-10 rounded-full"
                :src="
                  auth.getUserPhoto ? auth.getUserPhoto : '/userIcon.png'
                "
                alt="user photo"
              />

              <p class="text-base font-medium text-c-gray-800">{{ auth.user?.username }}</p>
            </button>
          </div>

          <!-- Dropdown menu -->
          <div
            v-on-click-outside="toggleMenu"
            v-if="isMenuOpen"
            class="absolute right-0 mt-2 bg-white rounded shadow w-36"
          >
            <ul class="py-1 text-sm">
              <li>
                <router-link
                  :to="'/profile/' + auth.user.id"
                  class="block px-4 py-2 hover:bg-c-gray-100"
                  @click="toggleMenu"
                  >Meu perfil</router-link
                >
              </li>

              <li>
                <router-link
                  to="/config"
                  class="block px-4 py-2 hover:bg-c-gray-100"
                  @click="toggleMenu"
                  >Configurações</router-link
                >
              </li>

              <li>
                <button @click="signOut" class="block px-4 py-2 text-c-red-600 hover:bg-c-gray-100">
                  Sair
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>

  <div class="container px-4 mx-auto md:px-0">
    <slot />
  </div>
</template>

<script setup lang="ts">
// Stores
const auth = useAuthStore();
const router = useRouter();

// Refs
let isMenuOpen: Ref<Boolean> = ref(false);

function toggleMenu(): void {
  if (auth.isUserLoggedIn()) {
    isMenuOpen.value = !isMenuOpen.value;
  } else {
    isMenuOpen.value = false;
  }
}

async function signOut() {
  await auth.signOut();
  router.push('/home');
}
</script>
