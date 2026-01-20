<template>
  <div class="id-card" v-if="patient">
    <div class="d-flex">
      <!-- QR Code Section -->
      <div class="qr-section">
        <qrcode-vue :value="patient.uniqueId" :size="100" level="H" />
      </div>
      
      <!-- Details Section -->
      <div class="details-section">
        <h3>SUTRA Health ID</h3>
        <p><strong>Name:</strong> {{ patient.name }}</p>
        <p><strong>Age:</strong> {{ patient.age }} | <strong>Gender:</strong> {{ patient.gender }}</p>
        <p v-if="patient.address"><strong>Address:</strong> {{ patient.address }}</p>
        <p><strong>ID:</strong> {{ patient.uniqueId }}</p>
        <p class="footer">Emergency Info Scan</p>
      </div>
    </div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue';

export default {
  components: {
    QrcodeVue,
  },
  props: {
    patient: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.id-card {
  border: 2px solid #000;
  padding: 10px;
  width: 350px; /* Approximate A6 width scaling */
  background: white;
  margin-top: 20px;
}
.d-flex {
  display: flex;
  align-items: center;
}
.qr-section {
  margin-right: 15px;
}
.details-section h3 {
  margin: 0 0 5px 0;
  font-size: 16px;
}
.details-section p {
  margin: 2px 0;
  font-size: 12px;
}
.footer {
  font-size: 10px;
  color: #555;
  margin-top: 5px;
}
</style>
