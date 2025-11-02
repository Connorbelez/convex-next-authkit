"use client";
import { TwoLevelNav } from "./two-level-nav";
import { SITE_URL } from "../../lib/siteurl";
import { useFiltersStore } from "../contexts/listingContext";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
import { usePathNameStore } from "../contexts/pathNameContext";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
export interface BreadcrumbItem {
	label: string;
	href?: string;
}

export default function NavigationProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const currentPathname = usePathname();
	const { setPathname, breadcrumbs, pathname } = usePathNameStore();
	useEffect(() => {
		setPathname(currentPathname);
	}, [currentPathname, setPathname]);

	return (
		// <Suspense fallback={<Skeleton className="h-10 w-full" />}>
		<>
			<TwoLevelNav breadcrumbs={breadcrumbs} pathname={pathname} />
			{children}
		</>
		// </Suspense>
	);
}
