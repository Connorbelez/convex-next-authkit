import type { Meta, StoryObj } from "@storybook/react";
import { Horizontal } from "@/components/listing-card-horizontal";
import { Card, Chip, Button } from "@heroui/react";
import { Badge } from "@/components/ui/badge";
import { PercentCircle } from "lucide-react";
import { Icon } from "@iconify/react";

const meta: Meta<typeof Horizontal> = {
  title: "Components/ListingCardHorizontal",
  component: Horizontal,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A horizontal listing card featuring product image, title, description, pricing, availability, and action button. Perfect for e-commerce product displays, rental listings, or service offerings.",
      },
    },
  },

  decorators: [
    (Story) => (
      <div className="w-full max-w-4xl p-4 flex justify-center">
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
        story:
          "Default horizontal listing card showing Porsche 911 Golden Edition with all standard features.",
      },
    },
  },
};

export const CustomProduct: Story = {
  args: {},
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
            <span className="text-foreground/50 text-xs">01/01/2026</span>
          </div>
          <Button variant="secondary">View details</Button>
        </Card.Footer>
      </div>
    </Card.Root>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Custom product listing featuring a luxury watch with different pricing and availability.",
      },
    },
  },
};

export const HighPriceItem: Story = {
  args: {},
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
          <span>80% LTV</span>
          <span>9.5% IR</span>
          <span>$300k Loan</span>
        </Card.Content>
        <Card.Footer className="mt-auto flex w-full flex-row items-center justify-between">
          <div className="flex flex-col">
            <span
              aria-label="Principal loan: 350,000 US dollars"
              className="text-foreground text-sm font-medium"
            >
              Maturity
            </span>
            <span className="text-foreground/50 text-xs">01/01/2026</span>
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

export const BlurredCard: Story = {
  args: {},
  render: () => (
    <Card.Root
      variant="flat"
      className="w-full items-stretch md:flex-row hover:scale-105 hover:shadow-lg hover:shadow-black/10 transition-all duration-300"
    >
      <img
        alt="Malibu Beach Detached thumbnail"
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
          <span className="flex items-center">
            <Icon icon="lucide:percent-circle" className="h-4 w-4" />
            <span className="flex flex-col ml-2 py-1 justify-around align-middle">
              <p className="text-xs">LTV</p>
              <p className="text-sm font-bold">80</p>
            </span>
          </span>
          <span className="flex items-center">
            <Icon icon="lucide:percent-circle" className="h-4 w-4" />
            <span className="flex flex-col ml-2 py-1 justify-around align-middle">
              <p className="text-xs">APR</p>
              <p className="text-sm font-bold">9.5</p>
            </span>
          </span>
          <span className="flex items-center">
            <Icon icon="lucide:circle-dollar-sign" className="h-4 w-4" />
            <span className="flex flex-col ml-2 py-1 justify-around align-middle">
              <p className="text-xs">Principal</p>
              <p className="text-sm font-bold">350K</p>
            </span>
          </span>
        </Card.Content>
        <Card.Footer className="mt-auto flex w-full flex-row items-center justify-between">
          <div className="flex flex-col">
            <span
              aria-label="Principal loan: 350,000 US dollars"
              className="text-foreground text-sm font-medium"
            >
              Maturity
            </span>
            <span className="text-foreground/50 text-xs">01/01/2026</span>
          </div>
          <Button variant="secondary">View details</Button>
        </Card.Footer>
      </div>
    </Card.Root>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Vertical property listing card with blurred header and footer overlays, displaying location, title, and key financial metrics.",
      },
    },
  },
};

