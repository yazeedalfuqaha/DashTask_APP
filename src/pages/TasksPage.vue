<template>
  <q-page class="q-pa-md bg-grey-2">
    <div class="max-container q-mx-auto" style="max-width: 800px;">
      <!-- Header -->
      <div class="row items-center q-mb-lg">
        <div class="col">
          <h4 class="text-h4 text-weight-bold q-my-none text-primary">My Tasks</h4>
          <div class="text-grey-7">Manage your daily goals and stay productive.</div>
        </div>
        <q-btn round color="primary" icon="add" size="lg" @click="showAddDialog = true" />
      </div>

      <!-- Stats -->
      <div class="row q-col-gutter-md q-mb-lg">
        <div class="col-12 col-sm-6">
          <q-card class="bg-primary text-white text-center q-pa-md">
            <div>Pending Tasks</div>
            <div class="text-h4">{{ pendingTasks.length }}</div>
          </q-card>
        </div>

        <div class="col-12 col-sm-6">
          <q-card class="bg-positive text-white text-center q-pa-md">
            <div>Completed</div>
            <div class="text-h4">{{ completedTasks.length }}</div>
          </q-card>
        </div>
      </div>
    <TaskList
        :tasks="paginatedTasks"
        @toggle="toggleComplete"
        @delete="deleteTask"
      />

    
      <div v-if="totalPages > 1" class="row justify-center q-mt-md">
        <q-pagination
          v-model="currentPage"
          :max="totalPages"
          color="primary"
          direction-links
        />
      </div>

      <!-- Add Dialog -->
      <q-dialog v-model="showAddDialog">
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Add Task</div>
          </q-card-section>

          <q-card-section>
            <q-input v-model="newTask.title" label="Title" outlined />
            <q-input v-model="newTask.description" label="Description" outlined type="textarea" class="q-mt-sm" />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn color="primary" label="Add" @click="addTask" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { db, auth } from 'src/boot/firebase'
import type { Task } from 'src/types/task'
import TaskList from 'src/components/TaskList.vue'
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore'

const $q = useQuasar()
const showAddDialog = ref(false)
const tasks = ref<Task[]>([])
const newTask = ref({ title: '', description: '' })
const currentPage = ref(1)
const tasksPerPage = 5

onMounted(() => {
  if (auth.currentUser) {
    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', auth.currentUser.uid)
    )
    onSnapshot(q, (snapshot) => {
      tasks.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Task[]
    })
  }
})

const addTask = async () => {
  if (newTask.value.title.trim() && auth.currentUser) {
    try {
      await addDoc(collection(db, 'tasks'), {
        title: newTask.value.title,
        description: newTask.value.description,
        completed: false,
        userId: auth.currentUser.uid,
        createdAt: Date.now()
      })
      newTask.value = { title: '', description: '' }
      showAddDialog.value = false
      $q.notify({ type: 'positive', message: 'Task saved to cloud!' })
    } catch {
      $q.notify({ type: 'negative', message: 'Error saving task' })
    }
  }
}

const toggleComplete = async (task: Task) => {
  const taskRef = doc(db, 'tasks', task.id)
  await updateDoc(taskRef, { completed: task.completed })
}

const deleteTask = async (id: string) => {
  await deleteDoc(doc(db, 'tasks', id))
  $q.notify({ type: 'negative', message: 'Task deleted' })
}

const pendingTasks = computed(() => tasks.value.filter(t => !t.completed))
const completedTasks = computed(() => tasks.value.filter(t => t.completed))
const totalPages = computed(() => Math.ceil(tasks.value.length / tasksPerPage))
const paginatedTasks = computed(() => {
  const start = (currentPage.value - 1) * tasksPerPage
  return tasks.value.slice(start, start + tasksPerPage)
})
</script>

<style scoped>
.max-container { max-width: 800px; }
.text-strike { text-decoration: line-through; }
.task-done { transition: all 0.3s ease; }
.opacity-80 { opacity: 0.8; }
</style>
