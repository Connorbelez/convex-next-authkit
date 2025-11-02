"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
	ListingMap,
	type ListingMapProps,
	type ViewportBounds,
} from "@/components/ListingMap";
import type { WithLatLng } from "@/hooks/use-filtered-listings";
import { useIsMobile } from "@/hooks/use-mobile";
import { useViewportFilteredItems } from "@/hooks/use-filtered-listings";
import {
	MobileListingScroller,
	type MobileListingSection,
} from "@/components/mobile-listing-scroller";
import { FilterBar } from "./filter-bar";
import {
	type FilterState,
	DEFAULT_FILTERS,
	FILTER_BOUNDS,
} from "./types/listing-filters";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Map as MapIcon } from "lucide-react";
import { useFiltersStore } from "./contexts/listingContext";

type ClassNames = {
	container?: string;
	gridColumn?: string;
	mapColumn?: string;
	mapWrapper?: string;
};

export interface FilterableItem extends WithLatLng {
	ltv?: number;
	apr?: number;
	principal?: number;
	mortgageType?: string;
	propertyType?: string;
	maturityDate?: Date;
	title?: string;
	address?: string;
}

export type ListingGridShellProps<T extends WithLatLng> = {
	items: ReadonlyArray<T>;
	renderCard: (item: T) => React.ReactNode;
	renderMapPopup: ListingMapProps<T>["renderPopup"];
	classNames?: ClassNames;
	mapProps?: Partial<
		Omit<ListingMapProps<T>, "items" | "renderPopup" | "onViewportChange">
	>;
	/** Optional function to group items into sections for mobile horizontal scrolling */
	groupItemsForMobile?: (items: ReadonlyArray<T>) => MobileListingSection<T>[];
	/** Show filter bar (default: true) */
	showFilters?: boolean;
	/** Custom filter bounds (optional) */
	filterBounds?: typeof FILTER_BOUNDS;
};

function applyFilters<T extends FilterableItem>(
	items: ReadonlyArray<T>,
	filters: FilterState,
): ReadonlyArray<T> {
	const filteredItems = items.filter((item) => {
		// LTV filter
		if (
			item.ltv !== undefined &&
			(item.ltv < filters.ltvRange[0] || item.ltv > filters.ltvRange[1])
		) {
			return false;
		}

		// Interest rate filter
		if (
			item.apr !== undefined &&
			(item.apr < filters.interestRateRange[0] ||
				item.apr > filters.interestRateRange[1])
		) {
			return false;
		}

		// Loan amount filter
		if (
			item.principal !== undefined &&
			(item.principal < filters.loanAmountRange[0] ||
				item.principal > filters.loanAmountRange[1])
		) {
			return false;
		}

		// Mortgage type filter
		if (
			filters.mortgageTypes.length > 0 &&
			item.mortgageType &&
			!filters.mortgageTypes.includes(item.mortgageType as any)
		) {
			return false;
		}

		// Property type filter
		if (
			filters.propertyTypes.length > 0 &&
			item.propertyType &&
			!filters.propertyTypes.includes(item.propertyType as any)
		) {
			return false;
		}

		// Search query filter
		if (filters.searchQuery) {
			const query = filters.searchQuery.toLowerCase();
			const matchesTitle = item.title?.toLowerCase().includes(query);
			const matchesAddress = item.address?.toLowerCase().includes(query);
			if (!matchesTitle && !matchesAddress) {
				return false;
			}
		}

		// Maturity date filter
		if (filters.maturityDate && item.maturityDate) {
			const filterDate = new Date(filters.maturityDate);
			const itemDate = new Date(item.maturityDate);
			if (itemDate > filterDate) {
				return false;
			}
		}

		return true;
	});

	return filteredItems;
}

// Animation variants from smooth-drawer
const drawerVariants = {
	hidden: {
		y: "100%",
		opacity: 0,
		rotateX: 5,
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 30,
		},
	},
	visible: {
		y: 0,
		opacity: 1,
		rotateX: 0,
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 30,
			mass: 0.8,
			staggerChildren: 0.07,
			delayChildren: 0.2,
		},
	},
};

const itemVariants = {
	hidden: {
		y: 20,
		opacity: 0,
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 30,
		},
	},
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 30,
			mass: 0.8,
		},
	},
};

