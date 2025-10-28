import { Card, CardBody, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

interface Comparable {
	_id: string;
	_creationTime: number;
	title: string;
	address: {
		street: string;
		city: string;
		state: string;
		zip: string;
		country: string;
	};
	images: Array<{
		url: string;
		alt?: string;
		order: number;
	}>;
	financials: {
		currentValue: number;
		monthlyPayment: number;
		interestRate: number;
	};
	status: string;
	distance: number; // in miles
}

interface ComparablePropertiesProps {
	comparables: Comparable[];
}

function formatCurrency(amount: number): string {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(amount);
}

function formatDistance(miles: number): string {
	if (miles < 0.1) {
		return "< 0.1 mi";
	}
	return `${miles.toFixed(1)} mi`;
}

export function ComparableProperties({ comparables }: ComparablePropertiesProps) {
	if (comparables.length === 0) {
		return null; // Hide section when no comparables
	}

	return (
		<div className="space-y-4">
			<div className="flex items-center gap-2">
				<Icon icon="lucide:building-2" className="h-6 w-6 text-primary" />
				<h2 className="text-2xl font-bold">Comparable Properties</h2>
				<Chip size="sm" variant="flat">
					{comparables.length} nearby
				</Chip>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{comparables.map((comp) => {
					const primaryImage = comp.images.sort((a, b) => a.order - b.order)[0];

					return (
						<Link key={comp._id} href={`/listings/${comp._id}`}>
							<Card className="group cursor-pointer transition-shadow hover:shadow-lg">
								<CardBody className="p-0">
									{/* Image */}
									<div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-lg">
										{primaryImage ? (
											<Image
												src={primaryImage.url}
												alt={primaryImage.alt || comp.title}
												fill
												className="object-cover transition-transform group-hover:scale-105"
												sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
											/>
										) : (
											<div className="flex h-full items-center justify-center bg-gray-100 dark:bg-gray-800">
												<Icon icon="lucide:image" className="h-12 w-12 text-gray-400" />
											</div>
										)}

										{/* Distance badge */}
										<div className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-1 text-xs text-white backdrop-blur-sm">
											{formatDistance(comp.distance)}
										</div>
									</div>

									{/* Content */}
									<div className="space-y-3 p-4">
										{/* Title */}
										<h3 className="line-clamp-1 font-semibold text-gray-900 group-hover:text-primary dark:text-white">
											{comp.title}
										</h3>

										{/* Address */}
										<div className="flex items-start gap-1.5 text-sm text-gray-600 dark:text-gray-400">
											<Icon icon="lucide:map-pin" className="mt-0.5 h-4 w-4 flex-shrink-0" />
											<p className="line-clamp-1">
												{comp.address.city}, {comp.address.state}
											</p>
										</div>

										{/* Price */}
										<div className="flex items-baseline gap-1">
											<p className="text-2xl font-bold text-gray-900 dark:text-white">
												{formatCurrency(comp.financials.currentValue)}
											</p>
										</div>

										{/* Key metrics */}
										<div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
											<div className="flex items-center gap-1">
												<Icon icon="lucide:calendar-days" className="h-4 w-4" />
												<span>{formatCurrency(comp.financials.monthlyPayment)}/mo</span>
											</div>
											<div className="flex items-center gap-1">
												<Icon icon="lucide:percent" className="h-4 w-4" />
												<span>{comp.financials.interestRate.toFixed(2)}%</span>
											</div>
										</div>
									</div>
								</CardBody>
							</Card>
						</Link>
					);
				})}
			</div>

			{/* View more link */}
			{comparables.length >= 5 && (
				<div className="text-center">
					<Link
						href="/listings"
						className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
					>
						View more properties
						<Icon icon="lucide:arrow-right" className="h-4 w-4" />
					</Link>
				</div>
			)}
		</div>
	);
}
