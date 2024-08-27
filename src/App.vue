<script setup lang="ts">
import { computed, ref } from "vue"
import { type AppV1, type TodoId } from "./lib/types"
import { init, useDocument } from "./lib/use-automerge"
import * as ops from "./lib/ops"

const handle = await init<AppV1>(ops.init())
const doc = await useDocument(handle)

function addTodo(title: string) {
  handle.change((d) => ops.addTodo(d, title))
}

function completeTodo(id: TodoId) {
  handle.change((d) => ops.toggleComplete(d, id))
}
</script>

<template>
  <NewTodoForm @add-todo="addTodo" />

  <ul class="flex flex-col gap-2">
    <li v-for="id in doc.rootTodos" :key="id">
      <TodoCompact :todo="doc.todos[id]" @toggle-complete="completeTodo" />
    </li>
  </ul>
</template>
