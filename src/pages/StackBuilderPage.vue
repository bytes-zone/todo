<script setup lang="ts">
import { handle } from "@/lib/handle"
import { useDocument } from "@/lib/use-automerge"

const doc = await useDocument(handle)
</script>

<template>
  <StackBuilder :doc="doc" />
</template>
