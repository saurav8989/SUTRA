<template>
  <div class="register-form">
    <div v-if="notification" :class="['notification', notification.type]">
      {{ notification.message }}
    </div>
    <h3>Register New Patient</h3>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label>Full Name</label>
        <input v-model="form.name" type="text" required />
      </div>
      <div class="form-group row">
        <div class="col">
          <label>Age</label>
          <input v-model.number="form.age" type="number" required />
        </div>
        <div class="col">
          <label>Gender</label>
          <select v-model="form.gender" required>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label>Contact Number (Optional)</label>
        <input v-model="form.contact" type="text" />
      </div>
      <div class="form-group">
        <label>Address (Optional)</label>
        <textarea v-model="form.address" rows="2"></textarea>
      </div>
      
      <button type="submit" :disabled="loading">
        {{ loading ? 'Registering...' : 'Register Patient' }}
      </button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      form: {
        name: '',
        age: '',
        gender: '',
        contact: '',
        address: ''
      },
      loading: false,
      error: '',
      notification: null
    };
  },
  methods: {
    async submitForm() {
      this.loading = true;
      this.error = '';
      try {
        const response = await api.post('/patients', this.form);
        
        if (response.data.isExisting) {
          this.notification = {
            type: 'info',
            message: 'Existing patient profile found. Information recovered.'
          };
        } else {
          this.notification = {
            type: 'success',
            message: 'New patient registered successfully!'
          };
        }

        this.$emit('patient-registered', response.data);
        this.resetForm();
      } catch (err) {
        this.error = err.response?.data?.message || 'Registration failed';
      } finally {
        this.loading = false;
        // Clear notification after 5 seconds
        if (this.notification) {
          setTimeout(() => {
            this.notification = null;
          }, 5000);
        }
      }
    },
    resetForm() {
      this.form = { name: '', age: '', gender: '', contact: '', address: '' };
    }
  }
};
</script>

<style scoped>
.register-form {
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #f9f9f9;
}
.form-group { margin-bottom: 15px; }
.row { display: flex; gap: 10px; }
.col { flex: 1; }
input, select, textarea { width: 100%; padding: 8px; font-family: inherit; }
textarea { resize: vertical; }
button { width: 100%; padding: 10px; background: #2c3e50; color: white; border: none; border-radius: 4px; cursor: pointer; }
.error { color: red; font-size: 14px; margin-bottom: 10px; }
.notification {
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 500;
}
.notification.success {
  background: #e8f5e9;
  color: #2e7d32;
  border: 1px solid #c8e6c9;
}
.notification.info {
  background: #e3f2fd;
  color: #1976d2;
  border: 1px solid #bbdefb;
}
</style>
