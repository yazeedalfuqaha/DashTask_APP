<template>
  <q-btn v-if="auth.user" flat round dense icon="assignment">
    <q-badge v-if="pendingTasks.length" color="red" floating>
      {{ pendingTasks.length }}
    </q-badge>

    <q-menu transition-show="jump-down" transition-hide="jump-up" :offset="[0, 10]">
      <q-list style="min-width: 280px" class="q-py-none">

        <!-- PENDING SECTION -->
        <q-item-label header class="text-weight-bold text-primary bg-grey-2">
          Pending Tasks ({{ pendingTasks.length }})
        </q-item-label>

        <template v-if="pendingTasks.length">
          <q-item v-for="task in pendingTasks" :key="task.id" v-ripple>
            <q-item-section avatar>
              <q-checkbox
                :model-value="task.completed"
                @update:model-value="toggleComplete(task)"
                color="primary"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label lines="1">{{ task.title }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
        <q-item v-else>
          <q-item-section class="text-grey text-italic text-center q-pa-sm">
            No pending tasks
          </q-item-section>
        </q-item>

        <q-separator />

        <!-- COMPLETED SECTION -->
        <q-item-label header class="text-weight-bold text-positive bg-grey-2">
          Completed ({{ completedTasks.length }})
        </q-item-label>

        <template v-if="completedTasks.length">
          <q-item v-for="task in completedTasks" :key="task.id" v-ripple>
            <q-item-section avatar>
              <q-checkbox
                :model-value="task.completed"
                @update:model-value="toggleComplete(task)"
                color="positive"
              />
            </q-item-section>
            <q-item-section class="text-strike text-grey-6">
              <q-item-label lines="1">{{ task.title }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
        <q-item v-else>
          <q-item-section class="text-grey text-italic text-center q-pa-sm">
            No completed tasks
          </q-item-section>
        </q-item>

      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { db } from 'src/boot/firebase'
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore'

interface Task {
  id: string
  title: string
  completed: boolean
  userId: string
}

const auth = useAuthStore()
const tasks = ref<Task[]>([])

const pendingTasks = computed(() => tasks.value.filter(t => !t.completed))
const completedTasks = computed(() => tasks.value.filter(t => t.completed))

onMounted(() => {
  if (auth.user) {
    const q = query(collection(db, 'tasks'), where('userId', '==', auth.user.uid))
    onSnapshot(q, (snapshot) => {
      tasks.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Task[]
    })
  }
})

const toggleComplete = async (task: Task) => {
  try {
    const taskRef = doc(db, 'tasks', task.id)
    await updateDoc(taskRef, { completed: !task.completed })
  } catch (err) {
    console.error('Failed to update task:', err)
  }
}
</script>

<style scoped>
.text-strike {
  text-decoration: line-through;
}
</style>
