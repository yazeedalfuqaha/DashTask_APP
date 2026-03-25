<template>
  <q-page class="flex flex-center column bg-grey-1">
    <div class="welcome-card text-center q-pa-xl shadow-2 bg-white">

      <q-avatar size="100px" font-size="52px" color="primary" text-color="white" class="q-mb-lg shadow-5">
        {{ userName?.charAt(0).toUpperCase() || 'U' }}
      </q-avatar>

      <div class="text-h3 text-weight-bold text-primary q-mb-sm">
        Welcome back,
      </div>

      <div class="text-h2 text-weight-bolder user-name-gradient q-mb-md">
        {{ userName }} 🎉
      </div>

      <p class="text-grey-7 text-subtitle1">
        Great to see you again! Here's what's happening with your tasks today.
      </p>

      <q-separator spaced class="q-my-lg" />

      <div class="row q-gutter-md justify-center">
        <q-btn label="View Tasks" color="primary" rounded unelevated icon="list" />
        <q-btn label="Profile" color="secondary" outline rounded icon="person" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from 'src/stores/auth'

const auth = useAuthStore()


const userName = computed((): string => {
  const name = auth.user?.displayName || auth.user?.email?.split('@')[0]
  return name || 'Guest'
})
</script>

<style scoped>
.welcome-card {
  width: 100%;
  max-width: 600px;
  border-radius: 20px;
  border-top: 8px solid var(--q-primary);
  animation: slideUp 0.6s ease-out;
}

.user-name-gradient {
  background: linear-gradient(45deg, var(--q-primary), #673ab7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
