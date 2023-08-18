<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="max-w-md w-full p-6 space-y-6 bg-white rounded-lg shadow-md">
      <h2 class="text-3xl font-semibold text-black font-poppins text-center">Login</h2>
      <form @submit.prevent="onLoginClick">
        <div class="space-y-4">
          <div>
            <label for="email" class="block text-black font-medium">Username/ Email</label>
            <input id="email" v-model="form.data.email" type="text" class="input input-bordered w-full" required />
          </div>
          <div class="intro-x relative w-full">
            <label for="password" class="text-black font-medium">Password</label>
            <div class="absolute inset-y-0 right-0 top-6 flex items-center px-2">
              <input id="toggle" type="checkbox" class="hidden js-password-toggle" @click="togglePasswordVisibility" />
              <label
                class="bg-neutral hover:bg-white rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label"
                for="toggle"
              >
                <Icon :name="eyeIcon" class="h-5 w-5 text-gray-400" />
              </label>
            </div>
            <input
              id="password"
              v-model="form.data.password"
              class="input input-bordered w-full pr-16 js-password"
              :type="passwordFieldType"
              autocomplete="off"
            />
          </div>
          <div class="mt-4 flex items-center">
            <input
              id="remember-me"
              v-model="form.data.rememberMe"
              type="checkbox"
              class="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-black text-sm"> Ingat Saya </label>
          </div>
        </div>
        <div class="mt-12">
          <button v-if="form.pending" type="button" class="cursor-progress btn-circle btn mr-2 text-accent w-full">
            <span class="loading loading-spinner"></span>
            Loading. . .
          </button>
          <button v-else type="submit" class="btn-circle btn text-accent w-full">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["success"]);

const { login } = useAuth();

const form = reactive({
  data: {
    email: "",
    password: "",
    rememberMe: false,
  },
  error: "",
  pending: false,
});

useHead({
  title: "Login | Daftar Pegawai",
});

const passwordVisible = ref(false);

const passwordFieldType = computed(() => (passwordVisible.value ? "text" : "password"));

const eyeIcon = computed(() => (passwordVisible.value ? "uil:eye-slash" : "uil:eye"));

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

async function onLoginClick() {
  try {
    form.error = "";
    form.pending = true;
    await login(form.data.email, form.data.password, form.data.rememberMe);

    emit("success");
  } catch (error) {
    console.error(error);
    if (error.data.message) form.error = error.data.message;
    return createError({
      statusCode: 500,
      message: `${error}`,
    });
  } finally {
    form.pending = false;
  }
}
</script>
