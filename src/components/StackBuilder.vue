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
  <div v-if="snapshot.matches('reviewing')" class="flex gap-2 mb-2">
    <button @click="send({ type: 'review', result: 'yes' })" class="btn btn-neutral">Yes</button>
    <button @click="send({ type: 'review', result: 'no' })" class="btn btn-neutral">No</button>
  </div>

  <ul class="flex gap-2 flex-col">
    <li
      v-for="(id, i) in snapshot.context.eligible.filter((_, i) => i >= snapshot.context.index)"
      :key="id"
    >
      <TodoCompact :todo="doc.todos[id]" :highlighted="doc.stack.includes(id)" />
    </li>
  </ul>
</template>
