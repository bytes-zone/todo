import type { Doc, DocHandle } from '@automerge/automerge-repo'
import { ref, type Ref } from 'vue'

export async function useDocument<T>(handle: DocHandle<T>): Promise<Ref<Doc<T>>> {
  const initial = await handle.doc()

  if (!initial) {
    throw new Error("The handle had an undefined doc. Just for convenience's sake, don't do that!")
  }

  // We need to cast here because of the generic `T`. Vue can't know that that
  // doesn't contain a ref. This is not the safest thing in the world, but it
  // does work. (And I think Automerge would object if you put a ref in a
  // document anyway.)
  const doc = ref(initial) as Ref<Doc<T>>

  handle.on('change', (payload) => (doc.value = payload.doc))

  return doc
}
