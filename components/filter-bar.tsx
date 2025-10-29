import React from "react";
import { Icon } from "@iconify/react";

import { FILTER_BOUNDS } from "./types/listing-filters";
import FilterModal from "./filter-modal";
import {
  type FilterState,
  type MortgageType,
  type PropertyType,
} from "./types/listing-filters";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { FilterableItem } from "./ListingGridShell";

interface FilterBarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  items?: ReadonlyArray<FilterableItem>;
}

export function FilterBar({ filters, onFiltersChange, items }: FilterBarProps) {
  const safeFilters: FilterState = filters || {
    ltvRange: [0, 100] as [number, number],
    interestRateRange: [0, 10] as [number, number],
    loanAmountRange: [0, 10000000] as [number, number],
    loanAmountMin: 0,
    loanAmountMax: 10000000,
    mortgageTypes: [],
    propertyTypes: [],
    searchQuery: "",
    maturityDate: undefined,
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      ...safeFilters,
      searchQuery: e.target.value,
    });
  };

  const handleClearFilters = () => {
    onFiltersChange({
      ltvRange: FILTER_BOUNDS.ltvRange,
      interestRateRange: FILTER_BOUNDS.interestRateRange,
      loanAmountRange: FILTER_BOUNDS.loanAmountRange,
      loanAmountMin: FILTER_BOUNDS.loanAmountMin,
      loanAmountMax: FILTER_BOUNDS.loanAmountMax,
      mortgageTypes: [],
      propertyTypes: [],
      searchQuery: "",
      maturityDate: undefined,
    });
  };

  const hasActiveFilters =
    safeFilters.ltvRange[0] > FILTER_BOUNDS.ltvRange[0] ||
    safeFilters.ltvRange[1] < FILTER_BOUNDS.ltvRange[1] ||
    safeFilters.interestRateRange[0] > FILTER_BOUNDS.interestRateRange[0] ||
    safeFilters.interestRateRange[1] < FILTER_BOUNDS.interestRateRange[1] ||
    safeFilters.loanAmountRange[0] > FILTER_BOUNDS.loanAmountRange[0] ||
    safeFilters.loanAmountRange[1] < FILTER_BOUNDS.loanAmountRange[1] ||
    safeFilters.mortgageTypes.length > 0 ||
    safeFilters.propertyTypes.length > 0 ||
    safeFilters.maturityDate !== undefined;

  return (
    <div className="bg-background/95 backdrop-blur-sm border-b sticky top-0 z-[10] flex flex-col justify-center gap-4 px-4 py-4">
      <div className="flex flex-wrap items-center justify-start gap-2 md:flex-nowrap">
        <div className="relative w-full md:w-64">
          <Icon
            className="text-foreground absolute left-3 top-1/2 -translate-y-1/2"
            icon="lucide:search"
          />
          <Input
            type="text"
            placeholder="Search titles, regions..."
            className="pl-10 rounded-full border-input shadow-md"
            value={safeFilters.searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <FilterModal
          filters={filters}
          onFiltersChange={onFiltersChange}
          items={items}
        />

        {hasActiveFilters && (
          <Button variant="destructive" onClick={handleClearFilters}>
            <Icon icon="lucide:x" className="mr-2" />
            Clear Filters
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="text-muted-foreground">Active filters:</span>

          {(safeFilters.ltvRange[0] > FILTER_BOUNDS.ltvRange[0] ||
            safeFilters.ltvRange[1] < FILTER_BOUNDS.ltvRange[1]) && (
            <span className="text-foreground">
              LTV: {safeFilters.ltvRange[0]}% - {safeFilters.ltvRange[1]}%
            </span>
          )}

          {(safeFilters.interestRateRange[0] >
            FILTER_BOUNDS.interestRateRange[0] ||
            safeFilters.interestRateRange[1] <
              FILTER_BOUNDS.interestRateRange[1]) && (
            <span className="text-foreground">
              Interest Rate: {safeFilters.interestRateRange[0]}% -{" "}
              {safeFilters.interestRateRange[1]}%
            </span>
          )}

          {(safeFilters.loanAmountRange[0] > FILTER_BOUNDS.loanAmountRange[0] ||
            safeFilters.loanAmountRange[1] <
              FILTER_BOUNDS.loanAmountRange[1]) && (
            <span className="text-foreground">
              Loan Amount: ${safeFilters.loanAmountRange[0].toLocaleString()} -
              ${safeFilters.loanAmountRange[1].toLocaleString()}
            </span>
          )}

          {safeFilters.mortgageTypes.length > 0 && (
            <span className="text-foreground">
              Types: {safeFilters.mortgageTypes.join(", ")}
            </span>
          )}

          {safeFilters.propertyTypes.length > 0 && (
            <span className="text-foreground">
              Property Types: {safeFilters.propertyTypes.join(", ")}
            </span>
          )}

          {safeFilters.maturityDate && (
            <span className="text-foreground">
              Maturity Date: {safeFilters.maturityDate.toLocaleDateString()}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
