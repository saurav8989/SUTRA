<template>
  <div class="register-container">
    <h2>Register Patient</h2>
    <form @submit.prevent="register">
      <input v-model="form.name" placeholder="Full Name" required />
      <input v-model="form.age" type="number" placeholder="Age" required />
      <select v-model="form.gender" required>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <input v-model="form.contact" placeholder="Contact Number" required />
      <textarea v-model="form.address" placeholder="Address"></textarea>
      <button type="submit">Generate ID Card</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const form = ref({
  name: '',
  age: '',
  gender: '',
  contact: '',
  address: '',
  medicalHistory: []
})

const router = useRouter()

const register = async () => {
  try {
    const res = await axios.post('http://localhost:5001/api/patients', form.value)
    router.push(`/id-card/${res.data.uniqueId}`)
  } catch (err) {
    alert('Error registering patient')
  }
}
</script>

<style scoped>
.register-container {
  max-width: 500px;
  margin: 50px auto;
}
input, select, textarea {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
