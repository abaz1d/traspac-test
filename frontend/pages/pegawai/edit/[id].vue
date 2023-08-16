<template>
  <div>
    <EmployeeForm :data="userData" :editing="editing" @updateUser="updateUser" />
  </div>
</template>

<script setup>
const route = useRoute();
const Users = useUserStore();
useHead({
  title: "Edit User | Daftar Pegawai",
});

const { data: userData } = useAsyncData("getOneUser", async () => {
  const id = route.params.id;
  if (id !== undefined) {
    const response = await Users.readDetailItem(id);
    return response;
  } else {
    return null;
  }
});

const editing = route.params.id !== undefined;

const updateUser = async (formData) => {
  let data = await Users.saveItem({ id_user: route.params?.id, isEdit: true, ...formData });
  if (data) {
    navigateTo("/");
  }
};
</script>
