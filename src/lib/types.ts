type Brand<K, T> = K & { __brand: T }
export type TodoId = Brand<string, 'TodoId'>

export interface OrderedTodos {
  [id: TodoId]: number
}

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

  children: OrderedTodos

  // TODO: repetitions
}

export interface AppV1 {
  todos: { [id: string]: TodoV1 }
  rootTodos: OrderedTodos
}
