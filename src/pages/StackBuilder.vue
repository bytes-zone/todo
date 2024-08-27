<script setup lang="ts">
import { handle } from "@/lib/handle"
import { useDocument } from "@/lib/use-automerge"
import { computed } from "vue"

const doc = await useDocument(handle)

const eligible = computed(() => {
  return doc.value.rootTodos.map((id) => doc.value.todos[id]).filter((todo) => !todo.completed)
})
</script>

<template>
  <ul>
    <li v-for="todo in eligible" :key="todo.id">
      <TodoCompact :todo="todo" />
    </li>
  </ul>
</template>
