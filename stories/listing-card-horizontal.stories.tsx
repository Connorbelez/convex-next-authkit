import type { Meta, StoryObj } from "@storybook/react";
import { Horizontal } from "@/components/listing-card-horizontal";
import { Card, Chip, Button } from "@heroui/react";
import { Badge } from "@/components/ui/badge";
import { PercentCircle } from "lucide-react";
import { Icon } from "@iconify/react"

const meta: Meta<typeof Horizontal> = {
  title: "Components/ListingCardHorizontal",
  component: Horizontal,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A horizontal listing card featuring product image, title, description, pricing, availability, and action button. Perfect for e-commerce product displays, rental listings, or service offerings.",
      },
    },
  },
  argTypes: {
    children: {
      control: "text",
      description: "Custom content to override the default card content",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Default horizontal listing card showing Porsche 911 Golden Edition with all standard features.",
      },
    },
  },
};

export const CustomProduct: Story = {
  render: () => (
    <Card.Root variant="flat" className="w-full items-stretch md:flex-row">
      <img
        alt="Malibu Beach Duplex thumbnail"
        className="rounded-panel pointer-events-none aspect-square w-full select-none object-cover md:max-w-[180px]"
        loading="lazy"
        src="/house.jpg"
      />
      <div className="flex flex-1 flex-col gap-3">
        <Card.Header className="gap-1">
          <Card.Title>Malibu Beach Detached</Card.Title>
          <Card.Description className="text-foreground/70">
            Malibu, CA • Single Family Detached
          </Card.Description>
        </Card.Header>
        <Card.Content className="text-muted-foreground text-sm flex flex-col align-middle justify-center items-center">
          <div className="grid grid-cols-3 gap-1">
            <Chip className="text-foreground/70 text-xs md:text-md flex">
              <Icon icon="lucide:percent" className="h-4 w-4" />
              80 LTV
            </Chip>
            <Chip className="text-foreground/70 text-xs md:text-md">
              <Icon icon="lucide:percent" className="h-4 w-4" />
              9.5 APR
            </Chip>
            <Chip className="text-foreground/70 text-xs md:text-md">
              <Icon icon="lucide:dollar-sign" className="h-4 w-4" />
              350K Loan
            </Chip>
          </div>
        </Card.Content>
        <Card.Footer className="mt-auto flex w-full flex-row items-center justify-between">
          <div className="flex flex-col">
            <span
              aria-label="Principal loan: 350,000 US dollars"
              className="text-foreground text-sm font-medium"
            >
              Maturity
            </span>
            <span className="text-foreground/50 text-xs">
              01/01/2026
            </span>
          </div>
          <Button variant="secondary">View details</Button>
        </Card.Footer>
      </div>
    </Card.Root>
  ),
  parameters: {
    docs: {
      description: {
        story: "Custom product listing featuring a luxury watch with different pricing and availability.",
      },
    },
  },
};

export const HighPriceItem: Story = {
  render: () => (
    <Card.Root variant="flat" className="w-full items-stretch md:flex-row">
      <img
        alt="Malibu Beach Duplex thumbnail"
        className="rounded-panel pointer-events-none aspect-square w-full select-none object-cover md:max-w-[180px]"
        loading="lazy"
        src="/house.jpg"
      />
      <div className="flex flex-1 flex-col gap-3">
        <Card.Header className="gap-1">
          <Card.Title>Malibu Beach Detached</Card.Title>
          <Card.Description className="text-foreground/70">
            Malibu, CA • Single Family Detached
          </Card.Description>
        </Card.Header>
        <Card.Content className="text-muted-foreground text-sm grid grid-cols-3 gap-2 align-middle justify-center items-center">
          <span>
            LTV: 80%
          </span>
          <span>
            APR: 9.5%
          </span>
          <span>
            APR: 9.5%
          </span>
        </Card.Content>
        <Card.Footer className="mt-auto flex w-full flex-row items-center justify-between">
          <div className="flex flex-col">
            <span
              aria-label="Principal loan: 350,000 US dollars"
              className="text-foreground text-sm font-medium"
            >
              $350k principal
            </span>
          </div>
          <Button variant="secondary">View details</Button>
        </Card.Footer>
      </div>
    </Card.Root>
  ),
  parameters: {
    docs: {
      description: {
        story: "High-value item with premium pricing and limited availability.",
      },
    },
  },
};

