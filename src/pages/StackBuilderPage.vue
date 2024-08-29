<script setup lang="ts">
import { handle } from "@/lib/handle"
import { addToStack } from "@/lib/ops"
import { useDocument } from "@/lib/use-automerge"

const doc = await useDocument(handle)
</script>

<template>
  <StackBuilder :doc="doc" @add-to-stack="(id) => handle.change((d) => addToStack(d, id))" />
</template>
