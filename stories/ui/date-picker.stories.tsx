import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DatePicker } from "@/components/ui/date-picker";

const meta: Meta<typeof DatePicker> = {
  title: "UI/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Flexible date picker component with single date, range selection, and various customization options. Perfect for booking forms, scheduling, and date selection interfaces.",
      },
    },
  },
  argTypes: {
    selected: {
      control: { type: "object" },
      description: "Currently selected date(s)",
    },
    onChange: {
      action: "changed",
      description: "Callback when date selection changes",
    },
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text for the input",
    },
    format: {
      control: { type: "text" },
      description: "Date format string (e.g., 'MM/dd/yyyy', 'yyyy-MM-dd')",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable the date picker",
    },
    readonly: {
      control: { type: "boolean" },
      description: "Make the input readonly",
    },
    required: {
      control: { type: "boolean" },
      description: "Mark as required field",
    },
    error: {
      control: { type: "text" },
      description: "Error message to display",
    },
    helperText: {
      control: { type: "text" },
      description: "Helper text to display below the input",
    },
    label: {
      control: { type: "text" },
      description: "Label for the date picker",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Size of the date picker input",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "filled", "outlined"],
      description: "Input style variant",
    },
    clearable: {
      control: { type: "boolean" },
      description: "Show clear button",
    },
    calendar: {
      control: { type: "boolean" },
      description: "Show calendar dropdown",
    },
    minDate: {
      control: { type: "object" },
      description: "Minimum selectable date",
    },
    maxDate: {
      control: { type: "object" },
      description: "Maximum selectable date",
    },
    disabledDates: {
      control: { type: "array" },
      description: "Array of disabled dates",
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
    placeholder: "Select a date",
  },
  parameters: {
    docs: {
      description: {
        story: "Default date picker with placeholder text.",
      },
    },
  },
};

export const WithLabel: Story = {
  args: {
    label: "Date of Birth",
    placeholder: "MM/DD/YYYY",
  },
  parameters: {
    docs: {
      description: {
        story: "Date picker with form label.",
      },
    },
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Appointment Date",
    placeholder: "Select appointment date",
    helperText: "Please select a date at least 24 hours in advance",
  },
  parameters: {
    docs: {
      description: {
        story: "Date picker with helper text providing additional guidance.",
      },
    },
  },
};

export const WithError: Story = {
  args: {
    label: "Event Date",
    placeholder: "Select event date",
    error: "Please select a valid date",
  },
  parameters: {
    docs: {
      description: {
        story: "Date picker with error state and validation message.",
      },
    },
  },
};

export const PreselectedDate: Story = {
  render: () => {
    const [selected, setSelected] = useState(new Date("2024-12-25"));

    return (
      <DatePicker
        label="Holiday Date"
        selected={selected}
        onChange={setSelected}
        placeholder="Select holiday date"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Date picker with preselected date showing default value.",
      },
    },
  },
};

export const DateRange: Story = {
  render: () => {
    const [range, setRange] = useState({
      start: new Date("2024-12-01"),
      end: new Date("2024-12-07")
    });

    return (
      <DatePicker
        label="Booking Period"
        selected={range}
        onChange={setRange}
        placeholder="Select date range"
        range={true}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Date picker configured for range selection (start and end dates).",
      },
    },
  },
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <DatePicker
        label="Small Size"
        placeholder="Select date"
        size="sm"
      />
      <DatePicker
        label="Medium Size"
        placeholder="Select date"
        size="md"
      />
      <DatePicker
        label="Large Size"
        placeholder="Select date"
        size="lg"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Date picker in different sizes for various UI contexts.",
      },
    },
  },
};

export const DifferentVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <DatePicker
        label="Default Variant"
        placeholder="Select date"
        variant="default"
      />
      <DatePicker
        label="Filled Variant"
        placeholder="Select date"
        variant="filled"
      />
      <DatePicker
        label="Outlined Variant"
        placeholder="Select date"
        variant="outlined"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Date picker with different visual style variants.",
      },
    },
  },
};