export const MobileGlassCard: Story = {
  args: {},
  render: () => (
    <Card.Root
      variant="flat"
      className="relative w-80 min-w-[320px] h-96 min-h-[384px] md:w-96 md:h-[450px] overflow-hidden rounded-2xl shadow-xl ring-1 ring-white/10"
    >
      {/* Background Image */}
      <img
        alt="Malibu Beach Detached thumbnail"
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
        loading="lazy"
        src="/house.jpg"
      />

      {/* Frosted Glass Header - Title & Location */}
      <Card.Header className="absolute top-0 left-0 right-0 z-10 gap-1 p-4 backdrop-blur-xl bg-black/30 dark:bg-black/30 border-b border-white/10 shadow-lg">
        <div className="relative w-full">
          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-lg pointer-events-none" />

          <div className="relative z-10">
            <Card.Title className="text-xl font-semibold tracking-tight text-white drop-shadow-lg line-clamp-1">
              Malibu Beach Detached
            </Card.Title>
            <Card.Description className="text-sm text-white/85 drop-shadow-md flex items-center gap-1 line-clamp-1">
              <Icon icon="lucide:map-pin" className="h-3.5 w-3.5" />
              Malibu, CA • Single Family Detached
            </Card.Description>
          </div>
        </div>
      </Card.Header>

      {/* Content area with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

      {/* Frosted Glass Footer - Maturity & Button */}
      <Card.Footer className="absolute bottom-0 left-0 right-0 z-10 p-4 backdrop-blur-xl bg-black/30 dark:bg-black/30 border-t border-white/10 shadow-lg flex-row items-center justify-between">
        <div className="relative w-full">
          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent rounded-lg pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between w-full">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white drop-shadow-md">
                Maturity
              </span>
              <span className="text-xs text-white/85 drop-shadow-sm">
                01/01/2026
              </span>
            </div>

            <Button
              variant="secondary"
              className="h-8 px-3 rounded-lg backdrop-blur-md bg-white/25 dark:bg-white/20 border border-white/30 text-white font-semibold shadow-lg hover:bg-white/35 active:scale-[0.98] transition text-xs"
            >
              View details
            </Button>
          </div>
        </div>
      </Card.Footer>
    </Card.Root>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Mobile-optimized card with frosted glass nu-morphic design. Closer-to-square aspect ratio, absolute header/footer overlays, refined typography and spacing, and improved readability using gradients and glass effects on HeroUI Card components.",
      },
    },
  },
};

export const MobileGlassCardSmall: Story = {
  args: {},
  render: () => (
    <Card.Root
      variant="flat"
      className="relative w-64 min-w-[256px] h-80 min-h-[320px] overflow-hidden rounded-2xl shadow-xl ring-1 ring-white/10"
    >
      {/* Background Image */}
      <img
        alt="Malibu Beach Detached thumbnail"
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
        loading="lazy"
        src="/house.jpg"
      />

      {/* Frosted Glass Header - Title & Location */}
      <Card.Header className="z-10 gap-1 p-3 backdrop-blur rounded-2xl bg-black/20 shadow-lg">
        <div className="relative w-full">
          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-gradient-to-b/30 from-white/10 to-transparent rounded-lg pointer-events-none" />

          <div className="relative z-10">
            <Card.Title className="text-lg font-semibold tracking-tight text-white drop-shadow-lg line-clamp-1">
              Malibu Beach Detached
            </Card.Title>
            <Card.Description className="text-xs text-white/85 drop-shadow-md flex items-center justify-start ">
              <Icon icon="lucide:map-pin" className="h-3 w-3" />
              Malibu, CA • Single Family
            </Card.Description>
          </div>
        </div>
      </Card.Header>

      {/* Content area with gradient overlay */}
      {/*<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />*/}

      {/* Frosted Glass Footer - Maturity & Button */}
      <Card.Footer className="absolute bottom-0 left-0 right-0 z-10 p-3 flex-row items-center justify-between">
        <div className="relative w-full">
          {/* Inner glow effect */}
          <div className="absolute -inset-2 backdrop-blur bg-black/20 rounded-full pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between w-full">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-white drop-shadow-md">
                Maturity
              </span>
              <span className="text-xs text-white/85 drop-shadow-sm">
                01/01/2026
              </span>
            </div>

            <Button
              variant="secondary"
              className="h-8 px-3 rounded-lg backdrop-blur-md bg-white/25 dark:bg-white/20 border border-white/30 text-white font-semibold shadow-lg hover:bg-white/35 active:scale-[0.98] transition text-xs"
            >
              View details
            </Button>
          </div>
        </div>
      </Card.Footer>
      <div className="text-muted-foreground text-sm grid grid-cols-3 gap-2 align-middle justify-center items-center">
        <span className="flex items-center">
          <Icon icon="lucide:percent-circle" className="h-4 w-4" />
          <span className="flex flex-col ml-2 py-1 justify-around align-middle">
            <p className="text-xs">LTV</p>
            <p className="text-sm font-bold">80</p>
          </span>
        </span>
        <span className="flex items-center">
          <Icon icon="lucide:percent-circle" className="h-4 w-4" />
          <span className="flex flex-col ml-2 py-1 justify-around align-middle">
            <p className="text-xs">APR</p>
            <p className="text-sm font-bold">9.5</p>
          </span>
        </span>
        <span className="flex items-center">
          <Icon icon="lucide:circle-dollar-sign" className="h-4 w-4" />
          <span className="flex flex-col ml-2 py-1 justify-around align-middle">
            <p className="text-xs">Principal</p>
            <p className="text-sm font-bold">350K</p>
          </span>
        </span>
      </div>
    </Card.Root>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Smaller mobile glass card variant for compact spaces, maintaining all styling but with reduced dimensions and typography.",
      },
    },
  },
};

