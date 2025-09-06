<template>
  <div class="container mt-5 text-center">
    <h1>Register</h1>

    <form @submit.prevent="handleRegister" class="mt-4">
      <div class="mb-3">
        <input v-model.trim="email" type="email" class="form-control" placeholder="Email" required />
        <div v-if="emailError" class="text-danger mt-1">{{ emailError }}</div>
      </div>
      <div class="mb-3">
        <input v-model.trim="password" type="password" class="form-control" placeholder="Password" required />
        <div v-if="passwordError" class="text-danger mt-1">{{ passwordError }}</div>
      </div>
      <div class="mb-3">
        <select v-model="role" class="form-select" required>
          <option disabled value="">Select a role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button type="submit" class="btn btn-success w-100">Register</button>
    </form>

    <p class="mt-3">
      Already have an account?
      <router-link to="/login">Back to Login</router-link>
    </p>

    <div v-if="errorMessage" class="text-danger mt-2">{{ errorMessage }}</div>
    <div v-if="okMessage" class="text-success mt-2">{{ okMessage }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const role = ref('')
const errorMessage = ref('')
const okMessage = ref('')
const emailError = ref('')
const passwordError = ref('')

function handleRegister() {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const e = email.value.toLowerCase()
  const p = password.value
  const r = role.value

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  emailError.value = emailRegex.test(e) ? '' : 'Invalid email format.'
  passwordError.value = p.length >= 6 ? '' : 'Password must be at least 6 characters long.'

  if (emailError.value || passwordError.value) {
    errorMessage.value = 'Please fix the errors above.'
    okMessage.value = ''
    return
  }

  if (!e || !p || !r) {
    errorMessage.value = 'Please fill in all fields.'
    okMessage.value = ''
    return
  }

  if (users.find(u => u.email === e)) {
    errorMessage.value = 'User already exists.'
    okMessage.value = ''
    return
  }

  users.push({ email: e, password: p, role: r })
  localStorage.setItem('users', JSON.stringify(users))

  okMessage.value = 'Registration successful! Redirecting to login...'
  errorMessage.value = ''
  setTimeout(() => router.push('/login'), 800)
}
</script>
