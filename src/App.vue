<script setup lang="ts">
import { init, useDocument } from './lib/use-automerge'

const handle = await init({ message: 'Howdy' })
const doc = await useDocument(handle)
</script>

<template>{{ JSON.stringify(doc) }}</template>
