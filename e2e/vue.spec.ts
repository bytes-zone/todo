import { test, expect } from '@playwright/test'
import { createMachine } from 'xstate'
import { createTestModel } from '@xstate/graph'

const machine = createMachine({
  initial: 'init',
  states: {
    init: {
      on: {
        load: 'loaded'
      }
    },
    loaded: {
      on: {
        addTodos: 'withTodos'
      }
    },
    withTodos: {}
  }
})

const testModel = createTestModel(machine)

const testTodos = ['Clean the carpets', 'Install the new warp core', 'World domination']

testModel.getShortestPaths().forEach((path) => {
  test(`${path.description}`, async ({ page }) => {
    await path.test({
      states: {
        init: () => {},
        loaded: async () => {
          await expect(page.getByText('Add')).toBeVisible()
        },
        withTodos: async () => {
          for (const todo of testTodos) {
            await expect(page.getByText(todo)).toBeVisible()
          }
        },
        '*': (state) => {
          throw new Error(`Unimplemented: ${state.value}`)
        }
      },
      events: {
        load: async () => await page.goto('/'),
        addTodos: async () => {
          const form = page.locator('form')

          for (const todo of testTodos) {
            await form.getByLabel('New Todo').fill(todo)
            await form.getByRole('button', { name: 'Add' }).click()
          }
        }
      }
    })
  })
})
