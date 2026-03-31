<template>
  <div>
    
    <div v-if="loading" class="spinner-container">
      <div class="spinner"></div>
    </div>


    <router-view v-else />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from 'src/stores/auth'

const auth = useAuthStore()
auth.init()

const loading = ref(true)


const stopWatch = watch(
  () => auth.initialized,
  (val) => {
    if (val) {
      loading.value = false
      stopWatch()
    }
  }
)
</script>

<style scoped>

.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.spinner {
  border: 6px solid #f3f3f3;
  border-top: 6px solid #1976d2;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
