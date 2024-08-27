<script setup lang="ts">
import { computed, ref } from "vue"

const emit = defineEmits<{ addTodo: [title: string] }>()

const newTodo = ref("")
const validNewTodo = computed(() => newTodo.value.trim().length > 0)
function addTodo(ev: Event) {
  ev.preventDefault()
  emit("addTodo", newTodo.value)
  newTodo.value = ""
}
</script>

<template>
  <form @submit="addTodo" class="join">
    <label class="input input-bordered join-item flex items-center gap-2">
      New Todo
      <input v-model="newTodo" class="grow" />
    </label>
    <button :disabled="!validNewTodo" class="join-item btn btn-primary">Add</button>
  </form>
</template>
