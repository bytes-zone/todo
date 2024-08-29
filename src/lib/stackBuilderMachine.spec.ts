import { describe, expect, it, vi } from "vitest"
import { init, addTodo, toggleComplete, addToStack } from "./ops"
import { eligibleTodos, stackBuilderMachine, startingIndex } from "./stackBuilderMachine"
import { createActor } from "xstate"

describe("eligibleTodos", () => {
  it("should be empty if there are no todos", () => {
    expect(eligibleTodos(init())).toEqual([])
  })

  it("should include incomplete root todos without children", () => {
    const doc = init()
    const newId = addTodo(doc, "Hello!")

    expect(eligibleTodos(doc)).toEqual([newId])
  })

  it("should not include complete root todos", () => {
    const doc = init()
    const newId = addTodo(doc, "Hello!")
    toggleComplete(doc, newId)

    expect(eligibleTodos(doc)).toEqual([])
  })
})

describe("startingIndex", () => {
  it("should be -1 if there are no todos", () => {
    expect(startingIndex(init(), [])).toEqual(-1)
  })

  it("should be -1 if there are no eligible todos", () => {
    const doc = init()
    const newId = addTodo(doc, "Hello!")
    toggleComplete(doc, newId)

    expect(startingIndex(doc, [])).toEqual(-1)
  })

  it("should be the highest index if the stack is empty", () => {
    const doc = init()
    const newId = addTodo(doc, "Hello!")

    expect(startingIndex(doc, [newId])).toEqual(0)
  })

  it("should be the lowest index of a stack item if the stack is not empty", () => {
    const doc = init()
    const a = addTodo(doc, "A")
    const b = addTodo(doc, "B")
    const c = addTodo(doc, "C")
    addToStack(doc, c)

    expect(startingIndex(doc, [a, b, c])).toEqual(1)
  })
})

describe("stackBuilderMachine", () => {
  it("should start in done if the doc is empty", () => {
    const doc = init()
    const machine = createActor(stackBuilderMachine, { input: doc })

    expect(machine.getSnapshot().value).toEqual("done")
  })

  it("should start in reviewing if the doc has more than one todo", () => {
    const doc = init()
    addTodo(doc, "A")
    addTodo(doc, "B")

    const machine = createActor(stackBuilderMachine, { input: doc })
    machine.start()

    expect(machine.getSnapshot().value).toEqual("reviewing")
  })

  it("should automatically select the oldest todo if there are none selected", () => {
    const doc = init()
    const id = addTodo(doc, "A")

    const machine = createActor(stackBuilderMachine, { input: doc })
    machine.start()

    expect(machine.getSnapshot().context.selected).toEqual([id])
    expect(machine.getSnapshot().context.index).toEqual(-1)
  })

  it("should emit a message that it has automatically accepted a todo", () => {
    const doc = init()
    const id = addTodo(doc, "A")

    const machine = createActor(stackBuilderMachine, { input: doc })

    const spy = vi.fn()
    machine.on("addToStack", spy)

    machine.start()

    expect(spy).toHaveBeenCalledWith({ type: "addToStack", id })
  })

  it("should add to the accepted todos if the answer is 'yes'", async () => {
    const doc = init()
    const id1 = addTodo(doc, "A")
    const id2 = addTodo(doc, "B")

    const machine = createActor(stackBuilderMachine, { input: doc })
    machine.start()

    machine.send({ type: "review", result: "yes" })

    expect(machine.getSnapshot().context.selected).toEqual([id2, id1])
  })

  it("reviewing should advance the index", async () => {
    const doc = init()
    addTodo(doc, "A")
    addTodo(doc, "B")

    const machine = createActor(stackBuilderMachine, { input: doc })
    machine.start()
    const before = machine.getSnapshot().context.index

    machine.send({ type: "review", result: "yes" })

    expect(machine.getSnapshot().context.index).toEqual(before - 1)
  })

  it("should transition to done if there are no more todos", async () => {
    const doc = init()
    addTodo(doc, "A")

    const machine = createActor(stackBuilderMachine, { input: doc })
    machine.start()

    machine.send({ type: "review", result: "yes" })

    expect(machine.getSnapshot().value).toEqual("done")
  })

  it("providing a new document will reset to reviewing if we were done", async () => {
    const doc = init()
    addTodo(doc, "A")
    addTodo(doc, "B")

    const machine = createActor(stackBuilderMachine, { input: doc })
    machine.start()

    machine.send({ type: "review", result: "yes" })
    machine.send({ type: "newDoc", doc })

    expect(machine.getSnapshot().value).toEqual("reviewing")
  })

  it("updates eligible todos when a new document is provided", async () => {
    const doc = init()
    const aId = addTodo(doc, "A")

    const machine = createActor(stackBuilderMachine, { input: doc })
    machine.start()

    expect(machine.getSnapshot().context.eligible).toEqual([aId])

    const bId = addTodo(doc, "B")
    machine.send({ type: "newDoc", doc })

    expect(machine.getSnapshot().context.eligible).toEqual([aId, bId])
  })
})
