<template>
    <div class="container mt-5 text-center">
      <h2>Admin Panel</h2>
      <p>Only admins can see this page.</p>
      <button class="btn btn-primary mt-3" @click="goBack">Back to Dashboard</button>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()
  
  function goBack() {
    router.push('/dashboard')
  }
  </script>
  