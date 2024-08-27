import { describe, expect, it } from "vitest"
import * as ops from "./ops"

describe("init", () => {
  it("should have todos", () => {
    expect(ops.init().todos).toEqual({})
  })

  it("should have root todos", () => {
    expect(ops.init().rootTodos).toEqual([])
  })

  it("should have the current stack", () => {
    expect(ops.init().stack).toEqual([])
  })
})

describe("addTodo", () => {
  it("should add a todo", () => {
    const state = ops.init()

    const newId = ops.addTodo(state, "Hey there")
    const newTodo = state.todos[newId]

    expect(newTodo).toBeDefined()
    expect(newTodo.title).toBe("Hey there")
  })

  it("should add the todo to the root list", () => {
    const state = ops.init()

    const newId = ops.addTodo(state, "Hey there")

    expect(state.todos[newId]).toBeDefined()
    expect(state.rootTodos).toContain(newId)
  })
})

describe("completeTodo", () => {
  it("should mark a todo as complete", () => {
    const state = ops.init()
    const newId = ops.addTodo(state, "Hey there")

    ops.toggleComplete(state, newId)

    expect(state.todos[newId].completed).toBeDefined()
  })

  it("should mark a todo as incomplete", () => {
    const state = ops.init()
    const newId = ops.addTodo(state, "Hey there")

    ops.toggleComplete(state, newId)
    ops.toggleComplete(state, newId)

    expect(state.todos[newId].completed).toBeNull()
  })
})

describe("addToStack", () => {
  it("should add a todo to the stack", () => {
    const state = ops.init()
    const newId = ops.addTodo(state, "Hey there")

    ops.addToStack(state, newId)

    expect(state.stack).toContain(newId)
  })

  it("should add multiple todos to the stack", () => {
    const state = ops.init()
    const id1 = ops.addTodo(state, "Todo 1")
    const id2 = ops.addTodo(state, "Todo 2")
    const id3 = ops.addTodo(state, "Todo 3")

    ops.addToStack(state, id1)
    ops.addToStack(state, id2)
    ops.addToStack(state, id3)

    expect(state.stack).toContain(id1)
    expect(state.stack).toContain(id2)
    expect(state.stack).toContain(id3)
  })

  it("should not add duplicate todos to the stack", () => {
    const state = ops.init()
    const newId = ops.addTodo(state, "Hey there")

    ops.addToStack(state, newId)
    ops.addToStack(state, newId)

    expect(state.stack.filter((id) => id === newId)).toHaveLength(1)
  })
})
