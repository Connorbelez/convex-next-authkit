import type { Meta, StoryObj } from "@storybook/react";
import { ComparableProperties } from "@/components/listing-detail/comparable-properties";
import { generateComparables } from "@/lib/mock-data/listings";

const meta: Meta<typeof ComparableProperties> = {
  title: "Listing Detail/ComparableProperties",
  component: ComparableProperties,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Comparable properties display showing similar nearby listings with prices, distances, and key features. Perfect for market analysis and valuation comparison.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-6xl p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    comparables: generateComparables("reference-property", 6),
  },
  parameters: {
    docs: {
      description: {
        story: "Standard set of 6 comparable properties with various distances and price points for market analysis.",
      },
    },
  },
};

export const ManyComparables: Story = {
  args: {
    comparables: generateComparables("busy-market", 10),
  },
  parameters: {
    docs: {
      description: {
        story: "Extensive list of 10 comparable properties showing competitive market with many similar options.",
      },
    },
  },
};

export const FewComparables: Story = {
  args: {
    comparables: generateComparables("unique-property", 3),
  },
  parameters: {
    docs: {
      description: {
        story: "Limited comparable properties in unique market - shows niche property type with few alternatives.",
      },
    },
  },
};

export const NoComparables: Story = {
  args: {
    comparables: [],
  },
  parameters: {
    docs: {
      description: {
        story: "No comparable properties available - shows empty state for unique properties or rural areas.",
      },
    },
  },
};

export const CloseProximity: Story = {
  render: () => {
    const comparables = generateComparables("dense-urban", 6);
    // Adjust to show very close properties
    comparables.forEach(comp => {
      comp.distance = parseFloat((Math.random() * 0.5 + 0.1).toFixed(1));
    });

    return <ComparableProperties comparables={comparables} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Properties in very close proximity (0.1-0.6 miles) typical of dense urban areas.",
      },
    },
  },
};

export const WiderArea: Story = {
  render: () => {
    const comparables = generateComparables("suburban-area", 6);
    // Adjust to show properties over wider area
    comparables.forEach(comp => {
      comp.distance = parseFloat((Math.random() * 3 + 1).toFixed(1));
    });

    return <ComparableProperties comparables={comparables} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Properties spread over wider area (1-4 miles) typical of suburban markets.",
      },
    },
  },
};

export const HigherPricedComparables: Story = {
  render: () => {
    const comparables = generateComparables("premium-area", 6);
    // Set all comps to be higher priced
    comparables.forEach(comp => {
      comp.financials.currentValue = 1500000 + Math.floor(Math.random() * 800000);
      comp.financials.purchasePrice = comp.financials.currentValue * 0.95;
    });

    return <ComparableProperties comparables={comparables} />;
  },
  parameters: {
    docs: {
      description: {
        story: "All comparable properties priced higher - suggests subject property may be undervalued.",
      },
    },
  },
};

export const LowerPricedComparables: Story = {
  render: () => {
    const comparables = generateComparables("value-area", 6);
    // Set all comps to be lower priced
    comparables.forEach(comp => {
      comp.financials.currentValue = 650000 + Math.floor(Math.random() * 400000);
      comp.financials.purchasePrice = comp.financials.currentValue * 1.05;
    });

    return <ComparableProperties comparables={comparables} />;
  },
  parameters: {
    docs: {
      description: {
        story: "All comparable properties priced lower - suggests subject property may be overvalued or have premium features.",
      },
    },
  },
};

export const MixedPriceRange: Story = {
  render: () => {
    const comparables = generateComparables("mixed-market", 8);
    // Create diverse price range
    comparables.forEach((comp, index) => {
      const basePrice = 1000000;
      const variation = [-300000, -150000, -75000, 0, 75000, 150000, 300000, 450000];
      comp.financials.currentValue = basePrice + variation[index];
      comp.financials.purchasePrice = comp.financials.currentValue * (0.9 + Math.random() * 0.2);
    });

    return <ComparableProperties comparables={comparables} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Wide price range among comparables showing diverse market conditions and property variations.",
      },
    },
  },
};

export const DifferentStatuses: Story = {
  render: () => {
    const comparables = generateComparables("status-mix", 6);
    // Set different property statuses
    const statuses: Array<"active" | "funded" | "closed"> = ["active", "active", "funded", "active", "closed", "active"];
    comparables.forEach((comp, index) => {
      comp.status = statuses[index];
    });

    return <ComparableProperties comparables={comparables} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Comparable properties with different statuses showing active listings, funded deals, and closed sales.",
      },
    },
  },
};

export const LuxuryMarketComparables: Story = {
  render: () => {
    const comparables = generateComparables("luxury-market", 6);
    // Set to luxury price ranges
    comparables.forEach(comp => {
      comp.financials.currentValue = 2500000 + Math.floor(Math.random() * 3000000);
      comp.financials.purchasePrice = comp.financials.currentValue * (0.85 + Math.random() * 0.25);
      // Add luxury property titles
      const luxuryTitles = [
        "Oceanfront Estate",
        "Hilltop Villa",
        "Gated Community Mansion",
        "Waterfront Property",
        "Estate Home with Pool",
        "Executive Residence"
      ];
      comp.title = luxuryTitles[comparables.indexOf(comp)];
    });

    return <ComparableProperties comparables={comparables} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Luxury market comparables with multi-million dollar valuations typical of high-end real estate.",
      },
    },
  },
};

export const StarterHomeComparables: Story = {
  render: () => {
    const comparables = generateComparables("starter-homes", 6);
    // Set to affordable price ranges
    comparables.forEach(comp => {
      comp.financials.currentValue = 250000 + Math.floor(Math.random() * 200000);
      comp.financials.purchasePrice = comp.financials.currentValue * (0.9 + Math.random() * 0.2);
      // Add starter home titles
      const starterTitles = [
        "Cozy Starter Home",
        "First-Time Buyer Special",
        "Affordable Townhouse",
        "Beginner's Dream Home",
        "Entry-Level Property",
        "Budget-Friendly House"
      ];
      comp.title = starterTitles[comparables.indexOf(comp)];
    });

    return <ComparableProperties comparables={comparables} />;
  },
  parameters: {
    docs: {
      description: {
        story: "First-time home buyer market with affordable comparable properties under $500k.",
      },
    },
  },
};