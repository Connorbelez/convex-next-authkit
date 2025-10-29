"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

/**
 * Server page error boundary
 * Catches errors in the server example page
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
		console.error("Server page error:", error);
	}, [error]);

	return (
		<main className="p-8 flex flex-col items-center justify-center min-h-screen">
			<div className="max-w-md w-full space-y-6 text-center">
				<div className="space-y-2">
					<h1 className="text-3xl font-bold text-red-600">
						Server Page Error
					</h1>
					<p className="text-muted-foreground">
						Failed to load server-side data.
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
		</main>
	);
}