export function ListingGridShell<T extends WithLatLng>({
	items,
	renderCard,
	renderMapPopup,
	classNames,
	mapProps,
	groupItemsForMobile,
	showFilters = true,
	filterBounds = FILTER_BOUNDS,
}: ListingGridShellProps<T>) {
	const isMobile = useIsMobile();
	const [viewportBounds, setViewportBounds] = React.useState<
		ViewportBounds | undefined
	>(undefined);
	const { filters, setFilters, setItems } = useFiltersStore();
	const [isMapDrawerOpen, setIsMapDrawerOpen] = React.useState(false);

	// Apply user filters first
	const userFilteredItems = React.useMemo(() => {
		if (!showFilters) return items;
		return applyFilters(
			items as ReadonlyArray<FilterableItem>,
			filters,
		) as ReadonlyArray<T>;
	}, [items, filters, showFilters]);

	// Then apply viewport filtering
	const filteredItems = useViewportFilteredItems(
		userFilteredItems,
		viewportBounds,
	);

	const onViewportChange = React.useCallback((bounds: ViewportBounds) => {
		setViewportBounds(bounds);
	}, []);

	// Group items for mobile horizontal scrolling
	const mobileSections = React.useMemo(() => {
		// Ensure we always have a valid array
		if (!filteredItems || filteredItems.length === 0) {
			return [];
		}

		if (groupItemsForMobile) {
			const grouped = groupItemsForMobile(filteredItems);
			// Ensure grouping function returns valid array
			return grouped && Array.isArray(grouped)
				? grouped
				: [{ title: "All Listings", items: filteredItems }];
		}

		// Default: single section with all items
		return [{ title: "All Listings", items: filteredItems }];
	}, [filteredItems, groupItemsForMobile]);

	React.useEffect(() => {
		setItems(filteredItems);
	}, [filteredItems, setItems]);

	if (isMobile) {
		return (
			<div className={classNames?.container}>
				{/* {showFilters && (
          <FilterBar />
        )} */}
				<div className="px-4">
					{/* Main listing scroller */}
					<div className={classNames?.gridColumn}>
						<MobileListingScroller
							sections={mobileSections}
							renderCard={renderCard}
						/>
					</div>

					{/* Floating map button */}
					<div className="fixed bottom-6 right-6 z-40">
						<Drawer open={isMapDrawerOpen} onOpenChange={setIsMapDrawerOpen}>
							<DrawerTrigger asChild>
								<Button
									size="lg"
									className="rounded-full shadow-lg h-14 w-14 p-0"
								>
									<MapIcon className="h-6 w-6" />
								</Button>
							</DrawerTrigger>
							<DrawerContent className="h-[85vh] rounded-t-2xl">
								<motion.div
									variants={drawerVariants as any}
									initial="hidden"
									animate="visible"
									className="h-full flex flex-col"
								>
									<motion.div variants={itemVariants as any}>
										<DrawerHeader>
											<DrawerTitle>Map View</DrawerTitle>
										</DrawerHeader>
									</motion.div>
									<motion.div
										variants={itemVariants as any}
										className="flex-1 px-4 pb-4 min-h-0"
									>
										<div className="h-full">
											<ListingMap
												items={filteredItems}
												renderPopup={renderMapPopup}
												onViewportChange={onViewportChange}
												className="h-full w-full rounded-lg"
												{...mapProps}
											/>
										</div>
									</motion.div>
								</motion.div>
							</DrawerContent>
						</Drawer>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col">
			{/* {showFilters && (
        <FilterBar />
      )} */}
			<section className={classNames?.container ?? "flex gap-x-4 px-4 pt-4"}>
				<div className={classNames?.gridColumn ?? "flex-1"}>
					<div className="grid grid-cols-1 84rem:grid-cols-2">
						<AnimatePresence mode="popLayout">
							{filteredItems.map((item) => (
								<motion.div
									key={
										(item as { id?: string | number }).id ??
										JSON.stringify(item)
									}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, scale: 0.95 }}
									transition={{ duration: 0.2 }}
									layout
								>
									{renderCard(item)}
								</motion.div>
							))}
						</AnimatePresence>
					</div>
				</div>
				<div className={classNames?.mapColumn ?? "w-[40%] 84rem:w-[35%]"}>
					<div
						className={
							classNames?.mapWrapper ?? "sticky top-30 h-[calc(100vh-7rem)]"
						}
					>
						<ListingMap
							items={filteredItems}
							renderPopup={renderMapPopup}
							onViewportChange={onViewportChange}
							className="h-full"
							{...mapProps}
						/>
					</div>
				</div>
			</section>
		</div>
	);
}

ListingGridShell.displayName = "ListingGridShell";
