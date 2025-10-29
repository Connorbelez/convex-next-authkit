import type { Meta, StoryObj } from "@storybook/react";
import { BorderGradientIcon } from "@/components/ui/border-gradient-icon";
import { Star, Heart, ShoppingBag, Users, Zap, Trophy, Shield, Sparkles } from "lucide-react";

const meta: Meta<typeof BorderGradientIcon> = {
  title: "UI/BorderGradientIcon",
  component: BorderGradientIcon,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Icon component with animated gradient border effect. Perfect for highlighting important actions, features, or status indicators.",
      },
    },
  },
  argTypes: {
    icon: {
      control: { type: "object" },
      description: "Lucide React icon component to display",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
      description: "Size of the icon container",
    },
    gradientColors: {
      control: { type: "text" },
      description: "CSS gradient colors (e.g., 'from-blue-500 to-purple-600')",
    },
    backgroundColor: {
      control: { type: "text" },
      description: "Background color class",
    },
    iconColor: {
      control: { type: "text" },
      description: "Icon color class",
    },
    animated: {
      control: { type: "boolean" },
      description: "Enable gradient animation",
    },
    rounded: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg", "full"],
      description: "Border radius",
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: Star,
    size: "md",
    gradientColors: "from-blue-500 to-purple-600",
  },
  parameters: {
    docs: {
      description: {
        story: "Default gradient icon with star shape and blue-to-purple gradient.",
      },
    },
  },
};

export const DifferentColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <BorderGradientIcon
        icon={Heart}
        size="md"
        gradientColors="from-red-500 to-pink-600"
      />
      <BorderGradientIcon
        icon={ShoppingBag}
        size="md"
        gradientColors="from-green-500 to-emerald-600"
      />
      <BorderGradientIcon
        icon={Users}
        size="md"
        gradientColors="from-purple-500 to-indigo-600"
      />
      <BorderGradientIcon
        icon={Zap}
        size="md"
        gradientColors="from-yellow-500 to-orange-600"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Various gradient color combinations for different use cases and brand colors.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="text-center">
        <BorderGradientIcon
          icon={Trophy}
          size="sm"
          gradientColors="from-yellow-500 to-amber-600"
        />
        <p className="text-xs mt-2">Small</p>
      </div>
      <div className="text-center">
        <BorderGradientIcon
          icon={Trophy}
          size="md"
          gradientColors="from-yellow-500 to-amber-600"
        />
        <p className="text-xs mt-2">Medium</p>
      </div>
      <div className="text-center">
        <BorderGradientIcon
          icon={Trophy}
          size="lg"
          gradientColors="from-yellow-500 to-amber-600"
        />
        <p className="text-xs mt-2">Large</p>
      </div>
      <div className="text-center">
        <BorderGradientIcon
          icon={Trophy}
          size="xl"
          gradientColors="from-yellow-500 to-amber-600"
        />
        <p className="text-xs mt-2">Extra Large</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different size options from small to extra large.",
      },
    },
  },
};

export const Animated: Story = {
  args: {
    icon: Sparkles,
    size: "lg",
    gradientColors: "from-purple-500 via-pink-500 to-red-500",
    animated: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Animated gradient icon with smooth color transitions.",
      },
    },
  },
};

export const WithBackground: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <BorderGradientIcon
          icon={Shield}
          size="lg"
          gradientColors="from-blue-500 to-cyan-600"
          backgroundColor="bg-white dark:bg-gray-900"
        />
      </div>
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <BorderGradientIcon
          icon={Heart}
          size="lg"
          gradientColors="from-red-500 to-pink-600"
          backgroundColor="bg-white dark:bg-gray-900"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Icons with background colors for better visibility and contrast.",
      },
    },
  },
};

