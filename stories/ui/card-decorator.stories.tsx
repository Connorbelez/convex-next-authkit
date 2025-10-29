import type { Meta, StoryObj } from "@storybook/react";
import { CardDecorator } from "@/components/ui/card-decorator";

const meta: Meta<typeof CardDecorator> = {
  title: "UI/CardDecorator",
  component: CardDecorator,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Decorative card wrapper with gradient borders, shadows, and visual enhancements. Perfect for highlighting important cards or creating visual hierarchy.",
      },
    },
  },
  argTypes: {
    children: {
      description: "Card content to decorate",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "gradient", "shadow", "glow", "minimal"],
      description: "Visual style variant",
    },
    gradientColors: {
      control: { type: "text" },
      description: "CSS gradient colors for border (e.g., 'from-blue-500 to-purple-600')",
    },
    animated: {
      control: { type: "boolean" },
      description: "Enable animation effects",
    },
    hover: {
      control: { type: "boolean" },
      description: "Enable hover effects",
    },
    rounded: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg", "xl", "2xl", "full"],
      description: "Border radius",
    },
    padding: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg", "xl"],
      description: "Internal padding",
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
    variant: "default",
    children: (
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Default Decorator</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Standard card decoration with subtle border and shadow effects.
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Default card decoration with standard styling.",
      },
    },
  },
};

export const Gradient: Story = {
  args: {
    variant: "gradient",
    gradientColors: "from-blue-500 to-purple-600",
    children: (
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Gradient Border</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Eye-catching gradient border perfect for featured content.
        </p>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Action Button
        </button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Card with animated gradient border effect.",
      },
    },
  },
};

export const Shadow: Story = {
  args: {
    variant: "shadow",
    children: (
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Shadow Effect</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Prominent shadow effect for depth and emphasis.
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Card with enhanced shadow effects for visual depth.",
      },
    },
  },
};

export const Glow: Story = {
  args: {
    variant: "glow",
    gradientColors: "from-purple-500 to-pink-600",
    animated: true,
    children: (
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Glow Effect</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Subtle glow effect with animation for premium feel.
        </p>
        <div className="mt-4 flex justify-center space-x-2">
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
            Featured
          </span>
          <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">
            Popular
          </span>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Card with animated glow effect for premium presentation.",
      },
    },
  },
};

export const Minimal: Story = {
  args: {
    variant: "minimal",
    children: (
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Minimal Style</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Clean and simple decoration for subtle enhancement.
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Minimal card decoration with subtle styling.",
      },
    },
  },
};

export const DifferentGradients: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4">
      <CardDecorator
        variant="gradient"
        gradientColors="from-blue-500 to-cyan-600"
        className="mb-4"
      >
        <div className="text-center">
          <h4 className="font-semibold text-blue-600">Ocean Theme</h4>
          <p className="text-sm text-gray-600 mt-1">Cool blue gradient</p>
        </div>
      </CardDecorator>

      <CardDecorator
        variant="gradient"
        gradientColors="from-red-500 to-pink-600"
        className="mb-4"
      >
        <div className="text-center">
          <h4 className="font-semibold text-red-600">Sunset Theme</h4>
          <p className="text-sm text-gray-600 mt-1">Warm red gradient</p>
        </div>
      </CardDecorator>

      <CardDecorator
        variant="gradient"
        gradientColors="from-green-500 to-emerald-600"
        className="mb-4"
      >
        <div className="text-center">
          <h4 className="font-semibold text-green-600">Forest Theme</h4>
          <p className="text-sm text-gray-600 mt-1">Natural green gradient</p>
        </div>
      </CardDecorator>

      <CardDecorator
        variant="gradient"
        gradientColors="from-purple-500 to-indigo-600"
        className="mb-4"
      >
        <div className="text-center">
          <h4 className="font-semibold text-purple-600">Galaxy Theme</h4>
          <p className="text-sm text-gray-600 mt-1">Mystic purple gradient</p>
        </div>
      </CardDecorator>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Various gradient color combinations for different themes and moods.",
      },
    },
  },
};

export const WithHoverEffects: Story = {
  args: {
    variant: "gradient",
    gradientColors: "from-indigo-500 to-purple-600",
    hover: true,
    children: (
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Interactive Card</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Hover over this card to see interactive effects.
        </p>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
          Hover Me
        </button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Card with hover effects for interactive user experience.",
      },
    },
  },
};

