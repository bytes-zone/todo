import { describe, expect, it } from "vitest"
import * as ops from "./ops"
import { next as A } from "@automerge/automerge"
import type { AppV1 } from "./types"

describe("init", () => {
  it("initial bytes match the reference type", () => {
    const bytes = A.save(A.change(A.init<AppV1>({ actor: "00" }), { time: 0 }, ops.initialize))

    expect(Array.from(bytes)).toEqual(Array.from(ops.initBytes))
  })

  it("initialize should set empty versions of all relevant fields", () => {
    const doc = {} as AppV1
    ops.initialize(doc)

    expect(doc.todos).toEqual({})
    expect(doc.rootTodos).toEqual([])
    expect(doc.stack).toEqual([])
  })
})

describe("migrate", () => {
  it("adds rootTodos if it was not present", () => {
    const doc = {} as AppV1

    ops.migrate(doc)

    expect(doc.rootTodos).toEqual([])
  })

  it("migrates stack to rootTodos", () => {
    const doc = {} as AppV1

    ops.migrate(doc)

    expect(doc.stack).toEqual([])
  })
})

describe("addTodo", () => {
  it("should add a todo", () => {
    const state = ops.testInit()

    const newId = ops.addTodo(state, "Hey there")
    const newTodo = state.todos[newId]

    expect(newTodo).toBeDefined()
    expect(newTodo.title).toBe("Hey there")
  })

  it("should add the todo to the root list", () => {
    const state = ops.testInit()

    const newId = ops.addTodo(state, "Hey there")

    expect(state.todos[newId]).toBeDefined()
    expect(state.rootTodos).toContain(newId)
  })
})

describe("completeTodo", () => {
  it("should mark a todo as complete", () => {
    const state = ops.testInit()
    const newId = ops.addTodo(state, "Hey there")

    ops.toggleComplete(state, newId)

    expect(state.todos[newId].completed).toBeDefined()
  })

  it("should mark a todo as incomplete", () => {
    const state = ops.testInit()
    const newId = ops.addTodo(state, "Hey there")

    ops.toggleComplete(state, newId)
    ops.toggleComplete(state, newId)

    expect(state.todos[newId].completed).toBeNull()
  })

  it("if the todo was on the stack, completing it removes it", () => {
    const state = ops.testInit()
    const newId = ops.addTodo(state, "Hey there")

    ops.addToStack(state, newId)
    ops.toggleComplete(state, newId)

    expect(state.stack).not.toContain(newId)
  })
})

describe("addToStack", () => {
  it("should add a todo to the stack", () => {
    const state = ops.testInit()
    const newId = ops.addTodo(state, "Hey there")

    ops.addToStack(state, newId)

    expect(state.stack).toContain(newId)
  })

  it("should add multiple todos to the stack", () => {
    const state = ops.testInit()
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
    const state = ops.testInit()
    const newId = ops.addTodo(state, "Hey there")

    ops.addToStack(state, newId)
    ops.addToStack(state, newId)

    expect(state.stack.filter((id) => id === newId)).toHaveLength(1)
  })
})

describe("removeFromStack", () => {
  it("should remove a todo from the stack", () => {
    const state = ops.testInit()
    const newId = ops.addTodo(state, "Hey there")

    ops.addToStack(state, newId)
    expect(state.stack).toContain(newId)

    ops.removeFromStack(state, newId)
    expect(state.stack).not.toContain(newId)
  })

  it("should remove the correct todo from the stack", () => {
    const state = ops.testInit()
    const id1 = ops.addTodo(state, "Todo 1")
    const id2 = ops.addTodo(state, "Todo 2")
    const id3 = ops.addTodo(state, "Todo 3")

    ops.addToStack(state, id1)
    ops.addToStack(state, id2)
    ops.addToStack(state, id3)

    ops.removeFromStack(state, id2)

    expect(state.stack).toContain(id1)
    expect(state.stack).not.toContain(id2)
    expect(state.stack).toContain(id3)
  })

  it("should not remove a todo from the stack if it is not present", () => {
    const state = ops.testInit()
    const newId = ops.addTodo(state, "Hey there")

    ops.removeFromStack(state, newId)

    expect(state.stack).not.toContain(newId)
  })
})
