<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentUser = ref(null)

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('currentUser'))
  if (!user) {
    router.push('/login')
  } else {
    currentUser.value = user
  }
})
</script>

<template>
  <div class="container mt-4">
    <h2>Welcome to Dashboard</h2>
    <p v-if="currentUser">You are logged in as: <strong>{{ currentUser.email }}</strong> (Role: {{ currentUser.role }})</p>
  </div>
</template>
