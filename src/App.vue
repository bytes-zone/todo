<script setup lang="ts">
import { computed, ref } from 'vue'
import { type AppV1 } from './lib/types'
import { init, useDocument } from './lib/use-automerge'
import * as uuid from 'uuid'

const handle = await init<AppV1>({ todos: {} })
const doc = await useDocument(handle)

const newTodo = ref('')
const validNewTodo = computed(() => newTodo.value.trim().length > 0)
function addTodo(ev: Event) {
  ev.preventDefault()
  handle.change((d) => {
    const newId = uuid.v7()
    d.todos[newId] = {
      id: newId,
      title: newTodo.value,
      notes: '',
      tags: [],
      added: new Date(),
      completed: null
    }
  })
  newTodo.value = ''
}
</script>

<template>
  <form @submit="addTodo" class="flex">
    <input v-model="newTodo" class="border-indigo-500 border-2 rounded-l-md px-2 grow" />
    <button
      :disabled="!validNewTodo"
      class="rounded-r-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:bg-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Add
    </button>
  </form>

  <ul v-for="todo in Object.values(doc.todos)" :key="todo.id">
    <li>{{ JSON.stringify(todo) }}</li>
  </ul>
</template>
