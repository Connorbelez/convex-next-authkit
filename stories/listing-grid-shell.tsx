"use client";

import React from "react";

import { type FilterableItem } from "@/components/ListingGridShell";
import { type FilterState, DEFAULT_FILTERS } from "@/components/types/listing-filters";

// Note: This is a legacy story file that needs updating to work with current components
// For now, providing a simple placeholder

export function MapViewComponent({
  filteredListings,
}: {
  filteredListings: FilterableItem[];
}) {
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Map View Placeholder</h3>
      <p>Map component would show {filteredListings.length} listings</p>
      <div className="text-sm text-gray-600 mt-2">
        Note: This story needs to be updated with current component interfaces
      </div>
    </div>
  );
}

// Simplified placeholder story for demonstration purposes
export default function PageShell() {
  const sampleListings: FilterableItem[] = Array.from({ length: 10 }, (_, i) => ({
    id: `property-${i}`,
    ltv: 50 + Math.random() * 30,
    apr: 4 + Math.random() * 6,
    principal: 200000 + Math.random() * 800000,
    mortgageType: ["First", "Second", "Other"][Math.floor(Math.random() * 3)] as string,
    propertyType: "Single Family",
    maturityDate: new Date(Date.now() + Math.random() * 5 * 365 * 24 * 60 * 60 * 1000),
    title: `Property ${i + 1}`,
    address: `${100 + i} Main St`,
    lat: 40.7128 + (Math.random() - 0.5) * 0.1,
    lng: -74.0060 + (Math.random() - 0.5) * 0.1,
  }));

  const [filters, setFilters] = React.useState<FilterState>(DEFAULT_FILTERS);

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Listing Grid Shell Demo</h2>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-800">
          <strong>Note:</strong> This is a simplified placeholder story. The original listing-grid-shell.tsx
          contained legacy code with outdated component interfaces. This demo shows the current
          FilterableItem structure and basic component integration.
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Sample Data ({sampleListings.length} items)</h3>
        <MapViewComponent filteredListings={sampleListings} />
      </div>
    </div>
  );
}
  