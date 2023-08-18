<template>
  <div>
    <p class="text-inter p-8 text-center">Tentang Pengguna.</p>
    <div>
      <div class="sm:col-span-2 sm:col-start-1 mb-5">
        <label for="userid" class="block text-sm font-medium leading-6 text-gray-900">Userid</label>
        <div class="mt-2">
          <input
            type="text"
            name="userid"
            id="userid"
            :value="currentUser.userid"
            class="mt-1 input bg-white text-black block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div class="sm:col-span-2 mb-5">
        <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
        <div class="mt-2">
          <input
            type="text"
            name="username"
            id="username"
            :value="currentUser.username"
            class="mt-1 input bg-white text-black block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div class="sm:col-span-2 mb-5">
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
        <div class="mt-2">
          <input
            type="email"
            name="email"
            id="email"
            :value="currentUser.email"
            class="mt-1 input bg-white text-black block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const currentUser = useAuthUser();
</script>
