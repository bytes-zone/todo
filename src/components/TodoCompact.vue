<script setup lang="ts">
import { type TodoV1 } from '../lib/types'

defineProps<{ todo: TodoV1 }>()
</script>

<template>
  <div class="flex gap-2 form-control">
    <input type="checkbox" :checked="todo.completed !== null" class="checkbox" />
    <span>{{ todo.title }}</span>
  </div>
</template>
