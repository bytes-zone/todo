<script setup lang="ts">
import { computed, ref } from 'vue'
import { type AppV1 } from './lib/types'
import { init, useDocument } from './lib/use-automerge'
import * as ops from './lib/ops'

const handle = await init<AppV1>(ops.init())
const doc = await useDocument(handle)

const newTodo = ref('')
const validNewTodo = computed(() => newTodo.value.trim().length > 0)
function addTodo(ev: Event) {
  ev.preventDefault()
  handle.change((d) => ops.addTodo(d, newTodo.value))
  newTodo.value = ''
}
</script>

<template>
  <form @submit="addTodo" class="join">
    <input v-model="newTodo" class="join-item input input-bordered" />
    <button :disabled="!validNewTodo" class="join-item btn btn-primary">Add</button>
  </form>

  <ul v-for="id in doc.rootTodos" :key="id">
    <li>{{ doc.todos[id] }}</li>
  </ul>
</template>
