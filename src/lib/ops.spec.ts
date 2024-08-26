import { describe, expect, it } from 'vitest'
import * as ops from './ops'

describe('init', () => {
  it('should have todos', () => {
    expect(ops.init().todos).toEqual({})
  })

  it('should have root todos', () => {
    expect(ops.init().rootTodos).toEqual([])
  })
})

describe('addTodo', () => {
  it('should add a todo', () => {
    const state = ops.init()

    const newId = ops.addTodo(state, 'Hey there')
    const newTodo = state.todos[newId]

    expect(newTodo).toBeDefined()
    expect(newTodo.title).toBe('Hey there')
  })

  it('should add the todo to the root list', () => {
    const state = ops.init()

    const newId = ops.addTodo(state, 'Hey there')

    expect(state.todos[newId]).toBeDefined()
    expect(state.rootTodos).toContain(newId)
  })
})

describe('completeTodo', () => {
  it('should mark a todo as complete', () => {
    const state = ops.init()
    const newId = ops.addTodo(state, 'Hey there')

    ops.completeTodo(state, newId, true)

    expect(state.todos[newId].completed).toBeDefined()
  })

  it('should mark a todo as incomplete', () => {
    const state = ops.init()
    const newId = ops.addTodo(state, 'Hey there')

    ops.completeTodo(state, newId, true)
    ops.completeTodo(state, newId, false)

    expect(state.todos[newId].completed).toBeNull()
  })
})
