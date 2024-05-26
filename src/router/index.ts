import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '../components/HomeView.vue'
import UsersView from '../components/UsersView.vue'

const routes = [
    { path: '/users', component: UsersView },
  { path: '/', component: HomeView },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router;
