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

function completeTodo(id: string, complete: boolean) {
  handle.change((d) => ops.completeTodo(d, id, complete))
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

  <ul v-for="id in doc.rootTodos" :key="id">
    <li><TodoCompact :todo="doc.todos[id]" :on-complete="completeTodo" /></li>
  </ul>
</template>
