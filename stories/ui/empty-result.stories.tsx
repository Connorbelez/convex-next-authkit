import type { Meta, StoryObj } from "@storybook/react";
import { EmptyResult } from "@/components/ui/empty-result";

const meta: Meta<typeof EmptyResult> = {
  title: "UI/EmptyResult",
  component: EmptyResult,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Empty state component with customizable illustrations, messages, and action buttons. Perfect for when no data is available or when users need guidance.",
      },
    },
  },
  argTypes: {
    title: {
      control: { type: "text" },
      description: "Main title text for the empty state",
    },
    description: {
      control: { type: "text" },
      description: "Descriptive text explaining the empty state",
    },
    illustration: {
      control: { type: "select" },
      options: ["search", "filter", "error", "success", "custom"],
      description: "Type of illustration to display",
    },
    actionText: {
      control: { type: "text" },
      description: "Text for the action button",
    },
    onAction: {
      action: "actionClicked",
      description: "Callback when action button is clicked",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
      description: "Size of the empty state component",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "minimal", "detailed"],
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
    title: "No results found",
    description: "We couldn't find any results matching your search criteria.",
    illustration: "search",
    actionText: "Try Again",
  },
  parameters: {
    docs: {
      description: {
        story: "Default empty state with search illustration and action button.",
      },
    },
  },
};

export const SearchEmpty: Story = {
  args: {
    title: "No results found",
    description: "Try adjusting your search terms or filters to find what you're looking for.",
    illustration: "search",
    actionText: "Clear Filters",
  },
  parameters: {
    docs: {
      description: {
        story: "Empty state for search results with clear filters action.",
      },
    },
  },
};

export const FilterEmpty: Story = {
  args: {
    title: "No items match your filters",
    description: "Remove some filters or try different criteria to see more results.",
    illustration: "filter",
    actionText: "Reset Filters",
  },
  parameters: {
    docs: {
      description: {
        story: "Empty state for filtered results with reset option.",
      },
    },
  },
};

export const ErrorEmpty: Story = {
  args: {
    title: "Something went wrong",
    description: "We encountered an error while loading your data. Please try again later.",
    illustration: "error",
    actionText: "Retry",
  },
  parameters: {
    docs: {
      description: {
        story: "Error state with retry action option.",
      },
    },
  },
};

export const SuccessEmpty: Story = {
  args: {
    title: "All set!",
    description: "You've completed all tasks. Great job!",
    illustration: "success",
    actionText: "Create New Task",
  },
  parameters: {
    docs: {
      description: {
        story: "Success empty state with completion message.",
      },
    },
  },
};

export const MinimalVariant: Story = {
  args: {
    title: "No items yet",
    description: "Start by adding your first item.",
    variant: "minimal",
    size: "sm",
  },
  parameters: {
    docs: {
      description: {
        story: "Minimal empty state with compact design.",
      },
    },
  },
};

export const DetailedVariant: Story = {
  args: {
    title: "Your shopping cart is empty",
    description: "Looks like you haven't added anything to your cart yet. Browse our products and add items you'd like to purchase.",
    illustration: "custom",
    actionText: "Start Shopping",
    variant: "detailed",
    size: "lg",
  },
  parameters: {
    docs: {
      description: {
        story: "Detailed empty state with comprehensive information.",
      },
    },
  },
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-2">Small Size</h3>
        <EmptyResult
          title="No data"
          description="Small empty state message."
          size="sm"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Medium Size</h3>
        <EmptyResult
          title="No data found"
          description="Medium empty state with more detail."
          size="md"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Large Size</h3>
        <EmptyResult
          title="No results available"
          description="Large empty state with comprehensive information and guidance."
          size="lg"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Extra Large Size</h3>
        <EmptyResult
          title="No results found"
          description="Extra large empty state with maximum visual emphasis and detailed guidance for users."
          size="xl"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different size options for various contexts.",
      },
    },
  },
};

export const NoAction: Story = {
  args: {
    title: "No notifications",
    description: "You're all caught up! Check back later for new updates.",
    illustration: "success",
  },
  parameters: {
    docs: {
      description: {
        story: "Empty state without action button for passive information.",
      },
    },
  },
};

export const CustomMessage: Story = {
  args: {
    title: "No projects yet",
    description: "Create your first project to get started with your journey. Projects help you organize and track your work efficiently.",
    illustration: "custom",
    actionText: "Create Project",
  },
  parameters: {
    docs: {
      description: {
        story: "Custom empty state with specific project creation context.",
      },
    },
  },
};

export const ECommerceEmpty: Story = {
  args: {
    title: "Your wishlist is empty",
    description: "Save items you love for later. Browse our collection and add your favorites to keep track of products you're interested in.",
    illustration: "custom",
    actionText: "Browse Products",
  },
  parameters: {
    docs: {
      description: {
        story: "E-commerce empty state for wishlist functionality.",
      },
    },
  },
};

export const DashboardEmpty: Story = {
  args: {
    title: "No data to display",
    description: "Start using the platform to see your analytics and insights here. The dashboard will populate once you have activity data.",
    illustration: "custom",
    actionText: "Get Started",
  },
  parameters: {
    docs: {
      description: {
        story: "Dashboard empty state for new users with onboarding guidance.",
      },
    },
  },
};

export const ContactEmpty: Story = {
  args: {
    title: "No contacts yet",
    description: "Add contacts to build your network. You can import contacts, add them manually, or invite people to connect with you.",
    illustration: "custom",
    actionText: "Add Contact",
  },
  parameters: {
    docs: {
      description: {
        story: "Contact management empty state with multiple options.",
      },
    },
  },
};

export const DocumentEmpty: Story = {
  args: {
    title: "No documents",
    description: "Upload or create documents to get started. You can upload files, create new documents, or import from external sources.",
    illustration: "custom",
    actionText: "Upload Document",
  },
  parameters: {
    docs: {
      description: {
        story: "Document management empty state for file organization.",
      },
    },
  },
};

export const WithMultipleActions: Story = {
  render: () => (
    <div className="space-y-4">
      <EmptyResult
        title="No items in your cart"
        description="Ready to start shopping? Add items to your cart to proceed with checkout."
        illustration="custom"
      />
      <div className="flex space-x-4 justify-center">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Browse Products
        </button>
        <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
          View Favorites
        </button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Empty state with multiple action buttons for user choice.",
      },
    },
  },
};

export const MobileOptimized: Story = {
  args: {
    title: "No data",
    description: "Pull to refresh or tap the button below to load content.",
    illustration: "search",
    actionText: "Refresh",
    size: "sm",
  },
  parameters: {
    docs: {
      description: {
        story: "Mobile-optimized empty state with compact design and refresh functionality.",
      },
    },
  },
};