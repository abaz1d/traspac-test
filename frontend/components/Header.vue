<script setup lang="ts">
const currentUser = useAuthUser();
const themeStore = useThemeStore();
const { logout } = useAuth();

const form = reactive({
  pending: false,
});

const { isScrolled } = useScroll();

const logOutClick = async () => {
  try {
    form.pending = true;

    logout();

    navigateTo("/login");
  } catch (error) {
    console.error(error);
  } finally {
    form.pending = false;
  }
};
</script>

<template>
  <header class="navbar mb-2 bg-neutral shadow-lg z-[999]" :class="{ 'fixed top-0 left-0': isScrolled }">
    <div class="navbar-start">
      <NuxtLink v-if="$route.fullPath !== '/' && $route.fullPath !== '/login'" to="/" class="btn btn-square btn-ghost"
        ><Icon name="uil:arrow-left" class="h-2/3 w-2/3"
      /></NuxtLink>
      <button v-else aria-label="theme-button" class="btn-ghost btn-circle btn" @click="themeStore.toggle">
        <Icon name="uil:sun" class="h-1/2 w-1/2" />
      </button>
    </div>
    <div class="navbar-center">
      <a class="btn-ghost btn font-poppins text-md sm:text-xl tracking-[1px] uppercase font-bold"
        >{{ $route.fullPath !== "/login" ? `${$route.fullPath !== "/" ? "HOME" + $route.fullPath : "HOME"}` : "" }}
      </a>
    </div>
    <div class="navbar-end">
      <div v-if="$route.path !== '/login'" class="flex items-center dropdown dropdown-bottom dropdown-end">
        <label tabindex="0" class="btn-ghost btn-circle btn">
          <Icon name="uil:bars" class="w-6 h-6" />
        </label>
        <ul
          tabindex="0"
          class="menu-compact dropdown-content menu rounded-box mt-3 w-52 bg-base-100 p-2 shadow z-[999]"
        >
          <li>
            <NuxtLink to="/" class="n-link-base font-poppins">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about" class="n-link-base font-poppins">About</NuxtLink>
          </li>
          <li v-if="currentUser">
            <button class="btn btn-error btn-sm" onclick="log_out_modal.showModal()">Log Out</button>
          </li>
        </ul>
      </div>
      <Icon v-else name="uil:padlock" class="w-6 h-6" />

      <dialog id="log_out_modal" class="modal modal-top sm:modal-middle">
        <form method="dialog" class="modal-box">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" for="log_out_modal">✕</button>
          <h3 class="font-bold text-lg">Konfirmasi</h3>
          <p class="py-4">Apakah Anda yakin ingin keluar?</p>
          <div class="modal-action">
            <button class="btn">Batal</button>
            <button v-if="form.pending" class="btn btn-error">
              <span class="loading loading-spinner"></span> Loading. . .
            </button>
            <button v-else class="btn btn-error" for="log_out_modal" @click="logOutClick">Ya, Keluar</button>
          </div>
        </form>
      </dialog>
    </div>
  </header>
</template>
