<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-1">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="q-py-sm">
        <q-btn flat dense round icon="menu" @click="drawer = !drawer" />
        <q-toolbar-title class="text-weight-bold">DashTask App</q-toolbar-title>

        <TasksDropdown />

       
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above bordered :width="280" class="bg-white">
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item-label header class="text-overline">Navigation</q-item-label>

          <q-item clickable v-ripple to="/" active-class="text-primary bg-blue-1" exact>
            <q-item-section avatar><q-icon name="home" /></q-item-section>
            <q-item-section class="text-weight-medium">Home</q-item-section>
          </q-item>

          <q-item v-if="auth.user" clickable v-ripple class="text-negative" @click="handleLogout">
            <q-item-section avatar><q-icon name="logout" /></q-item-section>
            <q-item-section class="text-weight-medium">Logout</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="custom-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth'
import TasksDropdown from 'src/components/TasksDropdown.vue' // Import here

const drawer = ref(false)
const auth = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  auth.user = null
  void router.push('/login')
}
</script>

<style scoped>
.q-item {
  border-radius: 0 24px 24px 0;
  margin-right: 12px;
}

.custom-container {
  padding-top: 28px !important;
}

/* Style for completed items to show they are finished */
.text-grey-7 {
  text-decoration: line-through;
  opacity: 0.7;
}
</style>
