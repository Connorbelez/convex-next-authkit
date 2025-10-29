import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import FilterModal from "@/components/filter-modal";

const meta: Meta<typeof FilterModal> = {
  title: "FilterModal",
  component: FilterModal,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Modal dialog for advanced filtering with organized sections, search functionality, and comprehensive filter options. Perfect for complex filter interfaces.",
      },
    },
  },
  argTypes: {
    isOpen: {
      control: { type: "boolean" },
      description: "Whether the modal is open",
    },
    filters: {
      description: "Array of filter definitions organized by section",
    },
    activeFilters: {
      description: "Currently active filter values",
    },
    onFilterChange: {
      action: "filtersChanged",
      description: "Callback when filters change",
    },
    onApply: {
      action: "applied",
      description: "Callback when filters are applied",
    },
    onReset: {
      action: "reset",
      description: "Callback when filters are reset",
    },
    onClose: {
      action: "closed",
      description: "Callback when modal is closed",
    },
    title: {
      control: { type: "text" },
      description: "Modal title",
    },
    showSearch: {
      control: { type: "boolean" },
      description: "Show search within filters",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl", "full"],
      description: "Modal size",
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-4xl p-4">
        <div className="flex justify-center">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample organized filters for modal
const sampleFilters = [
  {
    title: "Basic Filters",
    filters: [
      {
        id: "status",
        label: "Status",
        type: "checkbox",
        options: [
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
          { value: "pending", label: "Pending" },
        ],
      },
      {
        id: "priority",
        label: "Priority",
        type: "radio",
        options: [
          { value: "low", label: "Low" },
          { value: "medium", label: "Medium" },
          { value: "high", label: "High" },
          { value: "urgent", label: "Urgent" },
        ],
      },
    ],
  },
  {
    title: "Date Range",
    filters: [
      {
        id: "dateFrom",
        label: "From",
        type: "date",
      },
      {
        id: "dateTo",
        label: "To",
        type: "date",
      },
      {
        id: "quickRange",
        label: "Quick Range",
        type: "select",
        options: [
          { value: "today", label: "Today" },
          { value: "week", label: "This Week" },
          { value: "month", label: "This Month" },
          { value: "year", label: "This Year" },
        ],
      },
    ],
  },
  {
    title: "Categories",
    filters: [
      {
        id: "category",
        label: "Category",
        type: "select",
        options: [
          { value: "all", label: "All Categories" },
          { value: "technology", label: "Technology" },
          { value: "business", label: "Business" },
          { value: "design", label: "Design" },
          { value: "marketing", label: "Marketing" },
        ],
      },
      {
        id: "tags",
        label: "Tags",
        type: "checkbox",
        options: [
          { value: "urgent", label: "Urgent" },
          { value: "important", label: "Important" },
          { value: "bug", label: "Bug" },
          { value: "feature", label: "Feature" },
          { value: "enhancement", label: "Enhancement" },
        ],
      },
    ],
  },
];

export const Default: Story = {
  args: {
    isOpen: true,
    title: "Advanced Filters",
    filters: sampleFilters,
    showSearch: true,
    size: "lg",
  },
  parameters: {
    docs: {
      description: {
        story: "Default filter modal with organized sections and search functionality.",
      },
    },
  },
};

export const InteractiveModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeFilters, setActiveFilters] = useState({});

    const handleApply = () => {
      setIsOpen(false);
      console.log("Filters applied:", activeFilters);
    };

    const handleReset = () => {
      setActiveFilters({});
      console.log("Filters reset");
    };

    return (
      <div className="text-center">
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Open Filter Modal
        </button>

        <FilterModal
          isOpen={isOpen}
          title="Advanced Filters"
          filters={sampleFilters}
          activeFilters={activeFilters}
          onFilterChange={setActiveFilters}
          onApply={handleApply}
          onReset={handleReset}
          onClose={() => setIsOpen(false)}
          showSearch={true}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive filter modal that can be opened and controlled by the user.",
      },
    },
  },
};

