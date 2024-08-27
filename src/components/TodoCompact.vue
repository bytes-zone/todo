<script setup lang="ts">
import { type TodoId, type TodoV1 } from "../lib/types"

defineProps<{
  todo: TodoV1
}>()

defineEmits<{
  toggleComplete: [id: TodoId]
}>()
</script>

<template>
  <div class="flex flex-row gap-2 form-control">
    <input
      type="checkbox"
      :checked="todo.completed !== null"
      class="checkbox checkbox-primary"
      :aria-label="todo.completed ? 'Mark incomplete' : 'Mark complete'"
      @change="$emit('toggleComplete', todo.id)"
    />
    <span :class="todo.completed ? 'line-through opacity-75 decoration-primary' : ''">{{
      todo.title
    }}</span>
  </div>
</template>
