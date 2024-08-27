import type { Meta, StoryObj } from "@storybook/vue3"
import { fn } from "@storybook/test"
import TodoCompact from "@/components/TodoCompact.vue"
import type { TodoId, TodoV1 } from "@/lib/types"

const todo: TodoV1 = {
  id: "1234" as TodoId,
  title: "Test",
  completed: null,
  notes: "a brief note",
  tags: ["personal"],
  children: [],
  added: new Date(2024, 1, 1),
}

const meta = {
  tags: ["autodocs"],
  component: TodoCompact,
  args: {
    todo,
    onToggleComplete: fn(),
  },
} satisfies Meta<typeof TodoCompact>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}
