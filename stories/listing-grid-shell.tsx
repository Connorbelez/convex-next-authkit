"use client";

import React, { useEffect } from "react";

import { type MortgageListing } from "./archive/mortgageview";
// import { FilterBar } from "./components/filter-bar"
import { MapView } from "./components/map-view";
import { useFilteredListings } from "./hooks/use-filtered-listings";
import { FilterBar } from "./listing-filter";
import { type FilterState } from "./types/mortgage";
import PropertyCardList from "components/property-card-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { useIsMobile } from "hooks/use-mobile";
import { MobileListingScroller } from "components/mobile-listing-scroller";
// import { api } from "trpc/react"

// import { type Property } from "components/property-card-list"

export function MapViewComponent({
  // mortgages,
  filters,
  isMobile,
  filteredListings,
  handleFiltersChangeAction,
  classNames,
  mapViewInlineStyles,
  includeFilterBar,
}: {
  // mortgages: MortgageAndComparables[]
  filters: FilterState;
  isMobile: boolean;
  filteredListings: MortgageListing[];
  handleFiltersChangeAction: (newFilters: FilterState) => void;
  classNames?: {
    mapContainer?: string;
    mapContent?: string;
    radiusFilterCard?: string;
    mapCard?: string;
    mapViewFooter?: string;
  };
  mapViewInlineStyles?: React.CSSProperties;
  includeFilterBar?: boolean;
}) {
  return (
    <MapView
      isMobile={isMobile}
      filters={filters}
      listings={filteredListings}
      onFiltersChangeAction={handleFiltersChangeAction}
      includeFilterBar={includeFilterBar}
      classNames={classNames}
      mapViewInlineStyles={mapViewInlineStyles}
    />
  );
}

