import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Tour } from "@/components/ui/tour";

const meta: Meta<typeof Tour> = {
  title: "UI/Tour",
  component: Tour,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Interactive tour component with step-by-step guidance, tooltips, and progress indicators. Perfect for onboarding new users or highlighting features.",
      },
    },
  },
  argTypes: {
    steps: {
      description: "Array of tour steps with content and positioning",
    },
    isOpen: {
      control: { type: "boolean" },
      description: "Whether the tour is currently open",
    },
    currentStep: {
      control: { type: "number" },
      description: "Currently active step index",
    },
    onStepChange: {
      action: "stepChanged",
      description: "Callback when step changes",
    },
    onComplete: {
      action: "completed",
      description: "Callback when tour is completed",
    },
    onSkip: {
      action: "skipped",
      description: "Callback when tour is skipped",
    },
    onClose: {
      action: "closed",
      description: "Callback when tour is closed",
    },
    showProgress: {
      control: { type: "boolean" },
      description: "Show progress indicator",
    },
    showSkip: {
      control: { type: "boolean" },
      description: "Show skip button",
    },
    showBack: {
      control: { type: "boolean" },
      description: "Show back button",
    },
    position: {
      control: { type: "select" },
      options: ["top", "bottom", "left", "right", "center"],
      description: "Default positioning for tour tooltips",
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-4xl p-8">
        <div className="relative min-h-[400px] bg-gray-50 dark:bg-gray-900 rounded-lg p-8">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample tour steps
const sampleSteps = [
  {
    id: "welcome",
    title: "Welcome to Our Platform",
    content: "Let's take a quick tour to help you get started with all the amazing features we have to offer.",
    target: "#welcome-button",
    position: "bottom" as const,
  },
  {
    id: "dashboard",
    title: "Your Dashboard",
    content: "This is your personalized dashboard where you can see all your important information at a glance.",
    target: "#dashboard-area",
    position: "right" as const,
  },
  {
    id: "navigation",
    title: "Navigation Menu",
    content: "Use this menu to navigate between different sections of the application.",
    target: "#nav-menu",
    position: "bottom" as const,
  },
  {
    id: "profile",
    title: "Profile Settings",
    content: "Manage your account settings, preferences, and personal information here.",
    target: "#profile-button",
    position: "left" as const,
  },
];

export const Default: Story = {
  args: {
    steps: sampleSteps,
    isOpen: true,
    currentStep: 0,
    showProgress: true,
    showSkip: true,
    showBack: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Default tour with progress indicators and navigation controls.",
      },
    },
  },
};

export const InteractiveTour: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const handleStepChange = (step: number) => {
      setCurrentStep(step);
    };

    const handleComplete = () => {
      setIsOpen(false);
      console.log("Tour completed!");
    };

    const handleSkip = () => {
      setIsOpen(false);
      console.log("Tour skipped!");
    };

    return (
      <div className="text-center">
        <button
          id="start-tour-btn"
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Start Interactive Tour
        </button>

        <div id="dashboard-area" className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg">
          <h3 className="text-lg font-semibold">Dashboard Area</h3>
          <p className="text-gray-600 dark:text-gray-400">This area would be highlighted in the tour.</p>
        </div>

        <Tour
          steps={sampleSteps}
          isOpen={isOpen}
          currentStep={currentStep}
          onStepChange={handleStepChange}
          onComplete={handleComplete}
          onSkip={handleSkip}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive tour that can be started and controlled by the user.",
      },
    },
  },
};

export const OnboardingTour: Story = {
  args: {
    steps: [
      {
        id: "getting-started",
        title: "Getting Started",
        content: "Welcome! This quick tour will help you understand the basics of using our platform effectively.",
        position: "center" as const,
      },
      {
        id: "create-first",
        title: "Create Your First Project",
        content: "Click here to create your first project. Projects help you organize your work and collaborate with others.",
        position: "bottom" as const,
      },
      {
        id: "invite-team",
        title: "Invite Team Members",
        content: "Collaboration is key! Invite your team members to work together on projects.",
        position: "right" as const,
      },
      {
        id: "explore",
        title: "Explore Features",
        content: "Take some time to explore all the features available to you. There's a lot to discover!",
        position: "left" as const,
      },
    ],
    isOpen: true,
    currentStep: 0,
    showProgress: true,
    showSkip: true,
    showBack: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Onboarding tour designed for new users with step-by-step guidance.",
      },
    },
  },
};

export const FeatureHighlight: Story = {
  args: {
    steps: [
      {
        id: "analytics",
        title: "Advanced Analytics",
        content: "Track performance, user engagement, and key metrics with our comprehensive analytics dashboard.",
        position: "bottom" as const,
      },
      {
        id: "automation",
        title: "Workflow Automation",
        content: "Automate repetitive tasks and create powerful workflows to save time and reduce errors.",
        position: "top" as const,
      },
    ],
    isOpen: true,
    currentStep: 0,
    showProgress: false,
    showSkip: true,
    showBack: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Feature highlighting tour showcasing specific capabilities.",
      },
    },
  },
};

