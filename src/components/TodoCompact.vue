<script setup lang="ts">
import { type TodoV1 } from '../lib/types'

defineProps<{
  todo: TodoV1
  onComplete: (id: string, complete: boolean) => void
}>()
</script>

<template>
  <div class="flex gap-2 form-control">
    <input
      type="checkbox"
      :checked="todo.completed !== null"
      class="checkbox"
      :aria-label="todo.completed ? 'Mark complete' : 'Mark incomplete'"
      @change="onComplete(todo.id, !todo.completed)"
    />
    <span>{{ todo.title }}</span>
  </div>
</template>
