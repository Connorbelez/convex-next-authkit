import type { Meta, StoryObj } from "@storybook/react";
import { CardDecorator } from "@/components/ui/card-decorator";

const meta: Meta<typeof CardDecorator> = {
  title: "UI/CardDecorator",
  component: CardDecorator,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Decorative overlay component with corner accents. Perfect for adding visual emphasis to cards and containers.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "dashed", "dots", "glow"],
      description: "Visual style variant for corner decoration",
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md p-8">
        <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg border group">
          <Story />
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Card Content</h3>
            <p className="text-gray-600 dark:text-gray-400">
              This is the card content with decorative corners applied.
            </p>
          </div>
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
  },
  parameters: {
    docs: {
      description: {
        story: "Default L-shaped corner decorations with solid borders.",
      },
    },
  },
};

export const Dashed: Story = {
  args: {
    variant: "dashed",
  },
  parameters: {
    docs: {
      description: {
        story: "Dashed border corners with more prominent corner accents.",
      },
    },
  },
};

export const Dots: Story = {
  args: {
    variant: "dots",
  },
  parameters: {
    docs: {
      description: {
        story: "Decorative dot patterns in corners with gradient opacity effects.",
      },
    },
  },
};

export const Glow: Story = {
  args: {
    variant: "glow",
  },
  parameters: {
    docs: {
      description: {
        story: "Glow effect corners with hover animations and size transitions.",
      },
    },
  },
};

export const Comparison: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-center">Corner Variants</h3>
        <div className="relative bg-white dark:bg-gray-800 p-4 rounded-lg border group">
          <CardDecorator variant="default" />
          <p className="text-xs text-center">Default</p>
        </div>
        <div className="relative bg-white dark:bg-gray-800 p-4 rounded-lg border group">
          <CardDecorator variant="dashed" />
          <p className="text-xs text-center">Dashed</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-center">Pattern Variants</h3>
        <div className="relative bg-white dark:bg-gray-800 p-4 rounded-lg border group">
          <CardDecorator variant="dots" />
          <p className="text-xs text-center">Dots</p>
        </div>
        <div className="relative bg-white dark:bg-gray-800 p-4 rounded-lg border group">
          <CardDecorator variant="glow" />
          <p className="text-xs text-center">Glow</p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available variants shown together for comparison.",
      },
    },
  },
};

export const WithCustomContent: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg border group">
        <CardDecorator variant="dots" />
        <div className="text-center">
          <h4 className="font-semibold mb-2">Featured Product</h4>
          <p className="text-2xl font-bold mb-2">$29.99</p>
          <p className="text-sm text-gray-600 mb-4">Premium quality with decorative corners</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
            Add to Cart
          </button>
        </div>
      </div>

      <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg border group">
        <CardDecorator variant="glow" />
        <div className="text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-purple-600 font-bold">⭐</span>
          </div>
          <h4 className="font-semibold mb-2">Premium Feature</h4>
          <p className="text-sm text-gray-600">Enhanced with glow effect corners</p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Examples with different content types showing how decorators enhance various card designs.",
      },
    },
  },
};

export const DarkMode: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="relative bg-gray-900 p-6 rounded-lg border border-gray-700 group">
        <CardDecorator variant="default" />
        <div className="text-center">
          <h4 className="font-semibold mb-2 text-white">Dark Mode Card</h4>
          <p className="text-gray-400 text-sm">Decorators adapt to dark theme</p>
        </div>
      </div>

      <div className="relative bg-gray-900 p-6 rounded-lg border border-gray-700 group">
        <CardDecorator variant="glow" />
        <div className="text-center">
          <h4 className="font-semibold mb-2 text-white">Glow in Dark</h4>
          <p className="text-gray-400 text-sm">Enhanced visibility with glow</p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Decorators in dark mode showing proper theme adaptation.",
      },
    },
  },
};