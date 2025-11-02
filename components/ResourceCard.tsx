"use client";

import Link from "next/link";

export function ResourceCard({
	title,
	description,
	href,
}: {
	title: string;
	description: string;
	href: string;
}) {
	return (
		<div className="flex flex-col gap-2 bg-slate-200 dark:bg-slate-800 p-4 rounded-md h-28 overflow-auto">
			<Link href={href} className="text-sm underline hover:no-underline">
				{title}
			</Link>
			<p className="text-xs">{description}</p>
		</div>
	);
}