export const MultiStepTour: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isOpen, setIsOpen] = useState(true);

    const steps = [
      {
        id: "step1",
        title: "Step 1: Overview",
        content: "First, let's understand the main layout and navigation structure of the application.",
        position: "bottom" as const,
      },
      {
        id: "step2",
        title: "Step 2: Core Features",
        content: "Now let's explore the core features that you'll use most frequently in your daily work.",
        position: "right" as const,
      },
      {
        id: "step3",
        title: "Step 3: Advanced Options",
        content: "Discover advanced options and customization features that enhance your experience.",
        position: "left" as const,
      },
      {
        id: "step4",
        title: "Step 4: Best Practices",
        content: "Learn about best practices and tips to get the most out of the platform.",
        position: "top" as const,
      },
      {
        id: "step5",
        title: "Step 5: Next Steps",
        content: "You're all set! Here are some recommended next steps to continue your journey.",
        position: "center" as const,
      },
    ];

    return (
      <Tour
        steps={steps}
        isOpen={isOpen}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        onComplete={() => setIsOpen(false)}
        showProgress={true}
        showSkip={false}
        showBack={true}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Multi-step comprehensive tour with detailed guidance.",
      },
    },
  },
};

export const MinimalTour: Story = {
  args: {
    steps: [
      {
        id: "quick-tip",
        title: "Quick Tip",
        content: "Press '?' anywhere to access help and documentation.",
        position: "top" as const,
      },
    ],
    isOpen: true,
    currentStep: 0,
    showProgress: false,
    showSkip: true,
    showBack: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Minimal tour with single step and simplified controls.",
      },
    },
  },
};

export const DifferentPositions: Story = {
  render: () => {
    const [position, setPosition] = useState("bottom");

    const positions = ["top", "bottom", "left", "right", "center"] as const;

    return (
      <div className="space-y-4">
        <div className="flex space-x-2">
          {positions.map((pos) => (
            <button
              key={pos}
              onClick={() => setPosition(pos)}
              className={`px-4 py-2 rounded-md ${
                position === pos
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {pos.charAt(0).toUpperCase() + pos.slice(1)}
            </button>
          ))}
        </div>

        <Tour
          steps={[
            {
              id: "position-demo",
              title: "Position Demo",
              content: `This tour step is positioned at the ${position}. Try different positions to see how it works.`,
              position: position,
            },
          ]}
          isOpen={true}
          currentStep={0}
          showProgress={false}
          showSkip={true}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Tour with configurable positioning to test different tooltip placements.",
      },
    },
  },
};

export const CustomStyling: Story = {
  args: {
    steps: [
      {
        id: "custom-style",
        title: "Custom Styled Tour",
        content: "This tour features custom styling to match your brand and design requirements.",
        position: "bottom" as const,
        className: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
      },
    ],
    isOpen: true,
    currentStep: 0,
    className: "bg-white border-2 border-purple-500 rounded-xl shadow-2xl",
  },
  parameters: {
    docs: {
      description: {
        story: "Tour with custom styling and branding.",
      },
    },
  },
};

export const ProductTour: Story = {
  args: {
    steps: [
      {
        id: "product-overview",
        title: "Product Overview",
        content: "Learn about our product's key features and benefits that will help you achieve your goals.",
        position: "bottom" as const,
      },
      {
        id: "key-feature-1",
        title: "Smart Analytics",
        content: "Get insights and recommendations based on your data with our AI-powered analytics engine.",
        position: "right" as const,
      },
      {
        id: "key-feature-2",
        title: "Real-time Collaboration",
        content: "Work together with your team in real-time, no matter where you are located.",
        position: "left" as const,
      },
      {
        id: "key-feature-3",
        title: "Enterprise Security",
        content: "Your data is protected with enterprise-grade security and compliance.",
        position: "top" as const,
      },
    ],
    isOpen: true,
    currentStep: 0,
    showProgress: true,
    showSkip: true,
    showBack: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Product-focused tour highlighting key selling points and features.",
      },
    },
  },
};

export const ContextualTour: Story = {
  render: () => {
    const [context, setContext] = useState("beginner");

    return (
      <div className="space-y-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setContext("beginner")}
            className={`px-4 py-2 rounded-md ${
              context === "beginner"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Beginner
          </button>
          <button
            onClick={() => setContext("intermediate")}
            className={`px-4 py-2 rounded-md ${
              context === "intermediate"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Intermediate
          </button>
          <button
            onClick={() => setContext("advanced")}
            className={`px-4 py-2 rounded-md ${
              context === "advanced"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Advanced
          </button>
        </div>

        <Tour
          steps={
            context === "beginner"
              ? [
                  {
                    id: "beginner-1",
                    title: "Getting Started",
                    content: "Welcome! Let's cover the basics to get you up and running quickly.",
                    position: "bottom" as const,
                  },
                ]
              : context === "intermediate"
              ? [
                  {
                    id: "intermediate-1",
                    title: "Intermediate Features",
                    content: "Let's explore some intermediate features to enhance your workflow.",
                    position: "right" as const,
                  },
                ]
              : [
                  {
                    id: "advanced-1",
                    title: "Advanced Features",
                    content: "Discover advanced features for power users and complex workflows.",
                    position: "left" as const,
                  },
                ]
          }
          isOpen={true}
          currentStep={0}
          showProgress={false}
          showSkip={true}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Contextual tour that changes content based on user skill level.",
      },
    },
  },
};