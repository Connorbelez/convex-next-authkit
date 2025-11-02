import { TwoLevelNav } from "@/components/navigation/two-level-nav";

export default function Home() {
	return (
		<div className="min-h-screen">
			<TwoLevelNav
				breadcrumbs={[
					{ label: "Home", href: "/" },
					{ label: "Listings", href: "/listings" },
					{ label: "Listing Details" },
				]}
			/>

			{/* Main Content */}
			<main className="pt-[104px] px-6 py-12">
				<div className="max-w-7xl mx-auto">
					<h1 className="text-4xl font-bold text-balance mb-4">
						Welcome to FairLend
					</h1>
					<p className="text-lg text-muted-foreground text-pretty max-w-2xl">
						Experience our professional two-level navigation system inspired by
						Vercel's design. Try the search with{" "}
						<kbd className="px-2 py-1 text-xs bg-muted rounded">⌘K</kbd> or
						click through the navigation tabs to see the tubelight effect in
						action.
					</p>

					<div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{[1, 2, 3, 4, 5, 6].map((i) => (
							<div
								key={i}
								className="p-6 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
							>
								<h3 className="text-lg font-semibold mb-2">Feature {i}</h3>
								<p className="text-sm text-muted-foreground">
									Explore the capabilities of our lending platform with this
									demo card.
								</p>
							</div>
						))}
					</div>
				</div>
			</main>
		</div>
	);
}
