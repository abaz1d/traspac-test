<template>
  <div>
    <div>
      <EmployeeForm v-if="pegawaiData" :data="pegawaiData" :editing="editing" @updatePegawai="updatePegawai" />
      <div v-else>Loading...</div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const Pegawai = usePegawaiStore();
useHead({
  title: "Edit Pegawai | Daftar Pegawai",
});

const editing = route.params.id !== undefined;

const updatePegawai = async (formData) => {
  let data = await Pegawai.saveItem({ id_pegawai: route.params?.id, isEdit: true, ...formData });
  if (data) {
    navigateTo("/");
  }
};

import { onMounted, ref } from "vue";
const pegawaiData = ref(null);

onMounted(async () => {
  const tableNames = ["agama", "eselon", "golongan", "jabatan", "unit_kerja"];
  const id = route.params.id;
  if (id !== undefined) {
    // Panggil fungsi readDetailItem dan tunggu hasilnya
    const response = await Pegawai.readDetailItem(id);
    //console.log("res", response);

    for (const tableName of tableNames) {
      await Pegawai.getReferences(tableName);
    }

    pegawaiData.value = response;
  }
});
</script>
