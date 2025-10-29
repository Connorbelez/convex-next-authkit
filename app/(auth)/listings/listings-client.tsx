"use client";

import * as React from "react";
import {
	ListingGridShell,
	type FilterableItem,
} from "@/components/ListingGridShell";
import { Horizontal } from "@/components/listing-card-horizontal";
import { ListingMapPopup } from "@/components/listing-map-popup";

interface ListingItem extends FilterableItem {
	id: string;
	imageSrc: string;
}

interface ListingsClientProps {
	listings: ListingItem[];
}

/**
 * Client wrapper for the listings page
 * Handles rendering of listing cards and map popups
 */
export function ListingsClient({ listings }: ListingsClientProps) {
	React.useEffect(() => {
		console.log("[ListingsClient] Received listings:", listings.length);
		console.log("[ListingsClient] First listing:", listings[0]);
	}, [listings]);

	return (
		<ListingGridShell
			items={listings}
			renderCard={(listing) => (
				<Horizontal
					id={listing.id}
					title={listing.title}
					address={listing.address}
					imageSrc={listing.imageSrc}
					ltv={listing.ltv}
					apr={listing.apr}
					principal={listing.principal}
					propertyType={listing.propertyType}
					maturityDate={listing.maturityDate?.toLocaleDateString("en-US", {
						month: "2-digit",
						day: "2-digit",
						year: "numeric",
					})}
				/>
			)}
			renderMapPopup={(listing) => (
				<ListingMapPopup
					id={listing.id!}
					title={listing.title!}
					address={listing.address!}
					principal={listing.principal!}
					apr={listing.apr!}
					imageSrc={listing.imageSrc}
				/>
			)}
			showFilters={true}
			mapProps={{
				initialCenter: { lat: 43.6532, lng: -79.3832 }, // Toronto
				initialZoom: 11, // City-level view
			}}
		/>
	);
}

