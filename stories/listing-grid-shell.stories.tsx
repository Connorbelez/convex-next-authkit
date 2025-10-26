import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import { Horizontal } from "@/components/listing-card-horizontal";
import { ListingGridShell } from "@/components/ListingGridShell";
import type { WithLatLng } from "@/hooks/use-filtered-listings";

const meta = {
  title: "Listings/ListingGridShell",
  component: ListingGridShell,
} satisfies Meta<typeof ListingGridShell<MockListing>>;

export default meta;

type Story = StoryObj<typeof meta>;

interface MockListing extends WithLatLng {
  id: string;
  title: string;
  address: string;
  ltv: number;
  apr: number;
  principal: number;
  imageSrc: string;
}

const mockListings: MockListing[] = [
  {
    id: "1",
    title: "Malibu Beach Detached",
    address: "Malibu, CA",
    ltv: 80,
    apr: 9.5,
    principal: 350000,
    lat: 34.0259,
    lng: -118.7798,
    imageSrc: "/house.jpg",
  },
  {
    id: "2",
    title: "Downtown Loft",
    address: "Los Angeles, CA",
    ltv: 75,
    apr: 8.1,
    principal: 425000,
    lat: 34.0407,
    lng: -118.2468,
    imageSrc: "/house.jpg",
  },
  {
    id: "3",
    title: "Santa Monica Townhome",
    address: "Santa Monica, CA",
    ltv: 68,
    apr: 7.9,
    principal: 515000,
    lat: 34.0195,
    lng: -118.4912,
    imageSrc: "/house.jpg",
  },
  {
    id: "4",
    title: "Venice Beach Bungalow",
    address: "Venice, CA",
    ltv: 72,
    apr: 8.7,
    principal: 390000,
    lat: 33.9851,
    lng: -118.4695,
    imageSrc: "/house.jpg",
  },
];

const renderCard = (item: WithLatLng) => (
  <Horizontal key={(item as MockListing).id} />
);

const renderPopup = (item: WithLatLng) => {
  const listing = item as MockListing;
  return (
    <div className="space-y-1 text-sm">
      <div className="font-semibold">{listing.title}</div>
      <div className="text-muted-foreground">{listing.address}</div>
      <div>LTV: {listing.ltv}%</div>
      <div>APR: {listing.apr}%</div>
      <div>${listing.principal.toLocaleString()} principal</div>
    </div>
  );
};

export const Default: Story = {
  args: {
    items: mockListings,
    renderCard,
    renderMapPopup: renderPopup,
  },
};

export const DenseGrid: Story = {
  args: {
    items: [...mockListings, ...mockListings.map((item, index) => ({
      ...item,
      id: `${item.id}-copy-${index}`,
      lat: item.lat + 0.05 * (index + 1),
      lng: item.lng + 0.05 * (index + 1),
    }))],
    renderCard,
    renderMapPopup: renderPopup,
  },
};

export const CustomLayout: Story = {
  args: {
    items: mockListings,
    renderCard,
    renderMapPopup: renderPopup,
    classNames: {
      container: "grid gap-2 md:grid-cols-[2fr_1fr]",
      gridColumn: "space-y-2",
      mapWrapper: "sticky top-16 h-[600px]",
    },
  },
};
