import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import CardRadio from "@/components/ui/card-radio";

const meta: Meta<typeof CardRadio> = {
  title: "UI/CardRadio",
  component: CardRadio,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Card-based radio button component with customizable content, styling, and selection states. Perfect for plan selection, preference settings, or any choice interface.",
      },
    },
  },
  argTypes: {
    value: {
      control: { type: "text" },
      description: "Unique value for this radio option",
    },
    selected: {
      control: { type: "boolean" },
      description: "Whether this option is currently selected",
    },
    onChange: {
      action: "changed",
      description: "Callback when selection changes",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable this option",
    },
    title: {
      control: { type: "text" },
      description: "Card title",
    },
    description: {
      control: { type: "text" },
      description: "Card description text",
    },
    price: {
      control: { type: "text" },
      description: "Price or value text",
    },
    badge: {
      control: { type: "text" },
      description: "Badge text for highlighting",
    },
    icon: {
      control: { type: "text" },
      description: "Icon name or identifier",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "bordered", "gradient", "minimal"],
      description: "Visual style variant",
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
    value: "option1",
    selected: false,
    title: "Standard Option",
    description: "This is a standard radio card option with basic styling and functionality.",
  },
  parameters: {
    docs: {
      description: {
        story: "Default card radio with standard styling.",
      },
    },
  },
};

export const SelectedState: Story = {
  args: {
    value: "selected",
    selected: true,
    title: "Selected Option",
    description: "This option is currently selected and shows the active state.",
  },
  parameters: {
    docs: {
      description: {
        story: "Card radio showing the selected/active state with visual indicators.",
      },
    },
  },
};

export const DisabledState: Story = {
  args: {
    value: "disabled",
    selected: false,
    disabled: true,
    title: "Disabled Option",
    description: "This option is disabled and cannot be selected.",
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled card radio showing inactive state with reduced opacity.",
      },
    },
  },
};

export const PricingPlans: Story = {
  render: () => {
    const [selected, setSelected] = useState("basic");

    return (
      <div className="space-y-4">
        <CardRadio
          value="basic"
          selected={selected === "basic"}
          onChange={() => setSelected("basic")}
          title="Basic Plan"
          description="Perfect for individuals and small projects"
          price="$9/month"
          badge="POPULAR"
        />
        <CardRadio
          value="pro"
          selected={selected === "pro"}
          onChange={() => setSelected("pro")}
          title="Professional Plan"
          description="Advanced features for growing teams"
          price="$29/month"
        />
        <CardRadio
          value="enterprise"
          selected={selected === "enterprise"}
          onChange={() => setSelected("enterprise")}
          title="Enterprise Plan"
          description="Custom solutions for large organizations"
          price="Custom"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive pricing plan selection with radio functionality.",
      },
    },
  },
};

export const DifferentVariants: Story = {
  render: () => {
    const [selected, setSelected] = useState("bordered");

    return (
      <div className="space-y-4">
        <CardRadio
          variant="default"
          value="default"
          selected={selected === "default"}
          onChange={() => setSelected("default")}
          title="Default Variant"
          description="Standard card radio styling"
        />
        <CardRadio
          variant="bordered"
          value="bordered"
          selected={selected === "bordered"}
          onChange={() => setSelected("bordered")}
          title="Bordered Variant"
          description="Card with emphasized border styling"
        />
        <CardRadio
          variant="gradient"
          value="gradient"
          selected={selected === "gradient"}
          onChange={() => setSelected("gradient")}
          title="Gradient Variant"
          description="Card with gradient background effect"
        />
        <CardRadio
          variant="minimal"
          value="minimal"
          selected={selected === "minimal"}
          onChange={() => setSelected("minimal")}
          title="Minimal Variant"
          description="Simple and clean card styling"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Different visual variants showing various styling approaches.",
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => {
    const [selected, setSelected] = useState("home");

    return (
      <div className="space-y-4">
        <CardRadio
          value="home"
          selected={selected === "home"}
          onChange={() => setSelected("home")}
          title="Home Plan"
          description="Residential internet package"
          price="$49/month"
          icon="home"
        />
        <CardRadio
          value="business"
          selected={selected === "business"}
          onChange={() => setSelected("business")}
          title="Business Plan"
          description="Professional internet solution"
          price="$99/month"
          icon="briefcase"
        />
        <CardRadio
          value="enterprise"
          selected={selected === "enterprise"}
          onChange={() => setSelected("enterprise")}
          title="Enterprise Plan"
          description="Large-scale infrastructure"
          price="$299/month"
          icon="building"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Card radios with icons for visual enhancement and better categorization.",
      },
    },
  },
};

export const FeatureSelection: Story = {
  render: () => {
    const [features, setFeatures] = useState<string[]>([]);

    const toggleFeature = (value: string) => {
      setFeatures(prev =>
        prev.includes(value)
          ? prev.filter(f => f !== value)
          : [...prev, value]
      );
    };

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium mb-4">Select Features:</h3>
        <CardRadio
          value="analytics"
          selected={features.includes("analytics")}
          onChange={() => toggleFeature("analytics")}
          title="Analytics Dashboard"
          description="Track user behavior and engagement metrics"
          icon="chart"
        />
        <CardRadio
          value="automation"
          selected={features.includes("automation")}
          onChange={() => toggleFeature("automation")}
          title="Workflow Automation"
          description="Automate repetitive tasks and processes"
          icon="zap"
        />
        <CardRadio
          value="collaboration"
          selected={features.includes("collaboration")}
          onChange={() => toggleFeature("collaboration")}
          title="Team Collaboration"
          description="Real-time collaboration tools and features"
          icon="users"
        />
        <CardRadio
          value="security"
          selected={features.includes("security")}
          onChange={() => toggleFeature("security")}
          title="Advanced Security"
          description="Enterprise-grade security and compliance"
          icon="shield"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Multi-select feature selection using card radio components.",
      },
    },
  },
};