export const TechProduct: Story = {
  render: () => (
    <div className="flex w-full items-stretch md:flex-row">
      <img
        alt="Laptop Computer"
        className="rounded-panel pointer-events-none aspect-square w-full select-none object-cover md:max-w-[136px]"
        loading="lazy"
        src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop"
      />
      <div className="flex flex-1 flex-col gap-3">
        <div className="gap-1">
          <h3 className="text-xl font-semibold">Professional Gaming Laptop</h3>
          <p className="text-sm text-muted-foreground">
            Unleash your gaming potential with cutting-edge RTX graphics and Intel Core i9 processor—built for competitive performance.
          </p>
        </div>
        <div className="mt-auto flex w-full flex-row items-center justify-between">
          <div className="flex flex-col">
            <span
              aria-label="Price: 2,899 US dollars"
              className="text-foreground text-sm font-medium"
            >
              $2,899
            </span>
            <span aria-label="Available stock: 15 units" className="text-muted text-xs">
              15 available
            </span>
          </div>
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-3">
            Configure
          </button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Technology product with customizable options and good availability.",
      },
    },
  },
};

export const ServiceOffering: Story = {
  render: () => (
    <div className="flex w-full items-stretch md:flex-row">
      <img
        alt="Interior Design Service"
        className="rounded-panel pointer-events-none aspect-square w-full select-none object-cover md:max-w-[136px]"
        loading="lazy"
        src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=400&fit=crop"
      />
      <div className="flex flex-1 flex-col gap-3">
        <div className="gap-1">
          <h3 className="text-xl font-semibold">Premium Interior Design Package</h3>
          <p className="text-sm text-muted-foreground">
            Transform your living space with our complete design solution—professional consultation, 3D renderings, and full project management.
          </p>
        </div>
        <div className="mt-auto flex w-full flex-row items-center justify-between">
          <div className="flex flex-col">
            <span
              aria-label="Price: 5,500 US dollars"
              className="text-foreground text-sm font-medium"
            >
              $5,500
            </span>
            <span aria-label="Available slots: 4 openings" className="text-muted text-xs">
              4 openings
            </span>
          </div>
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-3">
            Book Consultation
          </button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Service offering with different availability metrics and call-to-action.",
      },
    },
  },
};

export const SoldOutItem: Story = {
  render: () => (
    <div className="flex w-full items-stretch md:flex-row">
      <img
        alt="Vintage Camera"
        className="rounded-panel pointer-events-none aspect-square w-full select-none object-cover md:max-w-[136px]"
        loading="lazy"
        src="https://images.unsplash.com/photo-1516035069371-29866ddc19a9?w=400&h=400&fit=crop"
      />
      <div className="flex flex-1 flex-col gap-3">
        <div className="gap-1">
          <h3 className="text-xl font-semibold">Vintage Film Camera Collection</h3>
          <p className="text-sm text-muted-foreground">
            Classic photography equipment from the golden age—authentic vintage cameras with original accessories and documentation.
          </p>
        </div>
        <div className="mt-auto flex w-full flex-row items-center justify-between">
          <div className="flex flex-col">
            <span
              aria-label="Price: 3,200 US dollars"
              className="text-foreground text-sm font-medium"
            >
              $3,200
            </span>
            <span aria-label="Available stock: 0 units" className="text-red-500 text-xs font-medium">
              Sold Out
            </span>
          </div>
          <button
            disabled
            className="bg-gray-300 text-gray-500 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-3 cursor-not-allowed"
          >
            Notify When Available
          </button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Sold out item with disabled purchase button and availability indicator.",
      },
    },
  },
};