export const DifferentRoundedStyles: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <div className="text-center">
        <BorderGradientIcon
          icon={Star}
          size="md"
          gradientColors="from-blue-500 to-purple-600"
          rounded="none"
        />
        <p className="text-xs mt-2">None</p>
      </div>
      <div className="text-center">
        <BorderGradientIcon
          icon={Star}
          size="md"
          gradientColors="from-blue-500 to-purple-600"
          rounded="sm"
        />
        <p className="text-xs mt-2">Small</p>
      </div>
      <div className="text-center">
        <BorderGradientIcon
          icon={Star}
          size="md"
          gradientColors="from-blue-500 to-purple-600"
          rounded="md"
        />
        <p className="text-xs mt-2">Medium</p>
      </div>
      <div className="text-center">
        <BorderGradientIcon
          icon={Star}
          size="md"
          gradientColors="from-blue-500 to-purple-600"
          rounded="lg"
        />
        <p className="text-xs mt-2">Large</p>
      </div>
      <div className="text-center">
        <BorderGradientIcon
          icon={Star}
          size="md"
          gradientColors="from-blue-500 to-purple-600"
          rounded="full"
        />
        <p className="text-xs mt-2">Full</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different border radius options from sharp corners to fully circular.",
      },
    },
  },
};

export const CustomIconColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <BorderGradientIcon
        icon={Star}
        size="md"
        gradientColors="from-indigo-500 to-purple-600"
        iconColor="text-white"
      />
      <BorderGradientIcon
        icon={Heart}
        size="md"
        gradientColors="from-rose-500 to-pink-600"
        iconColor="text-white"
      />
      <BorderGradientIcon
        icon={Zap}
        size="md"
        gradientColors="from-amber-500 to-orange-600"
        iconColor="text-white"
      />
      <BorderGradientIcon
        icon={Shield}
        size="md"
        gradientColors="from-emerald-500 to-teal-600"
        iconColor="text-white"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Custom icon colors for different themes and visibility requirements.",
      },
    },
  },
};

export const BusinessIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Business & Professional</h3>
      <div className="flex flex-wrap gap-4">
        <BorderGradientIcon
          icon={Trophy}
          size="lg"
          gradientColors="from-yellow-500 to-amber-600"
        />
        <BorderGradientIcon
          icon={Shield}
          size="lg"
          gradientColors="from-blue-500 to-cyan-600"
        />
        <BorderGradientIcon
          icon={Users}
          size="lg"
          gradientColors="from-purple-500 to-indigo-600"
        />
      </div>

      <h3 className="text-lg font-medium">Social & Engagement</h3>
      <div className="flex flex-wrap gap-4">
        <BorderGradientIcon
          icon={Heart}
          size="lg"
          gradientColors="from-red-500 to-pink-600"
          animated={true}
        />
        <BorderGradientIcon
          icon={Star}
          size="lg"
          gradientColors="from-yellow-500 to-orange-600"
        />
        <BorderGradientIcon
          icon={Sparkles}
          size="lg"
          gradientColors="from-purple-500 via-pink-500 to-red-500"
          animated={true}
        />
      </div>

      <h3 className="text-lg font-medium">Action & Commerce</h3>
      <div className="flex flex-wrap gap-4">
        <BorderGradientIcon
          icon={ShoppingBag}
          size="lg"
          gradientColors="from-green-500 to-emerald-600"
        />
        <BorderGradientIcon
          icon={Zap}
          size="lg"
          gradientColors="from-blue-500 to-purple-600"
          animated={true}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Grouped icons showing different business use cases and categories.",
      },
    },
  },
};

export const Accessibility: Story = {
  args: {
    icon: Star,
    size: "lg",
    gradientColors: "from-blue-500 to-purple-600",
    iconColor: "text-white",
    className: "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
  },
  parameters: {
    docs: {
      description: {
        story: "Icon with accessibility features including focus states and high contrast.",
      },
    },
  },
};

export const CustomGradientComplex: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <BorderGradientIcon
        icon={Sparkles}
        size="lg"
        gradientColors="from-purple-500 via-pink-500 to-red-500"
        animated={true}
        iconColor="text-white"
      />
      <BorderGradientIcon
        icon={Zap}
        size="lg"
        gradientColors="from-blue-500 via-cyan-500 to-teal-500"
        animated={true}
        iconColor="text-white"
      />
      <BorderGradientIcon
        icon={Trophy}
        size="lg"
        gradientColors="from-yellow-500 via-amber-500 to-orange-500"
        animated={true}
        iconColor="text-white"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Complex multi-color gradients with three color stops for advanced visual effects.",
      },
    },
  },
};