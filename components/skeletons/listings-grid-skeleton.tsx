import { Skeleton } from "@/components/ui/skeleton";

/**
 * Loading skeleton for listings grid page
 * Matches the layout of ListingGridShell with FilterBar, grid view, and sticky map
 */
export function ListingsGridSkeleton() {
	return (
		<div className="min-h-screen">
			<div className="container mx-auto px-4 py-6">
				{/* Breadcrumb skeleton */}
				<div className="mb-6">
					<Skeleton className="h-5 w-24" />
				</div>

				{/* Header section */}
				<div className="mb-6">
					<Skeleton className="h-9 w-64 mb-2" />
					<Skeleton className="h-5 w-96 mb-1" />
					<Skeleton className="h-4 w-72" />
				</div>

				{/* FilterBar skeleton */}
				<div className="mb-4 space-y-3">
					{/* Search and filter controls row */}
					<div className="flex gap-3 items-center">
						<Skeleton className="h-10 flex-1 max-w-md" />
						<Skeleton className="h-10 w-32" />
						<Skeleton className="h-10 w-32" />
					</div>
					{/* Active filters chips */}
					<div className="flex gap-2">
						{[1, 2, 3].map((i) => (
							<Skeleton key={i} className="h-8 w-24" />
						))}
					</div>
				</div>

				{/* Two-column layout: Cards + Map */}
				<section className="flex gap-x-4 px-4 pt-4">
					{/* Left column: Listing cards grid */}
					<div className="flex-1">
						<div className="grid grid-cols-1 84rem:grid-cols-2">
							{[1, 2, 3, 4, 5, 6].map((i) => (
								<div
									key={i}
									className="border rounded-lg p-4 space-y-3"
								>
									<div className="flex gap-4">
										{/* Image skeleton */}
										<Skeleton className="h-32 w-48 flex-shrink-0 rounded-md" />

										{/* Content skeleton */}
										<div className="flex-1 space-y-2">
											<Skeleton className="h-6 w-3/4" />
											<Skeleton className="h-4 w-1/2" />
											<div className="flex gap-2 mt-2">
												<Skeleton className="h-4 w-16" />
												<Skeleton className="h-4 w-16" />
											</div>
											<div className="flex gap-4 mt-3">
												<Skeleton className="h-5 w-20" />
												<Skeleton className="h-5 w-20" />
												<Skeleton className="h-5 w-20" />
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Right column: Sticky map */}
					<div className="w-[40%] 84rem:w-[35%]">
						<div className="sticky top-4 h-[calc(100vh-7rem)]">
							<Skeleton className="h-full w-full rounded-lg" />
							{/* Map controls overlay */}
							<div className="absolute top-4 right-4 space-y-2">
								<Skeleton className="h-10 w-10 rounded-md" />
								<Skeleton className="h-10 w-10 rounded-md" />
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
