import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import RegisterPatient from '../views/RegisterPatient.vue'
import IDCard from '../views/IDCard.vue'

const routes = [
    { path: '/', component: Login },
    { path: '/dashboard', component: Dashboard },
    { path: '/register', component: RegisterPatient },
    { path: '/id-card/:id', component: IDCard, props: true },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
