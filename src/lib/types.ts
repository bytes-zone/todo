interface TodoV1 {
  id: string
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

interface AppV1 {
  todos: { [id: string]: TodoV1 }
}
