<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const errors = ref({})

function validateForm() {
  errors.value = {}
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!name.value) errors.value.name = 'Name is required.'
  if (!email.value) {
    errors.value.email = 'Email is required.'
  } else if (!emailRegex.test(email.value)) {
    errors.value.email = 'Invalid email format.'
  }

  if (Object.keys(errors.value).length === 0) {
    alert('Form submitted successfully!')
    name.value = ''
    email.value = ''
  }
}
</script>

<template>
  <div class="container mt-4">
    <h4>Subscribe to Nutrition Tips</h4>
    <input v-model="name" type="text" placeholder="Name" class="form-control mb-2" />
    <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>

    <input v-model="email" type="email" placeholder="Email" class="form-control mb-2" />
    <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>

    <button class="btn btn-primary" @click="validateForm">Submit</button>
  </div>
</template>
