import { type AnyDocumentId, Repo, type Doc, type DocHandle } from "@automerge/automerge-repo/slim"
import { BroadcastChannelNetworkAdapter } from "@automerge/automerge-repo-network-broadcastchannel"
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb"
import { ref, type Ref } from "vue"
import * as A from "@automerge/automerge/slim"
import wasmUrl from "@automerge/automerge/automerge.wasm?url"

const documentIdKey = "documentId"

export async function init<T>(initialValue: Uint8Array): Promise<DocHandle<T>> {
  await A.initializeWasm(wasmUrl)

  const repo = new Repo({
    storage: new IndexedDBStorageAdapter(),
    network: [new BroadcastChannelNetworkAdapter()],
  })

  const documentId = localStorage.getItem(documentIdKey)
  if (documentId) {
    return repo.find(documentId as AnyDocumentId)
  } else {
    const handle = repo.import(initialValue) as DocHandle<T>
    localStorage.setItem(documentIdKey, handle.documentId)
    return handle
  }
}

export async function useDocument<T>(handle: DocHandle<T>): Promise<Ref<Readonly<Doc<T>>>> {
  const initial = await handle.doc()

  if (!initial) {
    throw new Error("The handle had an undefined doc. Just for convenience's sake, don't do that!")
  }

  // We need to cast here because of the generic `T`. Vue can't know that that
  // doesn't contain a ref. This is not the safest thing in the world, but it
  // does work. (And I think Automerge would object if you put a ref in a
  // document anyway.)
  const doc = ref(initial) as Ref<Readonly<Doc<T>>>

  handle.on("change", (payload) => (doc.value = payload.doc))

  return doc
}
