<template>
  <q-page class="flex flex-center bg-gradient">
    <div class="welcome-container text-center q-pa-lg">
      <div class="hero-section q-mb-xl">
        <q-icon name="rocket_launch" size="100px" color="white" class="q-mb-md float-animation" />
        <h1 class="text-h2 text-weight-bolder text-white q-my-none">TaskFlow</h1>
        <div class="text-h5 text-white opacity-80 q-mt-sm">Organize your life, one task at a time.</div>
      </div>

      <div class="action-card q-pa-xl shadow-24">
        <div v-if="!auth.user">
          <div class="text-h6 q-mb-md text-grey-8">Get started with your account</div>
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
          <div class="text-h6 q-mb-md text-grey-8">Welcome back, {{ userName }}!</div>
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
      </div>

      <div class="footer-info q-mt-xl text-white opacity-60">
        <div class="row justify-center q-gutter-x-lg">
          <div class="row items-center"><q-icon name="cloud" class="q-mr-xs"/> Cloud Sync</div>
          <div class="row items-center"><q-icon name="security" class="q-mr-xs"/> Secure Data</div>
          <div class="row items-center"><q-icon name="devices" class="q-mr-xs"/> Multi-device</div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from 'src/stores/auth';

const auth = useAuthStore();

const userName = computed(() => {
  return auth.user?.displayName || auth.user?.email?.split('@')[0] || 'User';
});
</script>

<style scoped>
.bg-gradient {
  background: linear-gradient(135deg, #1976d2 0%, #673ab7 100%);
}

.welcome-container {
  max-width: 500px;
  width: 100%;
}

.action-card {
  background: white;
  border-radius: 30px;
  transform: translateY(0);
  transition: all 0.3s ease;
}

.opacity-80 { opacity: 0.8; }
.opacity-60 { opacity: 0.6; }

.float-animation {
  animation: floating 3s ease-in-out infinite;
}

@keyframes floating {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}
</style>
