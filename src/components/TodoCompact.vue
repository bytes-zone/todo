<script setup lang="ts">
import { type TodoId, type TodoV1 } from '../lib/types'

defineProps<{
  todo: TodoV1
}>()

defineEmits<{
  toggleComplete: [id: TodoId]
}>()
</script>

<template>
  <div class="flex gap-2 form-control">
    <input
      type="checkbox"
      :checked="todo.completed !== null"
      class="checkbox"
      :aria-label="todo.completed ? 'Mark incomplete' : 'Mark complete'"
      @change="$emit('toggleComplete', todo.id)"
    />
    <span>{{ todo.title }}</span>
  </div>
</template>
