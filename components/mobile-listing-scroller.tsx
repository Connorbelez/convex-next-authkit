"use client";

import * as React from "react";

export interface MobileListingSection<T> {
	title: string;
	items: readonly T[];
}

interface MobileListingScrollerProps<T> {
	sections: MobileListingSection<T>[];
	renderCard: (item: T) => React.ReactNode;
}

export function MobileListingScroller<T>({
	sections,
	renderCard,
}: MobileListingScrollerProps<T>) {
	// Guard against undefined or empty sections
	if (!sections || sections.length === 0) {
		return null;
	}

	return (
		<div className="flex flex-col gap-8 pb-4">
			{sections.map((section, sectionIndex) => {
				// Skip if no items in this section
				if (!section.items || section.items.length === 0) return null;

				return (
					<section key={sectionIndex} className="flex flex-col gap-3 mt-8">
						{/* Section Title */}
						<h2 className="text-lg font-semibold pl-6">{section.title}</h2>

						{/* Horizontally Scrollable Container */}
						<div
							className="flex gap-4 overflow-x-auto pl-6 pr-4 pb-2 snap-x snap-mandatory scrollbar-hide"
							style={{
								scrollbarWidth: "none",
								msOverflowStyle: "none",
							}}
						>
							{section.items.map((item, itemIndex) => (
								<div
									key={itemIndex}
									className="snap-start flex-shrink-0 w-[280px]"
								>
									{renderCard(item)}
								</div>
							))}
						</div>
					</section>
				);
			})}
		</div>
	);
}
