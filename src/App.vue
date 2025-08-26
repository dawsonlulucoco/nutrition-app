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
  <div class="container mt-5">
    <h1 class="text-center mb-4">NFP Nutrition Web App</h1>

    <div class="row">
      <div class="col-md-6 mb-3">
        <div class="card p-3">
          <h4>Explore Recipes</h4>
          <p>Discover easy, budget-friendly, healthy meals for all families.</p>
          <button class="btn btn-primary">Browse</button>
        </div>
      </div>

      <div class="col-md-6 mb-3">
        <div class="card p-3">
          <h4>Join a Workshop</h4>
          <p>Find free community programs that help you eat and cook better.</p>
          <button class="btn btn-success">Find Workshops</button>
        </div>
      </div>
    </div>

    <div class="card mt-4 p-4">
      <h4 class="mb-3">Subscribe to Nutrition Tips</h4>

      <div class="mb-3">
        <label class="form-label">Name*</label>
        <input v-model="name" type="text" class="form-control" />
        <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
      </div>

      <div class="mb-3">
        <label class="form-label">Email*</label>
        <input v-model="email" type="email" class="form-control" />
        <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
      </div>

      <button class="btn btn-primary" @click="validateForm">Submit</button>
    </div>
  </div>
</template>
