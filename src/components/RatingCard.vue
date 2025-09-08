<template>
    <div class="card p-4">
      <h4 class="mb-3">Rate: {{ aspect }}</h4>
  
      <div class="mb-2">
        <button
          v-for="n in 5"
          :key="n"
          class="btn btn-link fs-3 p-0 me-2"
          :class="{ 'text-warning': n <= tempValue, 'text-secondary': n > tempValue }"
          @mouseenter="tempValue = n"
          @mouseleave="tempValue = myRating || 0"
          @click="setRating(n)"
          aria-label="rate"
        >★</button>
      </div>
  
      <div class="small text-muted">
        <span v-if="myRating">Your rating: {{ myRating }}/5 • </span>
        Average: <strong>{{ avg.toFixed(1) }}</strong>/5 ({{ count }} ratings)
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, onMounted, ref, watch } from 'vue'
  
  const props = defineProps({ aspect: { type: String, required: true } })
  
  const key = `ratings:${props.aspect}`      
  const ratings = ref({})                    
  const myRating = ref(0)
  const tempValue = ref(0)
  const user = ref(null)
  
  onMounted(() => {
    user.value = JSON.parse(localStorage.getItem('currentUser') || 'null')
    try {
      ratings.value = JSON.parse(localStorage.getItem(key) || '{}')
    } catch { ratings.value = {} }
  
    if (user.value?.email && ratings.value[user.value.email] != null) {
      myRating.value = ratings.value[user.value.email]
      tempValue.value = myRating.value
    }
  })
  
  const count = computed(() => Object.keys(ratings.value).length)
  const avg = computed(() => {
    const vals = Object.values(ratings.value)
    if (!vals.length) return 0
    return vals.reduce((a, b) => a + b, 0) / vals.length
  })
  
  function setRating(n) {
    if (!user.value?.email) return alert('Please log in to rate.')
    myRating.value = n
    tempValue.value = n
    ratings.value = { ...ratings.value, [user.value.email]: n }
    localStorage.setItem(key, JSON.stringify(ratings.value))
  }
  </script>
  
  <style scoped>
  button { text-decoration: none; }
  </style>
  