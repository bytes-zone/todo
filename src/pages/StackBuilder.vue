<script setup lang="ts">
import { handle } from "@/lib/handle"
import { stackBuilderMachine } from "@/lib/stackBuilderMachine"
import { useDocument } from "@/lib/use-automerge"
import { useMachine } from "@xstate/vue"
import { watch } from "vue"

const doc = await useDocument(handle)

const { snapshot, send } = useMachine(stackBuilderMachine, {
  input: doc.value,
})

watch(doc, (newDoc) => {
  send({ type: "newDoc", doc: newDoc })
})
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
