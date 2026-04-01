<template>
  <q-list bordered separator class="bg-white rounded-borders shadow-1">
    <q-item
      v-for="task in tasks"
      :key="task.id"
      clickable
      v-ripple
      :class="{ 'task-done bg-grey-1': task.completed }"
    >
      <q-item-section side>
        <q-checkbox
          v-model="task.completed"
          color="primary"
          @update:model-value="$emit('toggle', task)"
        />
      </q-item-section>

      <q-item-section>
        <q-item-label
          :class="{ 'text-strike text-grey-6': task.completed }"
          class="text-weight-bold text-subtitle1"
        >
          {{ task.title }}
        </q-item-label>
        <q-item-label caption v-if="task.description">
          {{ task.description }}
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-item v-if="tasks.length === 0" class="text-center q-pa-xl text-grey-5">
      <q-item-section>
        <q-icon name="assignment" size="100px" class="q-mx-auto" />
        <div class="text-h6">No tasks yet! Add one to start.</div>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import type { Task } from 'src/types/task'


defineProps<{
  tasks: Task[]
}>()

defineEmits<{
  (e: 'toggle', task: Task): void
  (e: 'delete', id: string): void
}>()
</script>
