import type { Meta, StoryObj } from "@storybook/vue3"
import AppHeader from "@/components/AppHeader.vue"

const meta = {
  tags: ["autodocs"],
  component: AppHeader,
} satisfies Meta<typeof AppHeader>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}
