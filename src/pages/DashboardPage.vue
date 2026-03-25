<template>
  <q-page class="flex flex-center column bg-grey-1">
    <div class="welcome-card text-center q-pa-xl shadow-2 bg-white">
      <q-avatar
        size="100px"
        font-size="52px"
        color="primary"
        text-color="white"
        class="q-mb-lg shadow-5"
      >
        {{ userName?.charAt(0).toUpperCase() || 'U' }}
      </q-avatar>

      <div class="text-h3 text-weight-bold text-primary q-mb-sm">Welcome back,</div>

      <div class="text-h2 text-weight-bolder user-name-gradient q-mb-md">{{ userName }} 🎉</div>

      <p class="text-grey-7 text-subtitle1">
        Great to see you again! Here's what's happening with your tasks today.
      </p>

      <q-separator spaced class="q-my-lg" />

      <div class="row q-gutter-md justify-center">
        <q-btn label="View Tasks" color="primary" rounded unelevated icon="list" to="/tasks" />
        <q-btn label="Profile" color="secondary" outline rounded icon="person" @click="showProfile = true" />
      </div>
    </div>

    <q-dialog v-model="showProfile">
      <q-card style="width: 350px; border-radius: 15px">
        <q-card-section class="bg-secondary text-white row items-center q-pb-none">
          <div class="text-h6">User Profile</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="text-center q-pa-md">
          <q-avatar size="80px" color="grey-3" text-color="secondary" icon="person" class="q-mb-sm" />
          <div class="text-weight-bold text-h6">{{ userName }}</div>
          <div class="text-caption text-grey-7">{{ auth.user?.email }}</div>
        </q-card-section>

        <q-separator />

        <q-card-section class="q-pa-md">
          <div class="text-subtitle2 q-mb-sm">Task Statistics</div>
          <q-list bordered separator class="rounded-borders">
            <q-item>
              <q-item-section avatar>
                <q-icon name="pending" color="orange" />
              </q-item-section>
              <q-item-section>Pending Tasks</q-item-section>
              <q-item-section side>
                <q-badge color="orange" :label="pendingCount.toString()" />
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon name="check_circle" color="positive" />
              </q-item-section>
              <q-item-section>Completed Tasks</q-item-section>
              <q-item-section side>
                <q-badge color="positive" :label="completedCount.toString()" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions align="center" class="q-pb-md">
          <q-btn flat label="Logout" color="negative" icon="logout" @click="auth.logout()" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import { db } from 'src/boot/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

interface Task {
  title: string;
  completed: boolean;
  userId: string;
}

const auth = useAuthStore();
const showProfile = ref(false);
const userTasks = ref<Task[]>([]);

const userName = computed((): string => {
  const name = auth.user?.displayName || auth.user?.email?.split('@')[0];
  return name || 'Guest';
});

onMounted(() => {
  if (auth.user?.uid) {
    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', auth.user.uid)
    );

    onSnapshot(q, (snapshot) => {
      userTasks.value = snapshot.docs.map(doc => doc.data() as Task);
    });
  }
});

const pendingCount = computed(() => userTasks.value.filter(t => !t.completed).length);
const completedCount = computed(() => userTasks.value.filter(t => t.completed).length);
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
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
