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
        component: "Simple date picker component with calendar dropdown. Uses Popover and Calendar components for date selection.",
      },
    },
  },
  argTypes: {
    date: {
      control: { type: "date" },
      description: "Currently selected date",
    },
    onDateChange: {
      action: "dateChanged",
      description: "Callback when date selection changes",
    },
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text for the input button",
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
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Default DatePicker with placeholder text.",
      },
    },
  },
};

export const WithCustomPlaceholder: Story = {
  args: {
    placeholder: "Choose a date",
  },
  parameters: {
    docs: {
      description: {
        story: "DatePicker with custom placeholder text.",
      },
    },
  },
};

export const WithCustomStyling: Story = {
  args: {
    placeholder: "Select booking date",
    className: "w-full max-w-sm",
  },
  parameters: {
    docs: {
      description: {
        story: "DatePicker with custom styling classes.",
      },
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [placeholder, setPlaceholder] = useState("Select a date");

    const handleDateChange = (date?: Date) => {
      setSelectedDate(date);
      setPlaceholder(date ? date.toLocaleDateString() : "Select a date");
    };

    return (
      <div className="space-y-4">
        <DatePicker
          date={selectedDate}
          onDateChange={handleDateChange}
          placeholder={placeholder}
        />
        <div className="text-sm text-gray-600">
          {selectedDate && (
            <p>Selected: {selectedDate.toLocaleDateString()}</p>
          )}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive DatePicker with state management showing selected date.",
      },
    },
  },
};

export const PreselectedDate: Story = {
  args: {
    date: new Date("2024-12-25"),
    placeholder: "Select a date",
  },
  parameters: {
    docs: {
      description: {
        story: "DatePicker with pre-selected date.",
      },
    },
  },
};

export const WithFormLayout: Story = {
  render: () => {
    const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
    const [appointmentDate, setAppointmentDate] = useState<Date | undefined>(undefined);

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Personal Information</h3>
          <DatePicker
            date={birthDate}
            onDateChange={setBirthDate}
            placeholder="Date of birth"
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Appointment</h3>
          <DatePicker
            date={appointmentDate}
            onDateChange={setAppointmentDate}
            placeholder="Select appointment date"
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "DatePickers used in a form layout with different contexts.",
      },
    },
  },
};

export const CustomWidth: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-gray-600 mb-1">Small width (200px)</p>
        <DatePicker
          date={new Date()}
          onDateChange={() => {}}
          placeholder="Compact picker"
          className="w-[200px]"
        />
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-1">Default width (280px)</p>
        <DatePicker
          date={new Date()}
          onDateChange={() => {}}
          placeholder="Standard picker"
        />
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-1">Full width</p>
        <DatePicker
          date={new Date()}
          onDateChange={() => {}}
          placeholder="Full width picker"
          className="w-full"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "DatePickers with different width styling.",
      },
    },
  },
};