export const DifferentRoundedStyles: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <CardDecorator rounded="none" className="mb-4">
        <div className="text-center">
          <h4 className="font-semibold">No Radius</h4>
          <p className="text-sm text-gray-600 mt-1">Sharp corners</p>
        </div>
      </CardDecorator>

      <CardDecorator rounded="sm" className="mb-4">
        <div className="text-center">
          <h4 className="font-semibold">Small</h4>
          <p className="text-sm text-gray-600 mt-1">Slightly rounded</p>
        </div>
      </CardDecorator>

      <CardDecorator rounded="md" className="mb-4">
        <div className="text-center">
          <h4 className="font-semibold">Medium</h4>
          <p className="text-sm text-gray-600 mt-1">Standard rounding</p>
        </div>
      </CardDecorator>

      <CardDecorator rounded="lg" className="mb-4">
        <div className="text-center">
          <h4 className="font-semibold">Large</h4>
          <p className="text-sm text-gray-600 mt-1">More rounded</p>
        </div>
      </CardDecorator>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different border radius options for various design needs.",
      },
    },
  },
};

export const PricingCards: Story = {
  render: () => (
    <div className="space-y-4">
      <CardDecorator
        variant="gradient"
        gradientColors="from-gray-500 to-gray-700"
        className="text-center"
      >
        <h3 className="text-xl font-bold mb-2">Basic Plan</h3>
        <p className="text-3xl font-bold mb-4">$9<span className="text-lg font-normal">/month</span></p>
        <ul className="text-left space-y-2 text-sm">
          <li>✓ Basic features</li>
          <li>✓ 5GB storage</li>
          <li>✓ Email support</li>
        </ul>
        <button className="mt-6 w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
          Choose Basic
        </button>
      </CardDecorator>

      <CardDecorator
        variant="gradient"
        gradientColors="from-blue-500 to-purple-600"
        animated={true}
        className="text-center"
      >
        <div className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full inline-block mb-2">
          MOST POPULAR
        </div>
        <h3 className="text-xl font-bold mb-2">Pro Plan</h3>
        <p className="text-3xl font-bold mb-4">$29<span className="text-lg font-normal">/month</span></p>
        <ul className="text-left space-y-2 text-sm">
          <li>✓ All Basic features</li>
          <li>✓ 50GB storage</li>
          <li>✓ Priority support</li>
          <li>✓ Advanced analytics</li>
        </ul>
        <button className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Choose Pro
        </button>
      </CardDecorator>

      <CardDecorator
        variant="gradient"
        gradientColors="from-yellow-500 to-orange-600"
        className="text-center"
      >
        <h3 className="text-xl font-bold mb-2">Enterprise</h3>
        <p className="text-3xl font-bold mb-4">$99<span className="text-lg font-normal">/month</span></p>
        <ul className="text-left space-y-2 text-sm">
          <li>✓ All Pro features</li>
          <li>✓ Unlimited storage</li>
          <li>✓ 24/7 support</li>
          <li>✓ Custom integrations</li>
          <li>✓ SLA guarantee</li>
        </ul>
        <button className="mt-6 w-full px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
          Choose Enterprise
        </button>
      </CardDecorator>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Pricing cards with different gradients and visual hierarchy.",
      },
    },
  },
};

export const FeatureCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CardDecorator
        variant="gradient"
        gradientColors="from-blue-500 to-cyan-600"
        hover={true}
      >
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-blue-600 font-bold">1</span>
          </div>
          <div>
            <h4 className="font-semibold">Easy Setup</h4>
            <p className="text-sm text-gray-600 mt-1">Get started in minutes with our intuitive onboarding process.</p>
          </div>
        </div>
      </CardDecorator>

      <CardDecorator
        variant="gradient"
        gradientColors="from-green-500 to-emerald-600"
        hover={true}
      >
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-green-600 font-bold">2</span>
          </div>
          <div>
            <h4 className="font-semibold">Powerful Features</h4>
            <p className="text-sm text-gray-600 mt-1">Access advanced tools and capabilities for professional work.</p>
          </div>
        </div>
      </CardDecorator>

      <CardDecorator
        variant="gradient"
        gradientColors="from-purple-500 to-indigo-600"
        hover={true}
      >
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-purple-600 font-bold">3</span>
          </div>
          <div>
            <h4 className="font-semibold">Reliable Support</h4>
            <p className="text-sm text-gray-600 mt-1">Our team is here to help you succeed 24/7.</p>
          </div>
        </div>
      </CardDecorator>

      <CardDecorator
        variant="gradient"
        gradientColors="from-orange-500 to-red-600"
        hover={true}
      >
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-orange-600 font-bold">4</span>
          </div>
          <div>
            <h4 className="font-semibold">Secure & Private</h4>
            <p className="text-sm text-gray-600 mt-1">Enterprise-grade security keeps your data safe and private.</p>
          </div>
        </div>
      </CardDecorator>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Feature showcase cards with numbered steps and gradient borders.",
      },
    },
  },
};