export const MobileGlassCardLarge: Story = {
  args: {},
  render: () => (
    <Card.Root
      variant="flat"
      className="relative w-[400px] min-w-[400px] h-[500px] min-h-[500px] overflow-hidden rounded-2xl shadow-xl ring-1 ring-white/10"
    >
      {/* Background Image */}
      <img
        alt="Malibu Beach Detached thumbnail"
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
        loading="lazy"
        src="/house.jpg"
      />

      {/* Frosted Glass Header - Title & Location */}
      <Card.Header className="absolute top-0 left-0 right-0 z-10 gap-1 p-5 backdrop-blur-xl bg-black/30 dark:bg-black/30 border-b border-white/10 shadow-lg">
        <div className="relative w-full">
          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-lg pointer-events-none" />

          <div className="relative z-10">
            <Card.Title className="text-2xl font-semibold tracking-tight text-white drop-shadow-lg line-clamp-1">
              Malibu Beach Detached
            </Card.Title>
            <Card.Description className="text-base text-white/85 drop-shadow-md flex items-center gap-1 line-clamp-1">
              <Icon icon="lucide:map-pin" className="h-4 w-4" />
              Malibu, CA • Single Family Detached
            </Card.Description>
          </div>
        </div>
      </Card.Header>

      {/* Content area with financial metrics */}
      <div className="absolute inset-x-4 top-32 z-10">
        <div className="backdrop-blur-md bg-white/15 dark:bg-white/10 rounded-xl p-4 border border-white/20 shadow-lg">
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <Icon
                icon="lucide:percent-circle"
                className="h-5 w-5 mx-auto text-white/90 mb-1"
              />
              <p className="text-xs text-white/70">LTV</p>
              <p className="text-lg font-bold text-white drop-shadow-md">80</p>
            </div>
            <div className="text-center">
              <Icon
                icon="lucide:percent-circle"
                className="h-5 w-5 mx-auto text-white/90 mb-1"
              />
              <p className="text-xs text-white/70">APR</p>
              <p className="text-lg font-bold text-white drop-shadow-md">9.5</p>
            </div>
            <div className="text-center">
              <Icon
                icon="lucide:circle-dollar-sign"
                className="h-5 w-5 mx-auto text-white/90 mb-1"
              />
              <p className="text-xs text-white/70">Principal</p>
              <p className="text-lg font-bold text-white drop-shadow-md">
                350K
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

      {/* Frosted Glass Footer - Maturity & Button */}
      <Card.Footer className="absolute bottom-0 left-0 right-0 z-10 p-5 backdrop-blur-xl bg-black/30 dark:bg-black/30 border-t border-white/10 shadow-lg flex-row items-center justify-between">
        <div className="relative w-full">
          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent rounded-lg pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between w-full">
            <div className="flex flex-col">
              <span className="text-base font-medium text-white drop-shadow-md">
                Maturity
              </span>
              <span className="text-sm text-white/85 drop-shadow-sm">
                01/01/2026
              </span>
            </div>

            <Button
              variant="secondary"
              className="h-10 px-6 rounded-xl backdrop-blur-md bg-white/25 dark:bg-white/20 border border-white/30 text-white font-semibold shadow-lg hover:bg-white/35 active:scale-[0.98] transition"
            >
              View details
            </Button>
          </div>
        </div>
      </Card.Footer>
    </Card.Root>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Large mobile glass card variant with expanded content area, financial metrics display, and enhanced typography for premium devices and tablets.",
      },
    },
  },
};
