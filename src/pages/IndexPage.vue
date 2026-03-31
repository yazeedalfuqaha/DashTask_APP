<template>
  <q-page class="flex flex-center bg-gradient" style="">

    <div class="welcome-container text-center q-pa-md">

      <!-- Hero Section -->
      <div class="hero-section q-mb-xl">
        <q-icon
          name="rocket_launch"
          size="4px"
          color="white"
          class="q-mb-md float-animation"
        />
        <h1 class="text-h2 text-weight-bolder text-white q-my-none">
          TaskFlow
        </h1>
        <div class="text-h5 text-white opacity-80 q-mt-sm">
          Organize your life, one task at a time.
        </div>
      </div>

      <!-- Card -->
      <q-card class="my-card">

        <q-card-section>
          <div v-if="!auth.user">
            <div class="text-h6 q-mb-md text-grey-8">
              Get started with your account
            </div>

            <div class="column q-gutter-y-md">
              <q-btn
                label="Login to your account"
                color="primary"
                size="lg"
                unelevated
                rounded
                to="/login"
                class="full-width"
              />

              <q-btn
                label="Create new account"
                color="primary"
                outline
                size="lg"
                rounded
                to="/signup"
                class="full-width"
              />
            </div>
          </div>

          <div v-else>
            <div class="text-h6 q-mb-md text-grey-8">
              Welcome back, {{ userName }}!
            </div>

            <q-btn
              label="Go to Dashboard"
              color="positive"
              size="lg"
              unelevated
              rounded
              icon="dashboard"
              to="/dashboard"
              class="full-width"
            />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section class="footer-info text-grey-7">
          <div class="row justify-center q-gutter-x-lg">
            <div class="row items-center">
              <q-icon name="cloud" class="q-mr-xs" />
              Cloud Sync
            </div>

            <div class="row items-center">
              <q-icon name="security" class="q-mr-xs" />
              Secure Data
            </div>

            <div class="row items-center">
              <q-icon name="devices" class="q-mr-xs" />
              Multi-device
            </div>
          </div>
        </q-card-section>

      </q-card>

    </div>

  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from 'src/stores/auth'

const auth = useAuthStore()

const userName = computed(() => {
  return auth.user?.displayName || auth.user?.email?.split('@')[0] || 'User'
})
</script>

<style scoped>

.bg-gradient {
  background: linear-gradient(135deg, #1976d2 0%, #673ab7 100%);
  height: 100vh;
  width: 100vw;
  overflow: hidden !important;
  position: fixed;
  top: 0;
  left: 0;
}


.welcome-container {
  max-width: 450px;
  width: 90%;
  max-height: 95vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}


.my-card {
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}


.hero-section q-icon {
  font-size: clamp(60px, 10vh, 100px) !important;
}

.text-h2 {
  font-size: clamp(2rem, 8vw, 3.75rem);
  line-height: 1.1;
}


:deep(html), :deep(body) {
  overflow: hidden !important;
  height: 100% !important;
  margin: 0 !important;
}


:deep(::-webkit-scrollbar) {
  display: none;
}


.float-animation {
  animation: floating 3s ease-in-out infinite;
}

@keyframes floating {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}
</style>