export const LongDescription: Story = {
  render: () => (
    <div className="flex w-full items-stretch md:flex-row">
      <img
        alt="Artwork"
        className="rounded-panel pointer-events-none aspect-square w-full select-none object-cover md:max-w-[136px]"
        loading="lazy"
        src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop"
      />
      <div className="flex flex-1 flex-col gap-3">
        <div className="gap-1">
          <h3 className="text-xl font-semibold">Abstract Modern Art Canvas</h3>
          <p className="text-sm text-muted-foreground">
            This stunning contemporary piece represents the convergence of traditional artistic techniques with modern expression. Created using premium oil paints on gallery-wrapped canvas, the artwork features vibrant color gradients and dynamic brushwork that capture movement and emotion. Perfect for sophisticated living spaces, corporate environments, or art collectors seeking distinctive pieces that command attention while maintaining elegant subtlety.
          </p>
        </div>
        <div className="mt-auto flex w-full flex-row items-center justify-between">
          <div className="flex flex-col">
            <span
              aria-label="Price: 8,750 US dollars"
              className="text-foreground text-sm font-medium"
            >
              $8,750
            </span>
            <span aria-label="Available stock: 2 units" className="text-muted text-xs">
              2 available
            </span>
          </div>
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-3">
            View Details
          </button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Item with extended description to test text wrapping and layout behavior.",
      },
    },
  },
};

export const SaleItem: Story = {
  render: () => (
    <div className="flex w-full items-stretch md:flex-row">
      <div className="relative">
        <img
          alt="Designer Bag"
          className="rounded-panel pointer-events-none aspect-square w-full select-none object-cover md:max-w-[136px]"
          loading="lazy"
          src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop"
        />
        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
          -40% OFF
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <div className="gap-1">
          <h3 className="text-xl font-semibold">Designer Leather Handbag</h3>
          <p className="text-sm text-muted-foreground">
            Luxury Italian craftsmanship meets contemporary design—premium leather with gold hardware and spacious interior.
          </p>
        </div>
        <div className="mt-auto flex w-full flex-row items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span
                aria-label="Original price: 3,200 US dollars"
                className="text-gray-400 text-sm line-through"
              >
                $3,200
              </span>
              <span
                aria-label="Sale price: 1,920 US dollars"
                className="text-red-500 text-sm font-bold"
              >
                $1,920
              </span>
            </div>
            <span aria-label="Available stock: 5 units" className="text-muted text-xs">
              5 available
            </span>
          </div>
          <button className="bg-red-500 text-white hover:bg-red-600 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-3">
            Buy Now - Limited
          </button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Sale item with discount badge and original/sale price display.",
      },
    },
  },
};

export const MinimalInfo: Story = {
  render: () => (
    <div className="flex w-full items-stretch md:flex-row">
      <img
        alt="Simple Product"
        className="rounded-panel pointer-events-none aspect-square w-full select-none object-cover md:max-w-[136px]"
        loading="lazy"
        src="https://images.unsplash.com/photo-1574370224976-fc1548d7674e?w=400&h=400&fit=crop"
      />
      <div className="flex flex-1 flex-col gap-3">
        <div className="gap-1">
          <h3 className="text-xl font-semibold">Minimalist Desk Lamp</h3>
          <p className="text-sm text-muted-foreground">
            Clean design, warm light.
          </p>
        </div>
        <div className="mt-auto flex w-full flex-row items-center justify-between">
          <div className="flex flex-col">
            <span
              aria-label="Price: 89 US dollars"
              className="text-foreground text-sm font-medium"
            >
              $89
            </span>
            <span aria-label="Available stock: 50 units" className="text-muted text-xs">
              50 available
            </span>
          </div>
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-3">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Minimal information display with short description and simple pricing.",
      },
    },
  },
};

export const RentalProperty: Story = {
  render: () => (
    <div className="flex w-full items-stretch md:flex-row">
      <img
        alt="Vacation Rental"
        className="rounded-panel pointer-events-none aspect-square w-full select-none object-cover md:max-w-[136px]"
        loading="lazy"
        src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=400&fit=crop"
      />
      <div className="flex flex-1 flex-col gap-3">
        <div className="gap-1">
          <h3 className="text-xl font-semibold">Oceanview Beach House</h3>
          <p className="text-sm text-muted-foreground">
            Stunning beachfront property with panoramic ocean views—perfect for romantic getaways and family vacations.
          </p>
        </div>
        <div className="mt-auto flex w-full flex-row items-center justify-between">
          <div className="flex flex-col">
            <span
              aria-label="Price: 450 US dollars per night"
              className="text-foreground text-sm font-medium"
            >
              $450/night
            </span>
            <span aria-label="Available dates: 12 nights" className="text-muted text-xs">
              12 nights available
            </span>
          </div>
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-3">
            Book Now
          </button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Rental property with nightly pricing and availability in nights.",
      },
    },
  },
};