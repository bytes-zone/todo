import { uuid } from '@automerge/automerge'
import { type AppV1, type TodoId } from './types'

export function init(): AppV1 {
  return {
    todos: {},
    rootTodos: {}
  }
}

export function addTodo(doc: AppV1, title: string): void {
  const newId = uuid() as TodoId
  doc.todos[newId] = {
    id: newId,
    title,
    notes: '',
    tags: [],
    added: new Date(),
    completed: null,
    children: {}
  }
}
