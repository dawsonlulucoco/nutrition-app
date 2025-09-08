<template>
  <div class="container mt-5 text-center">
    <h1>Welcome to Dashboard</h1>
    <p v-if="currentUser" class="mt-3">
      You are logged in as: <strong>{{ currentUser.email }}</strong>
      (Role: <strong>{{ currentUser.role }}</strong>)
    </p>

    <div class="mt-4">
      <router-link
        v-if="currentUser?.role === 'admin'"
        to="/admin"
        class="btn btn-warning me-2"
      >
        Go to Admin Panel
      </router-link>
      <button class="btn btn-outline-secondary" @click="logout">Logout</button>
    </div>


    <div class="mt-5">
      <RatingCard aspect="Recipe Library" />
      <RatingCard aspect="Community Workshops" class="mt-4" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import RatingCard from '../components/RatingCard.vue'

const router = useRouter()
const currentUser = ref(null)

onMounted(() => {
  const u = JSON.parse(localStorage.getItem('currentUser') || 'null')
  if (!u) return router.push('/login')
  currentUser.value = u
})

function logout() {
  localStorage.removeItem('currentUser')
  router.push('/login')
}
</script>
