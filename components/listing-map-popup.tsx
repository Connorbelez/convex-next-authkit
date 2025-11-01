"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";

interface ListingMapPopupProps {
	id: string;
	title: string;
	address: string;
	principal: number;
	apr: number;
	imageSrc?: string;
}

/**
 * Compact popup component for map markers
 * Displays essential listing information with a link to the detail page
 */
export function ListingMapPopup({
	id,
	title,
	address,
	principal,
	apr,
	imageSrc,
}: ListingMapPopupProps) {
	return (
		<div className="w-[280px] overflow-hidden rounded-lg bg-background shadow-lg">
			{/* Image thumbnail */}
			{imageSrc && (
				<div className="relative h-32 w-full">
					<img
						src={imageSrc}
						alt={title}
						className="h-full w-full object-cover"
					/>
				</div>
			)}

			{/* Content */}
			<div className="p-3 space-y-2">
				<div>
					<h3 className="font-semibold text-sm line-clamp-1">{title}</h3>
					<p className="text-xs text-muted-foreground flex items-center gap-1">
						<Icon icon="lucide:map-pin" className="h-3 w-3" />
						{address}
					</p>
				</div>

				{/* Quick stats */}
				<div className="flex items-center gap-4 text-xs">
					<div className="flex items-center gap-1">
						<Icon icon="lucide:circle-dollar-sign" className="h-4 w-4" />
						<span className="font-semibold">
							${(principal / 1000).toFixed(0)}K
						</span>
					</div>
					<div className="flex items-center gap-1">
						<Icon icon="lucide:percent-circle" className="h-4 w-4" />
						<span className="font-semibold">{apr}% APR</span>
					</div>
				</div>

				{/* View details button */}
				<Link href={`/listings/${id}`} className="block">
					<Button size="sm" variant="primary" className="w-full">
						View Details
					</Button>
				</Link>
			</div>
		</div>
	);
}
