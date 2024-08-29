import { assign, enqueueActions, setup } from "xstate"
import type { AppV1, TodoId } from "./types"

export function eligibleTodos(doc: AppV1): TodoId[] {
  return doc.rootTodos.filter((id) => {
    const todo = doc.todos[id]
    return !todo.completed
  })
}

export function startingIndex(doc: AppV1, eligible: TodoId[]): number {
  return Math.min(...doc.stack.map((id) => eligible.indexOf(id) - 1), eligible.length - 1)
}

export const stackBuilderMachine = setup({
  types: {
    context: {} as {
      index: number
      eligible: TodoId[]
      selected: TodoId[]
    },
    input: {} as AppV1,
    events: {} as { type: "review"; result: "yes" | "no" } | { type: "newDoc"; doc: AppV1 },
    emitted: {} as { type: "addToStack"; id: TodoId },
  },
  actions: {
    addToStack: enqueueActions(({ enqueue, context, event }, params: "force" | undefined) => {
      if ((event.type === "review" && event.result === "yes") || params === "force") {
        const id = context.eligible[context.index]
        enqueue.emit({ type: "addToStack", id })
        enqueue.assign({ selected: ({ context }) => [...context.selected, id] })
      }

      enqueue.assign({ index: ({ context }) => context.index - 1 })
    }),
  },
}).createMachine({
  context: ({ input }) => {
    const eligible = eligibleTodos(input)
    const index = startingIndex(input, eligible)

    return { eligible, index, selected: input.stack }
  },
  on: {
    newDoc: {
      actions: assign(({ event, context }) => {
        const eligible = eligibleTodos(event.doc)
        return {
          eligible,
          index: context.index < 0 ? startingIndex(event.doc, eligible) : context.index,
          selected: event.doc.stack,
        }
      }),
      target: ".reviewing",
    },
  },
  initial: "reviewing",
  states: {
    reviewing: {
      always: [
        {
          guard: ({ context }) => context.index < 0,
          target: "done",
        },
        {
          guard: ({ context }) => context.selected.length === 0,
          actions: {
            type: "addToStack",
            params: "force",
          },
        },
      ],
      on: {
        review: {
          actions: "addToStack",
          target: ".",
        },
      },
    },
    done: {},
  },
})
