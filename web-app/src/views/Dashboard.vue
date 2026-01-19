<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <router-link to="/register" class="btn">Register New Patient</router-link>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 20px;
  text-align: center;
}
.btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}
</style>
