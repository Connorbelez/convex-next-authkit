"use client";

import { ResourceCard } from "./ResourceCard";

export function ResourceLinks() {
	return (
		<div className="flex flex-col">
			<p className="text-lg font-bold">Useful resources:</p>
			<div className="flex gap-2">
				<div className="flex flex-col gap-2 w-1/2">
					<ResourceCard
						title="Convex docs"
						description="Read comprehensive documentation for all Convex features."
						href="https://docs.convex.dev/home"
					/>
					<ResourceCard
						title="Stack articles"
						description="Learn about best practices, use cases, and more from a growing
            collection of articles, videos, and walkthroughs."
						href="https://www.typescriptlang.org/docs/handbook/2/basic-types.html"
					/>
				</div>
				<div className="flex flex-col gap-2 w-1/2">
					<ResourceCard
						title="Templates"
						description="Browse our collection of templates to get started quickly."
						href="https://www.convex.dev/templates"
					/>
					<ResourceCard
						title="Discord"
						description="Join our developer community to ask questions, trade tips & tricks,
            and show off your projects."
						href="https://www.convex.dev/community"
					/>
				</div>
			</div>
		</div>
	);
}
