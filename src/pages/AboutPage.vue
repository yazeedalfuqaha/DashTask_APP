<template>
  <q-page class="q-pa-md flex flex-center bg-grey-1">
    <div class="about-card shadow-5 q-pa-xl bg-white text-center">
      <q-icon name="rocket_launch" size="100px" color="primary" class="q-mb-md" />

      <h1 class="text-h3 text-weight-bolder text-primary q-mt-none">DashTask App</h1>

      <p class="text-subtitle1 text-grey-8 q-mb-xl">
        The ultimate solution to organize your daily tasks and boost your productivity. Designed for
        professionals who value their time.
      </p>

      <div class="row q-col-gutter-md justify-center q-mb-xl">
        <div class="col-12 col-sm-4">
          <q-card flat bordered class="feature-card">
            <q-card-section>
              <q-icon name="bolt" size="md" color="warning" />
              <div class="text-h6 q-mt-sm">Fast</div>
              <div class="text-caption text-grey-7">Optimized for speed and efficiency.</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-sm-4">
          <q-card flat bordered class="feature-card">
            <q-card-section>
              <q-icon name="security" size="md" color="positive" />
              <div class="text-h6 q-mt-sm">Secure</div>
              <div class="text-caption text-grey-7">Your data is safe with Firebase.</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-sm-4">
          <q-card flat bordered class="feature-card">
            <q-card-section>
              <q-icon name="devices" size="md" color="info" />
              <div class="text-h6 q-mt-sm">Cloud</div>
              <div class="text-caption text-grey-7">Access your tasks from anywhere.</div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <q-btn
        v-if="!auth.user"
        to="/signup"
        label="Get Started Now"
        color="primary"
        rounded
        unelevated
        size="lg"
        class="q-px-xl"
      />
      <q-btn
        v-else
        to="/dashboard-view"
        label="Go to My Workspace"
        color="primary"
        rounded
        unelevated
        size="lg"
        class="q-px-xl"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useAuthStore } from 'src/stores/auth';
const auth = useAuthStore();
</script>

<style scoped>
.about-card {
  width: 100%;
  max-width: 900px;
  border-radius: 24px;
}

.feature-card {
  transition: transform 0.3s ease;
  border-radius: 15px;
}

.feature-card:hover {
  transform: translateY(-10px);
  border-color: var(--q-primary);
}
</style>
