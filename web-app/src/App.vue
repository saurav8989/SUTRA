<template>
  <div>
    <h1>SUTRA Web App (Vue)</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const message = ref("Loading...");

onMounted(async () => {
  try {
    const res = await fetch("http://localhost:5000");
    message.value = await res.text();
  } catch (err) {
    message.value = "Error connecting to backend";
  }
});
</script>