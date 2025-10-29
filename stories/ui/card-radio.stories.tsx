import type { Meta, StoryObj } from "@storybook/react";
import CardRadio from "@/components/ui/card-radio";

const meta: Meta<typeof CardRadio> = {
  title: "UI/CardRadio",
  component: CardRadio,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Interactive card-based radio selection demo with animated transitions. Shows three pricing options with click-to-select functionality.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-4xl p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Default CardRadio component showing three pricing plans with interactive selection.",
      },
    },
  },
};

export const Interactive: Story = {
  render: () => <CardRadio />,
  parameters: {
    docs: {
      description: {
        story: "Interactive demo with hover effects and spring animations on selection.",
      },
    },
  },
};

export const WithCustomStyling: Story = {
  render: () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-center mb-4">Premium Plan Selection</h2>
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
        <CardRadio />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "CardRadio wrapped in custom container with additional styling.",
      },
    },
  },
};

export const CenteredLayout: Story = {
  render: () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-8">Choose Your Subscription</h2>
        <CardRadio />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "CardRadio displayed in a centered layout with custom heading.",
      },
    },
  },
};