export const WithValidation: Story = {
  render: () => {
    const [selected, setSelected] = useState<Date | null>(null);
    const [error, setError] = useState("");

    const handleChange = (date: Date | null) => {
      setSelected(date);
      if (!date) {
        setError("Date is required");
      } else if (date < new Date()) {
        setError("Date cannot be in the past");
      } else {
        setError("");
      }
    };

    return (
      <DatePicker
        label="Event Date"
        placeholder="Select event date"
        selected={selected}
        onChange={handleChange}
        error={error}
        required={true}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Date picker with real-time validation and error handling.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Date Picker",
    placeholder: "Date selection is disabled",
    disabled: true,
    selected: new Date("2024-12-25"),
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled date picker preventing user interaction.",
      },
    },
  },
};

export const Readonly: Story = {
  args: {
    label: "Readonly Date",
    placeholder: "Cannot change this date",
    readonly: true,
    selected: new Date("2024-12-25"),
  },
  parameters: {
    docs: {
      description: {
        story: "Readonly date picker displaying date without allowing changes.",
      },
    },
  },
};

export const WithMinMaxDates: Story = {
  render: () => {
    const [selected, setSelected] = useState<Date | null>(null);

    return (
      <DatePicker
        label="Travel Date"
        placeholder="Select travel date"
        selected={selected}
        onChange={setSelected}
        minDate={new Date()}
        maxDate={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)} // 1 year from now
        helperText="Select a date within the next year"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Date picker with minimum and maximum date constraints.",
      },
    },
  },
};

export const CustomFormat: Story = {
  args: {
    label: "International Date",
    placeholder: "DD/MM/YYYY",
    format: "dd/MM/yyyy",
  },
  parameters: {
    docs: {
      description: {
        story: "Date picker with custom date format for international users.",
      },
    },
  },
};

export const Clearable: Story = {
  render: () => {
    const [selected, setSelected] = useState(new Date("2024-12-25"));

    return (
      <DatePicker
        label="Flexible Date"
        placeholder="Select or clear date"
        selected={selected}
        onChange={setSelected}
        clearable={true}
        helperText="Click the clear button to remove selection"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Date picker with clear button for removing selections.",
      },
    },
  },
};

export const BookingForm: Story = {
  render: () => {
    const [checkIn, setCheckIn] = useState<Date | null>(null);
    const [checkOut, setCheckOut] = useState<Date | null>(null);

    return (
      <div className="space-y-4">
        <DatePicker
          label="Check-in Date"
          placeholder="Select check-in date"
          selected={checkIn}
          onChange={setCheckIn}
          minDate={new Date()}
          required={true}
        />
        <DatePicker
          label="Check-out Date"
          placeholder="Select check-out date"
          selected={checkOut}
          onChange={setCheckOut}
          minDate={checkIn || new Date()}
          required={true}
          disabled={!checkIn}
          helperText={!checkIn ? "Select check-in date first" : ""}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Booking form with interconnected date pickers for hotel reservations.",
      },
    },
  },
};

export const MultiDateSelection: Story = {
  render: () => {
    const [dates, setDates] = useState<Date[]>([
      new Date("2024-12-15"),
      new Date("2024-12-22"),
      new Date("2024-12-25")
    ]);

    return (
      <DatePicker
        label="Available Dates"
        placeholder="Select multiple dates"
        selected={dates}
        onChange={setDates}
        multiple={true}
        helperText="Select all available dates for this event"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Date picker supporting multiple date selection for events.",
      },
    },
  },
};

export const WeekView: Story = {
  render: () => {
    const [selected, setSelected] = useState<Date | null>(null);

    return (
      <DatePicker
        label="Select Week"
        placeholder="Choose a week"
        selected={selected}
        onChange={setSelected}
        weekView={true}
        format="'Week' WW, yyyy"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Date picker with week selection view.",
      },
    },
  },
};