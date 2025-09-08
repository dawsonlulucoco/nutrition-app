import { createRouter, createWebHistory } from 'vue-router'

import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Dashboard from './views/Dashboard.vue'
import Subscribe from './views/Subscribe.vue'
import AdminPanel from './views/AdminPanel.vue'   

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/subscribe', component: Subscribe, meta: { requiresAuth: true } },
  { path: '/admin', component: AdminPanel, meta: { requiresAuth: true, role: 'admin' } } 
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')

  if (to.meta?.requiresAuth && !currentUser) {
    return next('/login')
  }
  if (to.meta?.role && currentUser?.role !== to.meta.role) {
    return next('/dashboard') 
  }
  next()
})

export default router
