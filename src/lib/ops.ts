import { uuid } from "@automerge/automerge/slim"
import { type AppV1, type TodoId } from "./types"

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