export const WithPreselectedFilters: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    const [activeFilters, setActiveFilters] = useState({
      status: ["active"],
      category: "technology",
      tags: ["important", "feature"],
    });

    return (
      <FilterModal
        isOpen={isOpen}
        title="Filters (Pre-selected)"
        filters={sampleFilters}
        activeFilters={activeFilters}
        onFilterChange={setActiveFilters}
        onClose={() => setIsOpen(false)}
        showSearch={true}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Filter modal with pre-selected filters showing initial state.",
      },
    },
  },
};

export const DifferentSizes: Story = {
  render: () => {
    const [currentSize, setCurrentSize] = useState("lg");

    const sizes = [
      { label: "Small", value: "sm" },
      { label: "Medium", value: "md" },
      { label: "Large", value: "lg" },
      { label: "Extra Large", value: "xl" },
      { label: "Full Screen", value: "full" },
    ];

    return (
      <div className="space-y-4">
        <div className="flex space-x-2">
          {sizes.map((size) => (
            <button
              key={size.value}
              onClick={() => setCurrentSize(size.value)}
              className={`px-4 py-2 rounded-md ${
                currentSize === size.value
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {size.label}
            </button>
          ))}
        </div>

        <FilterModal
          isOpen={true}
          title={`${sizes.find(s => s.value === currentSize)?.label} Modal`}
          filters={sampleFilters}
          activeFilters={{}}
          onFilterChange={() => {}}
          size={currentSize as any}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Filter modal in different sizes to accommodate various screen sizes and use cases.",
      },
    },
  },
};

export const ECommerceFilters: Story = {
  render: () => {
    const [activeFilters, setActiveFilters] = useState({});

    const ecommerceFilters = [
      {
        title: "Product Information",
        filters: [
          {
            id: "brand",
            label: "Brand",
            type: "select",
            options: [
              { value: "apple", label: "Apple" },
              { value: "samsung", label: "Samsung" },
              { value: "sony", label: "Sony" },
              { value: "lg", label: "LG" },
            ],
          },
          {
            id: "condition",
            label: "Condition",
            type: "radio",
            options: [
              { value: "new", label: "New" },
              { value: "refurbished", label: "Refurbished" },
              { value: "used", label: "Used" },
            ],
          },
        ],
      },
      {
        title: "Pricing",
        filters: [
          {
            id: "priceRange",
            label: "Price Range",
            type: "range",
            min: 0,
            max: 5000,
            step: 50,
            marks: [
              { value: 0, label: "$0" },
              { value: 1000, label: "$1k" },
              { value: 2500, label: "$2.5k" },
              { value: 5000, label: "$5k" },
            ],
          },
          {
            id: "discount",
            label: "Discount",
            type: "checkbox",
            options: [
              { value: "10", label: "10% or more" },
              { value: "25", label: "25% or more" },
              { value: "50", label: "50% or more" },
              { value: "75", label: "75% or more" },
            ],
          },
        ],
      },
      {
        title: "Shipping & Returns",
        filters: [
          {
            id: "shipping",
            label: "Free Shipping",
            type: "toggle",
          },
          {
            id: "returns",
            label: "Free Returns",
            type: "toggle",
          },
          {
            id: "prime",
            label: "Prime Eligible",
            type: "toggle",
          },
        ],
      },
      {
        title: "Customer Reviews",
        filters: [
          {
            id: "rating",
            label: "Minimum Rating",
            type: "slider",
            min: 1,
            max: 5,
            step: 0.5,
          },
          {
            id: "reviews",
            label: "Number of Reviews",
            type: "select",
            options: [
              { value: "any", label: "Any" },
              { value: "10+", label: "10+ Reviews" },
              { value: "50+", label: "50+ Reviews" },
              { value: "100+", label: "100+ Reviews" },
            ],
          },
        ],
      },
    ];

    return (
      <FilterModal
        isOpen={true}
        title="Product Filters"
        filters={ecommerceFilters}
        activeFilters={activeFilters}
        onFilterChange={setActiveFilters}
        size="xl"
        showSearch={true}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "E-commerce filter modal with product-specific categories and pricing filters.",
      },
    },
  },
};

export const JobSearchFilters: Story = {
  render: () => {
    const [activeFilters, setActiveFilters] = useState({});

    const jobFilters = [
      {
        title: "Job Details",
        filters: [
          {
            id: "jobType",
            label: "Employment Type",
            type: "checkbox",
            options: [
              { value: "full-time", label: "Full-time" },
              { value: "part-time", label: "Part-time" },
              { value: "contract", label: "Contract" },
              { value: "temporary", label: "Temporary" },
              { value: "internship", label: "Internship" },
            ],
          },
          {
            id: "experience",
            label: "Experience Level",
            type: "radio",
            options: [
              { value: "entry", label: "Entry Level (0-2 years)" },
              { value: "associate", label: "Associate (2-5 years)" },
              { value: "mid", label: "Mid-Level (5-10 years)" },
              { value: "senior", label: "Senior (10+ years)" },
              { value: "executive", label: "Executive (15+ years)" },
            ],
          },
          {
            id: "remote",
            label: "Remote Work",
            type: "toggle",
          },
        ],
      },
      {
        title: "Compensation",
        filters: [
          {
            id: "salaryType",
            label: "Salary Type",
            type: "radio",
            options: [
              { value: "annual", label: "Annual Salary" },
              { value: "hourly", label: "Hourly Rate" },
              { value: "project", label: "Project-Based" },
            ],
          },
          {
            id: "salaryRange",
            label: "Salary Range",
            type: "select",
            options: [
              { value: "0-30k", label: "$0 - $30,000" },
              { value: "30k-60k", label: "$30,000 - $60,000" },
              {value: "60k-90k", label: "$60,000 - $90,000" },
              { value: "90k-120k", label: "$90,000 - $120,000" },
              {value: "120k+", label: "$120,000+" },
            ],
          },
          {
            id: "equity",
            label: "Equity/Stock Options",
            type: "toggle",
          },
        ],
      },
      {
        title: "Company",
        filters: [
          {
            id: "companySize",
            label: "Company Size",
            type: "select",
            options: [
              { value: "startup", label: "Startup (1-10)" },
              { value: "small", label: "Small (11-50)" },
              { value: "medium", label: "Medium (51-200)" },
              { value: "large", label: "Large (201-1000)" },
              {value: "enterprise", label: "Enterprise (1000+)" },
            ],
          },
          {
            id: "industry",
            label: "Industry",
            type: "select",
            options: [
              { value: "technology", label: "Technology" },
              { value: "healthcare", label: "Healthcare" },
              {value: "finance", label: "Finance" },
              { value: "education", label: "Education" },
              {value: "retail", label: "Retail" },
            ],
          },
        ],
      },
    ];

    return (
      <FilterModal
        isOpen={true}
        title="Job Filters"
        filters={jobFilters}
        activeFilters={activeFilters}
        onFilterChange={setActiveFilters}
        size="lg"
        showSearch={true}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Job search filter modal with employment type, compensation, and company filters.",
      },
    },
  },
};

export const MinimalModal: Story = {
  args: {
    isOpen: true,
    title: "Quick Filters",
    filters: [
      {
        title: "Status",
        filters: [
          {
            id: "status",
            label: "Status",
            type: "checkbox",
            options: [
              { value: "active", label: "Active" },
              { value: "completed", label: "Completed" },
              { value: "archived", label: "Archived" },
            ],
          },
        ],
      },
    ],
    size: "md",
    showSearch: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Minimal filter modal with essential filters only.",
      },
    },
  },
};

export const WithoutSearch: Story = {
  args: {
    isOpen: true,
    title: "Filters",
    filters: sampleFilters,
    showSearch: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Filter modal without search functionality for simpler interfaces.",
      },
    },
  },
};