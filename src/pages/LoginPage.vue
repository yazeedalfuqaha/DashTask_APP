<template>
  <q-page class="flex flex-center column bg-grey-1">
    <div class="auth-container shadow-2 q-pa-xl bg-white">
      <h2 class="text-h4 text-weight-bold text-primary q-mt-none q-mb-md text-center">Login</h2>

      <q-input v-model="email" label="Email" type="email" class="q-mb-sm" outlined />
      <q-input v-model="password" label="Password" type="password" class="q-mb-md" outlined />

      <q-btn
        @click="handleLogin"
        label="Login"
        color="primary"
        class="q-mt-md full-width"
        rounded
        unelevated
      />

      <div class="q-mt-lg text-center text-grey-7">
        Don't have an account?
        <router-link to="/signup" class="text-primary text-weight-bold text-no-decoration">
          Sign Up
        </router-link>
      </div>

      <q-banner v-if="auth.error" class="q-mt-md text-white bg-negative rounded-borders">
        <template v-slot:avatar>
          <q-icon name="error" color="white" />
        </template>
        {{ auth.error }}
      </q-banner>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')

const auth = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  await auth.login(email.value, password.value)
  if (auth.user) await router.push('/dashboard')
}
</script>

<style scoped>
.auth-container {
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
}

.text-no-decoration {
  text-decoration: none;
}

.text-no-decoration:hover {
  text-decoration: underline;
}


.q-banner {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
