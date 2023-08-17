<template>
  <div>
    <EmployeeForm :editing="false" @addUser="addUser" />
  </div>
</template>

<script setup>
const Users = useUserStore();
useHead({
  title: "Add User | Daftar Pegawai",
});

const addUser = async (formData) => {
  let data = await Users.saveItem({ id_user: null, isEdit: false, ...formData });
  if (data) {
    navigateTo("/");
  }
};
</script>
