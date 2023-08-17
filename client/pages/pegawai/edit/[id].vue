<template>
  <div>
    <div>
      <EmployeeForm v-if="pegawaiData" :data="pegawaiData" :editing="editing" @updatePegawai="updatePegawai" />

      <div
        v-else
        wire:loading
        class="fixed top-0 left-0 right-0 bottom-0 w-full h-[50vw] z-50 overflow-hidden bg-transparent flex flex-col items-center justify-center"
      >
        <span class="loading loading-dots loading-lg"></span>
      </div>
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
  let data = await Pegawai.saveItem({ id_pegawai: route.params?.id, ...formData });
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
    const response = await Pegawai.readDetailItem(id);
    for (const tableName of tableNames) {
      await Pegawai.getReferences(tableName);
    }

    pegawaiData.value = response;
  }
});
</script>