export default function PageShell({ mortgages }: { mortgages: any[] }) {
  const isMobile = useIsMobile();
  const sampleListings: MortgageListing[] = mortgages.map((mortgage) => ({
    //convert all string representations of numbers to numbers
    ...mortgage,
    id: mortgage.listingId,
    mortgageId: mortgage.id,
    mortgageNumber: mortgage.mortgageNumber.toString(),
    ltv: parseFloat(mortgage.ltv),
    interestRate: parseFloat(mortgage.interestRate),
    loanAmount: parseFloat(mortgage.loanAmount),
    marketValue: parseFloat(mortgage.marketValue),
    streetAddress: mortgage.address,
    propertyImage: mortgage.heroImg ?? "",
    lat: parseFloat(mortgage.lat ?? "0"),
    lng: parseFloat(mortgage.lng ?? "0"),
    mortgageType:
      mortgage.mortgageType === 1
        ? "First"
        : mortgage.mortgageType === 2
          ? "Second"
          : "Other",
    region: (mortgage.addressObj as any)?.["city"] || mortgage.province,
    maturityDate: mortgage.termEnd,
    comparableProperties: mortgage.comparableProperties,
    propertyImgs: mortgage.propertyImgs as string[],
    propertyType: mortgage.propertyType,
    lockedAt: mortgage.lockedAt,
    addressObj: mortgage.addressObj,
  }));

  const [selected, setSelected] = React.useState("grid");
  const [filters, setFilters] = React.useState<FilterState>({
    ltvRange: [0, 100],
    interestRateRange: [0, 15],
    loanAmountRange: [0, 10000000],
    loanAmountMin: 0,
    loanAmountMax: 10000000,
    mortgageTypes: [],
    propertyTypes: [],
    searchQuery: "",
  });
  const [filtersInitialized, setFiltersInitialized] = React.useState(false);

  // Get default filter setup
  // const { data: defaultFilterSetup } = api.listings.getDefaultFilterSetup.useQuery()

  // Handle filter state changes
  const handleFiltersChange = (newFilters: FilterState) => {
    console.log("Filters changed:", newFilters);
    console.log("Property types in new filters:", newFilters.propertyTypes);
    setFilters(newFilters);
  };

  // New useEffect for loading default filter setup
  useEffect(() => {
    if (filtersInitialized) return;

    // First, calculate the actual min/max values from the data
    const [ltvMin, ltvMax] = sampleListings.reduce(
      (acc, listing) => {
        return [Math.min(acc[0], listing.ltv), Math.max(acc[1], listing.ltv)];
      },
      [100, 0],
    );

    const [interestRateMin, interestRateMax] = sampleListings.reduce<
      [number, number]
    >(
      (acc, listing) => {
        return [
          Math.min(acc[0], listing.interestRate),
          Math.max(acc[1], listing.interestRate),
        ];
      },
      [15, 0],
    );

    const [loanAmountMin, loanAmountMax] = sampleListings.reduce<
      [number, number]
    >(
      (acc, listing) => {
        return [
          Math.min(acc[0], listing.loanAmount),
          Math.max(acc[1], listing.loanAmount),
        ];
      },
      [1000000, 0],
    );

    const [marketValueMin, marketValueMax] = sampleListings.reduce(
      (acc, listing) => {
        return [
          Math.min(acc[0], listing.marketValue),
          Math.max(acc[1], listing.marketValue),
        ];
      },
      [1000000, 0],
    );

    // Base filter state with actual data ranges
    const baseFilters: FilterState = {
      ltvRange: [ltvMin, ltvMax],
      interestRateRange: [interestRateMin, interestRateMax],
      loanAmountRange: [loanAmountMin, loanAmountMax],
      loanAmountMin: loanAmountMin,
      loanAmountMax: loanAmountMax,
      mortgageTypes: [],
      propertyTypes: [],
      searchQuery: "",
      useViewportFilter: true,
    };

    // Always use base filters on component initialization
    // This prevents saved filter setups from being automatically applied
    // when navigating back to the listings page
    setFilters(baseFilters);

    setFiltersInitialized(true);
  }, [sampleListings, filtersInitialized]);

  const filteredListings = useFilteredListings(sampleListings, filters);

  // Group listings by mortgage type for mobile view
  const groupedListings = React.useMemo(() => {
    return filteredListings.reduce(
      (acc, listing) => {
        const type = listing.mortgageType || "Other";
        if (!acc[type]) acc[type] = [];
        acc[type].push(listing);
        return acc;
      },
      {} as Record<string, MortgageListing[]>,
    );
  }, [filteredListings]);
  if (isMobile) {
    return (
      <div className="relative container flex h-full w-full flex-grow flex-col gap-4 pb-8">
        <FilterBar filters={filters} onFiltersChange={handleFiltersChange} />
        <Tabs defaultValue="listings">
          <TabsList className="absolute right-4 ml-auto place-items-end">
            <TabsTrigger value="listings">Listings</TabsTrigger>
            <TabsTrigger value="map">Map</TabsTrigger>
          </TabsList>
          <TabsContent className="pt-10" value="listings">
            <MobileListingScroller groupedListings={groupedListings} />
          </TabsContent>
          <TabsContent className="pt-10" value="map">
            <MapViewComponent
              isMobile={true}
              filters={filters}
              filteredListings={filteredListings}
              handleFiltersChangeAction={handleFiltersChange}
              includeFilterBar={false}
            />
          </TabsContent>
        </Tabs>
      </div>
    );
  }
  return (
    <section className="relative container flex min-w-full space-x-4 px-4">
      <div className="w-[75%] space-y-4">
        <FilterBar filters={filters} onFiltersChange={handleFiltersChange} />
        <PropertyCardList
          filteredListings={filteredListings}
          onFiltersChangeAction={handleFiltersChange}
          filters={filters}
          isMobile={isMobile}
        />
      </div>
      <div className="w-[25%] py-4">
        <div className="sticky top-24 z-10 h-[calc(100vh-7rem)] w-full rounded-lg overflow-hidden">
          <MapViewComponent
            filteredListings={filteredListings}
            filters={filters}
            isMobile={isMobile}
            handleFiltersChangeAction={handleFiltersChange}
            includeFilterBar={false}
          />
        </div>
      </div>
    </section>
  );
}
