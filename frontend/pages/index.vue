<template>
  <div>
    <MainTable />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["user-only"],
});
</script>
