"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";

/**
 * Listing detail page error boundary
 * Catches errors while loading individual listing data
 */
export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log error to error reporting service
		console.error("Listing detail error:", error);
	}, [error]);

	return (
		<div className="container mx-auto max-w-7xl px-4 py-8">
			{/* Breadcrumb Navigation */}
			<BreadcrumbNav
				items={[
					{ label: "Listings", href: "/listings" },
					{ label: "Error" }
				]}
				className="mb-8"
			/>

			<div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
				<div className="max-w-md w-full space-y-4 text-center">
					<div className="space-y-2">
						<h1 className="text-3xl font-bold text-red-600">
							Failed to Load Listing
						</h1>
						<p className="text-muted-foreground">
							We encountered an error while loading this property listing.
						</p>
					</div>

					{error.message && (
						<div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg text-left">
							<p className="text-sm text-red-800 dark:text-red-200 font-mono break-words">
								{error.message}
							</p>
						</div>
					)}

					<div className="flex flex-col gap-3">
						<Button
							variant="default"
							size="lg"
							onClick={reset}
						>
							Try again
						</Button>
						<Button
							variant="outline"
							size="lg"
							className="w-full"
							asChild
						>
							<Link href="/listings">
								Back to listings
							</Link>
						</Button>
						<Button
							variant="ghost"
							size="lg"
							className="w-full"
							asChild
						>
							<Link href="/">
								Go to home
							</Link>
						</Button>
					</div>

					{error.digest && (
						<p className="text-xs text-muted-foreground">
							Error ID: {error.digest}
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
