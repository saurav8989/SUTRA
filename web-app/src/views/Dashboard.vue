<template>
  <div class="dashboard">
    <header class="header">
      <h1>SUTRA Admin</h1>
      <button @click="logout" class="logout-btn">Logout</button>
    </header>
    
    <nav class="tabs">
      <button :class="{ active: activeTab === 'register' }" @click="activeTab = 'register'">Register Patient</button>
      <button :class="{ active: activeTab === 'list' }" @click="activeTab = 'list'">Patient Records</button>
    </nav>
    
    <div class="content">
      <div class="left-panel">
        <PatientRegisterForm v-if="activeTab === 'register'" @patient-registered="onPatientRegistered" />
        <PatientList v-if="activeTab === 'list'" @view-card="onViewCard" />
      </div>
      
      <div class="right-panel">
        <div v-if="viewingPatient" class="success-area">
          <h3 v-if="activeTab === 'register'">Registration Successful!</h3>
          <h3 v-else>Patient Record</h3>
          <p v-if="activeTab === 'register'">Please print the ID card below.</p>
          <DigitalIDCard :patient="viewingPatient" />
          <button @click="printID" class="print-btn">Print ID Card</button>
          <button v-if="activeTab === 'list'" @click="viewingPatient = null" class="btn-secondary">Close</button>
        </div>
        <div v-else class="placeholder">
          <p v-if="activeTab === 'register'">Register a patient to generate their Digital Health ID.</p>
          <p v-else>Select a patient from the list to view or reprint their ID card.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PatientRegisterForm from '../components/PatientRegisterForm.vue';
import PatientList from '../components/PatientList.vue';
import DigitalIDCard from '../components/DigitalIDCard.vue';

export default {
  components: {
    PatientRegisterForm,
    PatientList,
    DigitalIDCard
  },
  data() {
    return {
      activeTab: 'register',
      viewingPatient: null
    };
  },
  methods: {
    onPatientRegistered(patient) {
      this.viewingPatient = patient;
    },
    onViewCard(patient) {
      this.viewingPatient = patient;
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
    printID() {
      window.print();
    }
  }
};
</script>

<style scoped>
.dashboard { padding: 20px; }
.header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ccc; padding-bottom: 10px; margin-bottom: 20px; }
.content { 
  display: flex; 
  gap: 20px; 
  align-items: flex-start;
}
.left-panel {
  flex: 3; /* Give more space to the list */
  min-width: 0; /* Allow flex item to shrink below content size */
}
.right-panel {
  flex: 2; /* Give slightly less space to the card view */
  min-width: 380px;
  position: sticky;
  top: 20px;
}
.tabs { margin-bottom: 20px; display: flex; gap: 10px; }
.tabs button { padding: 10px 20px; border: 1px solid #ddd; background: #f8f9fa; cursor: pointer; border-radius: 4px; }
.tabs button.active { background: #2c3e50; color: white; border-color: #2c3e50; }
.placeholder { 
  text-align: center; 
  color: #777; 
  margin-top: 50px;
  padding: 40px;
  border: 2px dashed #eee;
  border-radius: 8px;
}
.logout-btn { background: #e74c3c; color: white; border: none; padding: 5px 15px; border-radius: 4px; cursor: pointer; }
.print-btn { margin-top: 20px; background: #27ae60; color: white; padding: 10px 20px; border: none; cursor: pointer; font-size: 16px; border-radius: 4px; margin-right: 10px; }
.btn-secondary { margin-top: 20px; background: #95a5a6; color: white; padding: 10px 20px; border: none; cursor: pointer; font-size: 16px; border-radius: 4px; }

@media print {
  .header, .left-panel, .print-btn, .tabs, .btn-secondary { display: none; }
  .dashboard, .content, .right-panel, .success-area { padding: 0; margin: 0; display: block; }
  .success-area h3, .success-area p { display: none; }
}
</style>
