<script setup lang="ts">
import { stackBuilderMachine } from "@/lib/stackBuilderMachine"
import type { AppV1, TodoId } from "@/lib/types"
import { useMachine } from "@xstate/vue"
import { watch } from "vue"

const { doc } = defineProps<{ doc: AppV1 }>()

const emit = defineEmits<{
  addToStack: [id: TodoId]
}>()

const { snapshot, send, actorRef } = useMachine(stackBuilderMachine, { input: doc })

watch(doc, (newDoc) => {
  send({ type: "newDoc", doc: newDoc })
})

actorRef.on("addToStack", ({ id }) => emit("addToStack", id))
</script>

<template>
  <template v-if="snapshot.matches('reviewing')">
    <button @click="send({ type: 'review', result: 'yes' })" class="btn btn-neutral">Yes</button>
    <button @click="send({ type: 'review', result: 'no' })" class="btn btn-neutral">No</button>
  </template>

  {{ snapshot.context }}

  <ul>
    <li v-for="id in snapshot.context.eligible" :key="id">
      <template v-if="snapshot.context.eligible[snapshot.context.index] === id">⭐️</template>
      <TodoCompact :todo="doc.todos[id]" />
    </li>
  </ul>
</template>
