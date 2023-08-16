<template>
  <div>
    <EmployeeForm :data="null" :editing="false" @addPegawai="addPegawai" />
  </div>
</template>

<script setup>
const Pegawai = usePegawaiStore();
useHead({
  title: "Add Pegawai | Daftar Pegawai",
});

const addPegawai = async (formData) => {
  let data = await Pegawai.saveItem({ id_pegawai: null, isEdit: false, ...formData });
  if (data) {
    navigateTo("/");
  }
};
onMounted(async () => {
  const tableNames = ["agama", "eselon", "golongan", "jabatan", "unit_kerja"];
  try {
    for (const tableName of tableNames) {
      await Pegawai.getReferences(tableName);
    }
  } catch (error) {
    console.error(error);
  }
});
</script>
