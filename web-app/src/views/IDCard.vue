<template>
  <div class="card-page">
    <div v-if="loading">Loading...</div>
    <div v-else-if="patient" class="id-card" id="printable-area">
      <div class="header">
        <h3>SUTRA HEALTH CARD</h3>
      </div>
      <div class="content">
        <div class="info">
          <p><strong>Name:</strong> {{ patient.name }}</p>
          <p><strong>ID:</strong> {{ patient.uniqueId }}</p>
          <p><strong>Age/Gender:</strong> {{ patient.age }} / {{ patient.gender }}</p>
          <p><strong>Contact:</strong> {{ patient.contact }}</p>
        </div>
        <div class="qr-code">
          <qrcode-vue :value="patient.qrData" :size="100" level="H" />
        </div>
      </div>
    </div>
    <button @click="printCard" class="print-btn">Print ID Card</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import QrcodeVue from 'qrcode.vue'

const props = defineProps(['id'])
const patient = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    // Note: The API route is GET /api/patients/:id
    const res = await axios.get(`http://localhost:5001/api/patients/${props.id}`)
    patient.value = res.data
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
})

const printCard = () => {
  window.print()
}
</script>

<style scoped>
.card-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}
.id-card {
  width: 350px;
  border: 2px solid #000;
  padding: 20px;
  border-radius: 10px;
  background: white;
}
.header {
  text-align: center;
  border-bottom: 2px solid #000;
  margin-bottom: 15px;
}
.content {
  display: flex;
  justify-content: space-between;
}
.qr-code {
  margin-left: 10px;
}
.print-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #333;
  color: white;
  cursor: pointer;
}

@media print {
  body * {
    visibility: hidden;
  }
  #printable-area, #printable-area * {
    visibility: visible;
  }
  #printable-area {
    position: absolute;
    left: 0;
    top: 0;
  }
  .print-btn {
    display: none;
  }
}
</style>
