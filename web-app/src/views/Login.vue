<template>
  <div class="login-container">
    <h2>SUTRA Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="email" required />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input v-model="password" type="password" required />
      </div>
      <button type="submit">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await api.post('/auth/login', {
          email: this.email,
          password: this.password
        });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        this.$router.push('/dashboard');
      } catch (err) {
        this.error = err.response?.data?.message || 'Login failed';
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 300px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
}
.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
.error {
  color: red;
}
</style>
