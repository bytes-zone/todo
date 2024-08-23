<script setup lang="ts">
import { computed, ref } from 'vue'
import { type AppV1 } from './lib/types'
import { init, useDocument } from './lib/use-automerge'

const handle = await init<AppV1>({ todos: {} })
const doc = await useDocument(handle)

const newTodo = ref('')
const validNewTodo = computed(() => newTodo.value.trim().length > 0)
function addTodo(ev: Event) {
  ev.preventDefault()
  console.log(ev, newTodo.value)
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
</template>
