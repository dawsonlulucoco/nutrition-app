<template>
  <div class="container mt-5 text-center">
    <h1>Login</h1>

    <form @submit.prevent="handleLogin" class="mt-4">
      <div class="mb-3">
        <input v-model.trim="email" type="email" class="form-control" placeholder="Email" required />
        <div v-if="emailError" class="text-danger mt-1">{{ emailError }}</div>
      </div>

      <div class="mb-3">
        <input v-model.trim="password" type="password" class="form-control" placeholder="Password" required />
        <div v-if="passwordError" class="text-danger mt-1">{{ passwordError }}</div>
      </div>

      <button type="submit" class="btn btn-primary w-100">Login</button>
    </form>

    <p class="mt-3">
      Don't have an account?
      <router-link to="/register">Register</router-link>
    </p>

    <div v-if="errorMessage" class="text-danger mt-2">{{ errorMessage }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const emailError = ref('')
const passwordError = ref('')

function handleLogin() {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const e = email.value.toLowerCase()
  const p = password.value

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  emailError.value = emailRegex.test(e) ? '' : 'Invalid email format.'
  passwordError.value = p ? '' : 'Password cannot be empty.'

  if (emailError.value || passwordError.value) {
    errorMessage.value = 'Please fix the errors above.'
    return
  }

  const user = users.find(u => u.email === e && u.password === p)
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user))
    router.push('/dashboard')
  } else {
    errorMessage.value = 'Invalid email or password'
  }
}
</script>
