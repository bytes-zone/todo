<script setup lang="ts">
import { type TodoV1 } from '../lib/types'

defineProps<{ todo: TodoV1 }>()
</script>

<template>{{ JSON.stringify(todo) }}</template>
