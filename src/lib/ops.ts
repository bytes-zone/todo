import { uuid } from "@automerge/automerge/slim"
import { type AppV1, type TodoId } from "./types"

export const initBytes = Uint8Array.from([
  133, 111, 74, 131, 214, 101, 224, 57, 0, 116, 1, 1, 0, 1, 181, 166, 103, 184, 144, 253, 38, 74,
  238, 145, 66, 221, 238, 87, 101, 116, 121, 127, 6, 96, 69, 15, 51, 20, 211, 236, 25, 215, 178,
  155, 232, 142, 6, 1, 2, 3, 2, 19, 2, 35, 2, 64, 2, 86, 2, 7, 21, 23, 33, 2, 35, 4, 52, 1, 66, 4,
  86, 2, 128, 1, 2, 127, 0, 127, 1, 127, 3, 127, 0, 127, 0, 127, 7, 125, 9, 114, 111, 111, 116, 84,
  111, 100, 111, 115, 5, 115, 116, 97, 99, 107, 5, 116, 111, 100, 111, 115, 3, 0, 125, 2, 1, 126, 3,
  2, 2, 127, 0, 3, 0, 3, 0, 0,
])

export function init(): AppV1 {
  return {
    todos: {},
    rootTodos: [],
    stack: [],
  }
}

export function addTodo(doc: AppV1, title: string): TodoId {
  const id = uuid() as TodoId

  doc.todos[id] = {
    id,
    title,
    notes: "",
    tags: [],
    added: new Date(),
    completed: null,
    children: [],
  }

  doc.rootTodos.push(id)

  return id
}

export function toggleComplete(d: AppV1, id: TodoId): void {
  const todo = d.todos[id]
  if (!todo) {
    throw new Error(`Todo with ID ${id} not found.`)
  }

  if (!todo.completed) {
    todo.completed = new Date()
    removeFromStack(d, id)
  } else {
    todo.completed = null
  }
}

export function addToStack(d: AppV1, id: TodoId): void {
  if (!d.stack.includes(id)) {
    d.stack.push(id)
  }
}

export function removeFromStack(d: AppV1, id: TodoId): void {
  // This is a bit roundabout because we need to make an in-place update, not
  // construct a new list (as we would with `filter`.)
  const index = d.stack.indexOf(id)
  if (index !== -1) {
    d.stack.splice(index, 1)
  }
}
