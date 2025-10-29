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
        component: "Icon component with gradient border effect. Perfect for highlighting important actions, features, or status indicators.",
      },
    },
  },
  argTypes: {
    title: {
      control: { type: "text" },
      description: "Accessibility title for the icon",
    },
    icon: {
      control: { type: "object" },
      description: "React node to display as the icon",
    },
    width: {
      control: { type: "text" },
      description: "Width of the icon container (default: 120px)",
    },
    height: {
      control: { type: "text" },
      description: "Height of the icon container (default: 120px)",
    },
    iconClassName: {
      control: { type: "text" },
      description: "Additional CSS classes for the icon",
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
    title: "Star Icon",
    icon: <Star className="h-6 w-6" />,
  },
  parameters: {
    docs: {
      description: {
        story: "Default gradient icon with star shape.",
      },
    },
  },
};

export const DifferentIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <BorderGradientIcon
        title="Heart Icon"
        icon={<Heart className="h-6 w-6" />}
      />
      <BorderGradientIcon
        title="Shopping Bag Icon"
        icon={<ShoppingBag className="h-6 w-6" />}
      />
      <BorderGradientIcon
        title="Users Icon"
        icon={<Users className="h-6 w-6" />}
      />
      <BorderGradientIcon
        title="Zap Icon"
        icon={<Zap className="h-6 w-6" />}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Various icon types for different use cases.",
      },
    },
  },
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="text-center">
        <BorderGradientIcon
          title="Small Trophy"
          icon={<Trophy className="h-4 w-4" />}
          width="80px"
          height="80px"
        />
        <p className="text-xs mt-2">Small</p>
      </div>
      <div className="text-center">
        <BorderGradientIcon
          title="Medium Trophy"
          icon={<Trophy className="h-6 w-6" />}
          width="120px"
          height="120px"
        />
        <p className="text-xs mt-2">Medium</p>
      </div>
      <div className="text-center">
        <BorderGradientIcon
          title="Large Trophy"
          icon={<Trophy className="h-8 w-8" />}
          width="160px"
          height="160px"
        />
        <p className="text-xs mt-2">Large</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different size options from small to large.",
      },
    },
  },
};

export const CustomIconColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <BorderGradientIcon
        title="Star Icon"
        icon={<Star className="h-6 w-6 text-blue-500" />}
        iconClassName="text-blue-500"
      />
      <BorderGradientIcon
        title="Heart Icon"
        icon={<Heart className="h-6 w-6 text-red-500" />}
        iconClassName="text-red-500"
      />
      <BorderGradientIcon
        title="Zap Icon"
        icon={<Zap className="h-6 w-6 text-yellow-500" />}
        iconClassName="text-yellow-500"
      />
      <BorderGradientIcon
        title="Shield Icon"
        icon={<Shield className="h-6 w-6 text-green-500" />}
        iconClassName="text-green-500"
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
          title="Trophy Icon"
          icon={<Trophy className="h-6 w-6" />}
        />
        <BorderGradientIcon
          title="Shield Icon"
          icon={<Shield className="h-6 w-6" />}
        />
        <BorderGradientIcon
          title="Users Icon"
          icon={<Users className="h-6 w-6" />}
        />
      </div>

      <h3 className="text-lg font-medium">Social & Engagement</h3>
      <div className="flex flex-wrap gap-4">
        <BorderGradientIcon
          title="Heart Icon"
          icon={<Heart className="h-6 w-6" />}
        />
        <BorderGradientIcon
          title="Star Icon"
          icon={<Star className="h-6 w-6" />}
        />
        <BorderGradientIcon
          title="Sparkles Icon"
          icon={<Sparkles className="h-6 w-6" />}
        />
      </div>

      <h3 className="text-lg font-medium">Action & Commerce</h3>
      <div className="flex flex-wrap gap-4">
        <BorderGradientIcon
          title="Shopping Bag Icon"
          icon={<ShoppingBag className="h-6 w-6" />}
        />
        <BorderGradientIcon
          title="Zap Icon"
          icon={<Zap className="h-6 w-6" />}
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

export const CustomDimensions: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <BorderGradientIcon
        title="Square Icon"
        icon={<Star className="h-6 w-6" />}
        width="100px"
        height="100px"
      />
      <BorderGradientIcon
        title="Rectangle Icon"
        icon={<Heart className="h-6 w-6" />}
        width="120px"
        height="80px"
      />
      <BorderGradientIcon
        title="Large Icon"
        icon={<Sparkles className="h-8 w-8" />}
        width="180px"
        height="180px"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Icons with custom dimensions for different layout requirements.",
      },
    },
  },
};