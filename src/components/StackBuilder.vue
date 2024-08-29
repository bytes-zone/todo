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
  <div v-if="snapshot.matches('reviewing')" class="card w-96 bg-neutral text-secondary-content">
    <div class="card-body items-center text-center">
      <div class="flex justify-center p-4">
        <TodoCompact :todo="doc.todos[snapshot.context.eligible[snapshot.context.index]]" />
      </div>
      <p class="card-title">Do you want to do this task before the top selected task?</p>

      <div class="card-actions justify-center mt-2">
        <button @click="send({ type: 'review', result: 'yes' })" class="btn btn-secondary">
          Yes
        </button>
        <button @click="send({ type: 'review', result: 'no' })" class="btn btn-secondary">
          No
        </button>
      </div>
    </div>
  </div>

  <ul class="flex gap-2 flex-col mt-2">
    <li
      v-for="id in snapshot.context.eligible.filter((_, i) => i > snapshot.context.index)"
      :key="id"
    >
      <TodoCompact :todo="doc.todos[id]" :highlighted="snapshot.context.selected.includes(id)" />
    </li>
  </ul>
</template>
