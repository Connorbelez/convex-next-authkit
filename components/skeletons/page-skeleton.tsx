import { Skeleton } from "@/components/ui/skeleton";

/**
 * Generic page loading skeleton
 * Used for basic pages with header and content area
 */
export function PageSkeleton() {
	return (
		<div className="min-h-screen">
			{/* Header skeleton */}
			<div className="sticky top-0 z-10 bg-background p-4 border-b-2 border-slate-200 dark:border-slate-800 flex flex-row justify-between items-center">
				<Skeleton className="h-6 w-32" />
				<Skeleton className="h-9 w-24" />
			</div>

			{/* Main content skeleton */}
			<main className="p-8 flex flex-col gap-8">
				<Skeleton className="h-10 w-64 mx-auto" />

				<div className="flex flex-col gap-8 max-w-lg mx-auto w-full">
					<Skeleton className="h-6 w-full" />
					<Skeleton className="h-6 w-full" />
					<Skeleton className="h-10 w-40" />
					<Skeleton className="h-6 w-full" />
					<Skeleton className="h-6 w-3/4" />
					<Skeleton className="h-6 w-full" />
				</div>
			</main>
		</div>
	);
}
