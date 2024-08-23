<script setup lang="ts">
import { type AppV1 } from './lib/types'
import { init, useDocument } from './lib/use-automerge'

const handle = await init<AppV1>({ todos: {} })
const doc = await useDocument(handle)
</script>

<template>
  <p class="font-mono">
    {{ JSON.stringify(doc) }}
  </p>
</template>
