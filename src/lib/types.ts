type Brand<K, T> = K & { __brand: T }
export type TodoId = Brand<string, 'TodoId'>

export interface TodoV1 {
  id: TodoId
  title: string
  notes: string
  tags: string[]

  added: Date
  completed: Date | null

  startDate?: Date
  targetDate?: Date
  lastProgressDate?: Date

  // TODO: repetitions
  // TODO: parent/child relationships
}

export interface AppV1 {
  todos: { [id: string]: TodoV1 }
}
