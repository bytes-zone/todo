import type { Meta, StoryObj } from "@storybook/vue3"
import { within } from "@storybook/test"
import StackBuilder from "@/components/StackBuilder.vue"
import { addTodo, init } from "@/lib/ops"

const doc = init()

const titles = ["Clean the carpets", "Install the new warp core", "World domination"]
titles.forEach((title) => addTodo(doc, title))

const meta = {
  tags: ["autodocs"],
  component: StackBuilder,
  args: { doc },
} satisfies Meta<typeof StackBuilder>

export default meta

type Story = StoryObj<typeof meta>

export const Initial: Story = {}

export const OneYes: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    ;(await canvas.findByRole("button", { name: "Yes" })).click()
  },
}

export const OneNo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    ;(await canvas.findByRole("button", { name: "No" })).click()
  },
}

export const Final: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const yesButton = await canvas.findByRole("button", { name: "Yes" })
    const noButton = await canvas.findByRole("button", { name: "No" })

    await yesButton.click()
    await noButton.click()
    await yesButton.click()
  },
}
