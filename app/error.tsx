"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

/**
 * Root error boundary
 * Catches errors in the home page and provides recovery options
 */
export default function ErrorPage({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log error to error reporting service
		console.error("Root error:", error);
	}, [error]);

	return (
		<div className="min-h-screen flex items-center justify-center p-8">
			<div className="max-w-md w-full space-y-6 text-center">
				<div className="space-y-2">
					<h1 className="text-4xl font-bold text-red-600">
						Something went wrong!
					</h1>
					<p className="text-muted-foreground">
						An unexpected error occurred while loading this page.
					</p>
				</div>

				{error.message && (
					<div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
						<p className="text-sm text-red-800 dark:text-red-200 font-mono">
							{error.message}
						</p>
					</div>
				)}

				<div className="flex flex-col gap-3">
					<Button variant="default" size="lg" onClick={reset}>
						Try again
					</Button>
					<Button
						variant="outline"
						size="lg"
						onClick={() => {
							window.location.href = "/";
						}}
					>
						Go to home
					</Button>
				</div>

				{error.digest && (
					<p className="text-xs text-muted-foreground">
						Error ID: {error.digest}
					</p>
				)}
			</div>
		</div>
	);
}
