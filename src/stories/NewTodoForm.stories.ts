import type { Meta, StoryObj } from "@storybook/vue3"
import { fn } from "@storybook/test"
import NewTodoForm from "@/components/NewTodoForm.vue"

const meta = {
  component: NewTodoForm,
  args: {
    onAddTodo: fn(),
  },
} satisfies Meta<typeof NewTodoForm>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}
