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
    withTodos: {
      on: {
        completeTodo: 'completedTodo'
      }
    },
    completedTodo: {}
  }
})

const testModel = createTestModel(machine)

const testTodos = ['Clean the carpets', 'Install the new warp core', 'World domination']
const toComplete = testTodos[0]

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
        completedTodo: async () => {
          await expect(
            page.locator('li').filter({ hasText: toComplete }).getByRole('checkbox')
          ).toBeChecked()
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
        },
        completeTodo: async () => {
          await page
            .locator('li')
            .filter({ hasText: toComplete })
            .getByLabel('Mark complete')
            .check()
        }
      }
    })
  })
})
