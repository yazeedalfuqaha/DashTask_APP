<template>
  <q-page class="q-pa-md bg-grey-2">
    <div class="max-container q-mx-auto">
      <div class="row items-center q-mb-lg">
        <div class="col">
          <h4 class="text-h4 text-weight-bold q-my-none text-primary">My Tasks</h4>
          <div class="text-grey-7">Manage your daily goals and stay productive.</div>
        </div>
        <q-btn round color="primary" icon="add" size="lg" @click="showAddDialog = true" class="shadow-5" />
      </div>

      <div class="row q-col-gutter-md q-mb-lg">
        <div class="col-12 col-sm-6">
          <q-card flat bordered class="bg-primary text-white text-center q-pa-md">
            <div class="text-subtitle2 opacity-80">Pending Tasks</div>
            <div class="text-h4 text-weight-bolder">{{ pendingTasks.length }}</div>
          </q-card>
        </div>
        <div class="col-12 col-sm-6">
          <q-card flat bordered class="bg-positive text-white text-center q-pa-md">
            <div class="text-subtitle2 opacity-80">Completed</div>
            <div class="text-h4 text-weight-bolder">{{ completedTasks.length }}</div>
          </q-card>
        </div>
      </div>

      <q-list bordered separator class="bg-white rounded-borders shadow-1">
        <q-item v-for="task in paginatedTasks" :key="task.id" clickable v-ripple :class="{ 'task-done bg-grey-1': task.completed }">
          <q-item-section side>
            <q-checkbox
              v-model="task.completed"
              color="primary"
              @update:model-value="toggleComplete(task)"
            />
          </q-item-section>

          <q-item-section>
            <q-item-label :class="{ 'text-strike text-grey-6': task.completed }" class="text-weight-bold text-subtitle1">
              {{ task.title }}
            </q-item-label>
            <q-item-label caption v-if="task.description">{{ task.description }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-btn flat round color="negative" icon="delete" size="sm" @click="deleteTask(task.id)" />
          </q-item-section>
        </q-item>

        <q-item v-if="tasks.length === 0" class="text-center q-pa-xl text-grey-5">
          <q-item-section>
            <q-icon name="assignment" size="100px" class="q-mx-auto" />
            <div class="text-h6">No tasks yet! Add one to start.</div>
          </q-item-section>
        </q-item>
      </q-list>

      <div v-if="totalPages > 1" class="row justify-center q-mt-md">
        <q-pagination
          v-model="currentPage"
          :max="totalPages"
          direction-links
          boundary-links
          color="primary"
          icon-first="skip_previous"
          icon-last="skip_next"
          icon-prev="fast_rewind"
          icon-next="fast_forward"
        />
      </div>

      <q-dialog v-model="showAddDialog" persistent>
        <q-card style="min-width: 350px" class="q-pa-md">
          <q-card-section><div class="text-h6">Add New Task</div></q-card-section>
          <q-card-section class="q-pt-none">
            <q-input dense v-model="newTask.title" label="Task Title" outlined class="q-mb-md" autofocus />
            <q-input dense v-model="newTask.description" label="Description (Optional)" outlined type="textarea" />
          </q-card-section>
          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn unelevated label="Add Task" color="primary" @click="addTask" v-close-popup />
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

interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  userId: string
}

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
  await updateDoc(taskRef, {
    completed: task.completed
  })
}

const deleteTask = async (id: string) => {
  await deleteDoc(doc(db, 'tasks', id))
  $q.notify({ type: 'danger', message: 'Task deleted' })
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
