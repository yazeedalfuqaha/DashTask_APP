<template>
  <q-page class="flex flex-center column bg-grey-1">
    <div class="auth-container shadow-2 q-pa-xl bg-white">
      <h2 class="text-h4 text-weight-bold text-primary q-mt-none q-mb-md text-center">Sign Up</h2>

      <q-input v-model="name" label="Full Name" type="text" class="q-mb-sm" outlined>
        <template v-slot:prepend>
          <q-icon name="person" />
        </template>
      </q-input>

      <q-input v-model="email" label="Email" type="email" class="q-mb-sm" outlined>
        <template v-slot:prepend>
          <q-icon name="email" />
        </template>
      </q-input>

      <q-input v-model="password" label="Password" type="password" class="q-mb-md" outlined>
        <template v-slot:prepend>
          <q-icon name="lock" />
        </template>
      </q-input>

      <q-btn
        @click="handleSignup"
        label="Create Account"
        color="primary"
        class="q-mt-md full-width"
        rounded
        unelevated
        :loading="loading"
      />

      <div class="q-mt-lg text-center text-grey-7">
        Already have an account?
        <router-link to="/login" class="text-primary text-weight-bold text-no-decoration">
          Login
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
import { useQuasar } from 'quasar'

const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)

const auth = useAuthStore()
const router = useRouter()
const $q = useQuasar()

const handleSignup = async () => {
  loading.value = true
  try {

    await auth.signup(email.value, password.value, name.value)

    if (!auth.error && auth.user) {


      if (typeof $q.notify === 'function') {
        $q.notify({
          type: 'positive',
          message: 'Account created successfully! Please login.',
          position: 'top',
          timeout: 3000
        })
      } else {

        //console.log('Signup successful, but Notify plugin is not enabled.')
      }

      auth.user = null
      void router.push('/login')
    }
  } catch (e) {
    console.error('Signup failed:', e)
  } finally {
    loading.value = false
  }
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
