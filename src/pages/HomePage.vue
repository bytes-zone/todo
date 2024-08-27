<script setup lang="ts">
import type { TodoId } from "@/lib/types"
import * as ops from "@/lib/ops"
import { useDocument } from "@/lib/use-automerge"
import { handle } from "@/lib/handle"

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
