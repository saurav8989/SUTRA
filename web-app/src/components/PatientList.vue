<template>
  <div class="patient-list">
    <div class="header-actions">
      <h3>Patient Records</h3>
      <div class="search-box">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search by name or contact..."
          @input="handleSearch"
        />
      </div>
    </div>

    <div v-if="loading" class="loading">Loading patients...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="table-container">
      <table class="patients-table">
        <thead>
          <tr>
            <th>Unique ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="patient in filteredPatients" :key="patient._id">
            <td><code>{{ patient.uniqueId }}</code></td>
            <td>{{ patient.name }}</td>
            <td>{{ patient.age }}</td>
            <td>{{ patient.gender }}</td>
            <td>{{ patient.contact || 'N/A' }}</td>
            <td>{{ patient.address || 'N/A' }}</td>
            <td>
              <button class="btn-small" @click="$emit('view-card', patient)">View Card</button>
            </td>
          </tr>
          <tr v-if="filteredPatients.length === 0">
            <td colspan="7" class="text-center">No patients found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      patients: [],
      searchQuery: '',
      loading: false,
      error: ''
    };
  },
  computed: {
    filteredPatients() {
      if (!this.searchQuery) return this.patients;
      const query = this.searchQuery.toLowerCase();
      return this.patients.filter(p => 
        p.name.toLowerCase().includes(query) || 
        (p.contact && p.contact.includes(query)) ||
        (p.address && p.address.toLowerCase().includes(query)) ||
        p.uniqueId.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    async fetchPatients() {
      this.loading = true;
      this.error = '';
      try {
        const { data } = await api.get('/patients');
        this.patients = data;
      } catch (err) {
        this.error = 'Failed to load patient records.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    handleSearch() {
      // Logic for search debouncing could be added here if needed
    }
  },
  mounted() {
    this.fetchPatients();
  }
};
</script>

<style scoped>
.patient-list {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.search-box input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 250px;
}
.table-container {
  overflow-x: auto;
  border: 1px solid #eee;
  border-radius: 4px;
}
.patients-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px; /* Ensure table doesn't get too squashed */
}
.patients-table th, .patients-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}
.patients-table th {
  background: #f8f9fa;
  font-weight: 600;
}
.btn-small {
  padding: 4px 8px;
  font-size: 12px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn-small:hover {
  background: #2980b9;
}
.text-center { text-align: center; color: #777; padding: 20px; }
.loading, .error { padding: 20px; text-align: center; }
.error { color: #d32f2f; }
</style>
