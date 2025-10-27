import React from "react";
import { Icon } from "@iconify/react";
import { CircleCheck } from "lucide-react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { FILTER_BOUNDS } from "./types/listing-filters";
import {
  type FilterState,
  type MortgageType,
  type PropertyType,
} from "./types/listing-filters";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import RangeSliderWithHistogram from "@/components/ui/range-slider-with-histogram";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import type { FilterableItem } from "./ListingGridShell";

interface FilterModalProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  items?: ReadonlyArray<FilterableItem>;
}

export default function FilterModal({
  filters,
  onFiltersChange,
  items = [],
}: FilterModalProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  // Ensure tooltips appear above all other elements when modal is open
  React.useEffect(() => {
    if (isOpen) {
      const style = document.createElement("style");
      style.textContent = `
        [data-radix-tooltip-content] {
          z-index: 9999 !important;
        }
      `;
      style.id = "tooltip-z-index-fix";
      document.head.appendChild(style);

      return () => {
        const existingStyle = document.getElementById("tooltip-z-index-fix");
        if (existingStyle) {
          existingStyle.remove();
        }
      };
    }
  }, [isOpen]);

  // Calculate histogram data from actual items
  const calculateHistogram = React.useCallback(
    (
      field: "ltv" | "apr" | "principal",
      min: number,
      max: number,
      barCount: number,
    ): number[] => {
      const buckets = Array(barCount).fill(0);
      const bucketSize = (max - min) / barCount;

      items.forEach((item) => {
        const value = item[field];
        if (value !== undefined && value >= min && value <= max) {
          const bucketIndex = Math.min(
            Math.floor((value - min) / bucketSize),
            barCount - 1,
          );
          buckets[bucketIndex]++;
        }
      });

      return buckets;
    },
    [items],
  );

  // Pre-calculate histogram data for all sliders with finer detail (40 bars = 20 * 2)
  const ltvHistogram = React.useMemo(
    () =>
      calculateHistogram(
        "ltv",
        FILTER_BOUNDS.ltvRange[0],
        FILTER_BOUNDS.ltvRange[1],
        20,
      ),
    [calculateHistogram],
  );

  const aprHistogram = React.useMemo(
    () =>
      calculateHistogram(
        "apr",
        FILTER_BOUNDS.interestRateRange[0],
        FILTER_BOUNDS.interestRateRange[1],
        20,
      ),
    [calculateHistogram],
  );

  const principalHistogram = React.useMemo(
    () =>
      calculateHistogram(
        "principal",
        FILTER_BOUNDS.loanAmountRange[0],
        FILTER_BOUNDS.loanAmountRange[1],
        20,
      ),
    [calculateHistogram],
  );

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

  const handleLtvChange = (values: [number, number]) => {
    onFiltersChange({
      ...safeFilters,
      ltvRange: values,
    });
  };

  const handleInterestRateChange = (values: [number, number]) => {
    onFiltersChange({
      ...safeFilters,
      interestRateRange: values,
    });
  };

  const handleLoanAmountChange = (values: [number, number]) => {
    onFiltersChange({
      ...safeFilters,
      loanAmountRange: values,
    });
  };

  const handleMortgageTypeToggle = (type: MortgageType) => {
    const currentTypes = safeFilters.mortgageTypes;
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter((t) => t !== type)
      : [...currentTypes, type];

    onFiltersChange({
      ...safeFilters,
      mortgageTypes: newTypes,
    });
  };

  const handleMaturityDateChange = (date?: Date) => {
    onFiltersChange({
      ...safeFilters,
      maturityDate: date,
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

  const mortgageTypeOptions: Array<{
    value: MortgageType;
    label: string;
    displayLabel: string;
  }> = [
    { value: "First", label: "1st", displayLabel: "1st" },
    { value: "Second", label: "2nd", displayLabel: "2nd" },
    { value: "Other", label: "3+", displayLabel: "3+" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg">
          Filters
          <Icon icon="lucide:filter" className="ml-2" />
        </Button>
      </DialogTrigger>
      <TooltipProvider delayDuration={0}>
        <DialogContent className="max-h-[80vh] z-101  overflow-y-auto max-w-[calc(100vw-1rem)] w-[calc(100vw-1rem)] min-w-[300px] px-2 sm:px-6">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-medium">
              Filters
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-3 py-1 px-1 sm:px-0">
            <Separator />

            <div className="space-y-2">
              <h2 className="text-foreground/50 text-center text-lg sm:text-xl font-medium flex items-center justify-center gap-2">
                <Icon icon="lucide:percent" className="w-5 h-5" />
                LTV
              </h2>
              <div className="w-full overflow-x-hidden relative z-[105]">
                <RangeSliderWithHistogram
                  min={FILTER_BOUNDS.ltvRange[0]}
                  max={FILTER_BOUNDS.ltvRange[1]}
                  step={1}
                  defaultValue={safeFilters.ltvRange}
                  formatValue={(value) => `${value}%`}
                  onValueChange={handleLtvChange}
                  variant="compact"
                  targetBarCount={20}
                  showCard={false}
                  showTitle={false}
                  histogramData={ltvHistogram}
                  className="w-full"
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h2 className="text-foreground/50 text-center text-lg sm:text-xl font-medium flex items-center justify-center gap-2">
                <Icon icon="lucide:trending-up" className="w-5 h-5" />
                Interest Rate
              </h2>
              <div className="w-full overflow-x-hidden relative z-[105]">
                <RangeSliderWithHistogram
                  min={FILTER_BOUNDS.interestRateRange[0]}
                  max={FILTER_BOUNDS.interestRateRange[1]}
                  step={0.1}
                  defaultValue={safeFilters.interestRateRange}
                  formatValue={(value) => `${value}%`}
                  onValueChange={handleInterestRateChange}
                  variant="compact"
                  targetBarCount={20}
                  showCard={false}
                  showTitle={false}
                  histogramData={aprHistogram}
                  className="w-full"
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h2 className="text-foreground/50 text-center text-lg sm:text-xl font-medium flex items-center justify-center gap-2">
                <Icon icon="lucide:dollar-sign" className="w-5 h-5" />
                Loan Amount
              </h2>
              <div className="w-full overflow-x-hidden relative z-[105]">
                <RangeSliderWithHistogram
                  min={FILTER_BOUNDS.loanAmountRange[0]}
                  max={FILTER_BOUNDS.loanAmountRange[1]}
                  step={10000}
                  defaultValue={safeFilters.loanAmountRange}
                  formatValue={(value) => `$${value.toLocaleString()}`}
                  onValueChange={handleLoanAmountChange}
                  variant="compact"
                  targetBarCount={20}
                  showCard={false}
                  showTitle={false}
                  histogramData={principalHistogram}
                  className="w-full"
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h2 className="text-foreground/50 text-center text-lg sm:text-xl font-medium flex items-center justify-center gap-2">
                <Icon icon="lucide:file-text" className="w-5 h-5" />
                Mortgage Type
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 justify-center items-center py-4">
                {mortgageTypeOptions.map((option) => (
                  <CheckboxPrimitive.Root
                    key={option.value}
                    checked={safeFilters.mortgageTypes.includes(option.value)}
                    onCheckedChange={() =>
                      handleMortgageTypeToggle(option.value)
                    }
                    className="relative ring-[1px] ring-border rounded-lg px-2 py-2 sm:px-4 sm:py-3 text-center text-muted-foreground data-[state=checked]:ring-2 data-[state=checked]:ring-primary data-[state=checked]:text-primary transition-all"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-2xl font-semibold">
                        {option.label}
                      </span>
                      <span className="text-sm font-medium tracking-tight">
                        {option.displayLabel}
                      </span>
                    </div>
                    <CheckboxPrimitive.Indicator className="absolute top-2 right-2">
                      <CircleCheck className="fill-primary text-primary-foreground w-5 h-5" />
                    </CheckboxPrimitive.Indicator>
                  </CheckboxPrimitive.Root>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h2 className="text-foreground/50 text-center text-lg sm:text-xl font-medium flex items-center justify-center gap-2">
                <Icon icon="lucide:calendar" className="w-5 h-5" />
                Maturity Date
              </h2>
              <div className="flex justify-center">
                <DatePicker
                  date={safeFilters.maturityDate}
                  onDateChange={handleMaturityDateChange}
                />
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button>
            {hasActiveFilters && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleClearFilters}
              >
                <Icon icon="lucide:x" className="mr-2" />
                Clear Filters
              </Button>
            )}
            <Button size="sm" onClick={() => setIsOpen(false)}>
              Apply
            </Button>
          </DialogFooter>
        </DialogContent>
      </TooltipProvider>
    </Dialog>
  );
}
