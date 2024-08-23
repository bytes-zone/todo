<script setup lang="ts">
import { init, useDocument } from './lib/use-automerge'

const handle = await init({ message: 'Howdy' })
const doc = await useDocument(handle)
</script>

<template>
  <p class="font-mono">
    {{ JSON.stringify(doc) }}
  </p>
</template>