export const ColorThemes: Story = {
  render: () => {
    const [selected, setSelected] = useState("blue");

    return (
      <div className="space-y-4">
        <CardRadio
          value="blue"
          selected={selected === "blue"}
          onChange={() => setSelected("blue")}
          title="Blue Theme"
          description="Professional and trustworthy blue color scheme"
          className="border-blue-500 focus:border-blue-600"
        />
        <CardRadio
          value="green"
          selected={selected === "green"}
          onChange={() => setSelected("green")}
          title="Green Theme"
          description="Natural and calming green color scheme"
          className="border-green-500 focus:border-green-600"
        />
        <CardRadio
          value="purple"
          selected={selected === "purple"}
          onChange={() => setSelected("purple")}
          title="Purple Theme"
          description="Creative and luxurious purple color scheme"
          className="border-purple-500 focus:border-purple-600"
        />
        <CardRadio
          value="orange"
          selected={selected === "orange"}
          onChange={() => setSelected("orange")}
          title="Orange Theme"
          description="Energetic and warm orange color scheme"
          className="border-orange-500 focus:border-orange-600"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Theme selection cards with different color schemes.",
      },
    },
  },
};

export const ComplexContent: Story = {
  render: () => {
    const [selected, setSelected] = useState("premium");

    return (
      <div className="space-y-4">
        <CardRadio
          value="basic"
          selected={selected === "basic"}
          onChange={() => setSelected("basic")}
          title="Basic Package"
          description="Essential features for getting started"
          price="$19/month"
          badge="BUDGET"
        >
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              5GB Storage
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Email Support
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Basic Analytics
            </div>
          </div>
        </CardRadio>

        <CardRadio
          value="premium"
          selected={selected === "premium"}
          onChange={() => setSelected("premium")}
          title="Premium Package"
          description="Complete solution for professionals"
          price="$49/month"
          badge="RECOMMENDED"
        >
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              50GB Storage
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Priority Support
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Advanced Analytics
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              API Access
            </div>
          </div>
        </CardRadio>

        <CardRadio
          value="enterprise"
          selected={selected === "enterprise"}
          onChange={() => setSelected("enterprise")}
          title="Enterprise Package"
          description="Custom solution for large organizations"
          price="Custom"
        >
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Unlimited Storage
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Dedicated Support
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Custom Integrations
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              SLA Guarantee
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
          White-Label Options
            </div>
          </div>
        </CardRadio>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Complex card content with feature lists and detailed information.",
      },
    },
  },
};

export const DisabledOptions: Story = {
  render: () => {
    const [selected, setSelected] = useState("standard");

    return (
      <div className="space-y-4">
        <CardRadio
          value="standard"
          selected={selected === "standard"}
          onChange={() => setSelected("standard")}
          title="Standard Plan"
          description="Available and ready to use"
          price="$29/month"
        />
        <CardRadio
          value="premium"
          selected={selected === "premium"}
          onChange={() => setSelected("premium")}
          title="Premium Plan"
          description="Available and ready to use"
          price="$59/month"
        />
        <CardRadio
          value="enterprise"
          selected={selected === "enterprise"}
          disabled={true}
          title="Enterprise Plan"
          description="Currently unavailable"
          price="Contact Sales"
        />
        <CardRadio
          value="custom"
          selected={selected === "custom"}
          disabled={true}
          title="Custom Plan"
          description="Coming soon"
          price="TBA"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Mix of enabled and disabled options showing various states.",
      },
    },
  },
};