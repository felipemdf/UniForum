<template>
  <div class="flex items-center justify-center w-full min-h-screen text-c-gray-500">
    <div class="relative">
      <!-- Background SVG-->
      <div class="absolute hidden w-56 h-56 text-c-blue-500 sm:block a-z-10 -left-24 -top-24">
        <svg id="patternId" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="a"
              patternUnits="userSpaceOnUse"
              width="40"
              height="40"
              patternTransform="scale(0.6) rotate(0)"
            >
              <rect x="0" y="0" width="100%" height="100%" fill="none" />
              <path
                d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5"
                stroke-width="1"
                stroke="none"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect width="800%" height="800%" transform="translate(0,0)" fill="url(#a)" />
        </svg>
      </div>

      <!-- Background SVG-->
      <div
        class="absolute hidden text-c-blue-500 sm:block h-28 w-28 a-z-10 -right-16 -bottom-[3rem]"
      >
        <svg id="patternId" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="b"
              patternUnits="userSpaceOnUse"
              width="40"
              height="40"
              patternTransform="scale(0.5) rotate(0)"
            >
              <rect x="0" y="0" width="100%" height="100%" fill="none" />
              <path
                d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5"
                stroke-width="1"
                stroke="none"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect width="800%" height="800%" transform="translate(0,0)" fill="url(#b)" />
        </svg>
      </div>

      <!-- Login Card -->
      <div
        class="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4"
      >
        <div class="flex-auto p-6">
          <!-- Logo -->
          <div
            class="flex items-center justify-center flex-grow-0 flex-shrink-0 mb-8 overflow-hidden"
          >
            <router-link
              to="/home"
              href="#"
              class="flex items-center gap-2 no-underline cursor-pointer text-c-blue-600"
            >
              <span class="flex-shrink-0 text-3xl font-black tracking-tight">UniForum</span>
            </router-link>
          </div>

          <!--Presentation -->
          <h4 class="mb-2 text-lg font-medium xl:text-xl text-c-gray-800">
            Bem vindo ao UniForum!
          </h4>
          <p class="mb-6 text-sm text-c-gray-500">Por favor, faça o login para acessar sua conta</p>
          <!-- Gambiarra -->
          <div class="w-[302.91px] min-w-0"></div>

          <form @submit.prevent="onsubmit" class="mb-4" action="#" method="POST">
            <div class="mb-4">
              <label
                for="email"
                class="inline-block mb-2 text-xs font-medium uppercase text-c-gray-800"
                >Email</label
              >
              <input
                type="email"
                id="email"
                name="email"
                class="block w-full py-2.5 px-3 text-sm bg-white border border-gray-400 rounded-md outline-none text-c-gray-800 focus:border-c-blue-500 focus:ring-c-blue-500 focus:shadow"
                v-model="formData.email"
                placeholder="Insira seu email"
                required
              />
            </div>
            <div class="mb-4">
              <div class="flex justify-between">
                <label
                  for="password"
                  class="inline-block mb-2 text-xs font-medium uppercase text-c-gray-800"
                  >Senha</label
                >

                <!-- <a
                  href="auth-forgot-password-basic.html"
                  class="text-indigo-500 no-underline cursor-pointer hover:text-indigo-500"
                >
                  <small class="">Forgot Password?</small>
                </a> -->
              </div>
              <div class="relative flex flex-wrap items-stretch w-full">
                <input
                  type="password"
                  id="password"
                  class="block w-full py-2.5 px-3 text-sm bg-white border border-gray-400 rounded-md outline-none text-c-gray-800 focus:border-c-blue-500 focus:ring-c-blue-500 focus:shadow"
                  name="password"
                  v-model="formData.password"
                  placeholder="············"
                  required
                />
              </div>
            </div>

            <div class="mb-4">
              <button
                type="submit"
                class="grid w-full px-4 py-2 text-sm font-medium text-center text-white align-middle border rounded-md shadow cursor-pointer select-none focus:text-white focus:shadow-none bg-c-blue-600 hover:bg-c-blue-700"
              >
                Entrar
              </button>
            </div>
          </form>

          <p class="mb-4 text-center">
            Não possui uma conta?
            <router-link to="/signup" href="#" class="no-underline cursor-pointer text-c-blue-500">
              Inscreva-se
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

// Stores
const authStore = useAuthStore();
const toastStore = useToastStore();
const router = useRouter();

const formData = ref({
  email: '',
  password: ''
});

async function onsubmit() {
  try {
    await authStore.signIn(formData.value.email, formData.value.password);
    router.push('/home');
  } catch (error: any) {
    await authStore.signOut();
    toastStore.notify(error.message, NotificationType.Error);

    formData.value = { email: '', password: '' };
  }
}
</script>
