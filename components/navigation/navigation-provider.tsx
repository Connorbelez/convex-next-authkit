"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { TwoLevelNav } from "./two-level-nav";
import { SITE_URL } from "@/lib/siteurl";
import { useFiltersStore } from "../contexts/listingContext";
export interface BreadcrumbItem {
	label: string;
	href?: string;
}

export default function NavigationProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

	useEffect(() => {
		const pathParts = pathname.split("/");
		const breadcrumbs = pathParts.map((part, index) => ({
			label: part.charAt(0).toUpperCase() + part.slice(1),
			href: `${SITE_URL}${pathParts.slice(0, index + 1).join("/")}`,
		}));
		setBreadcrumbs(breadcrumbs);
	}, [pathname]);

	return (
		<>
			<TwoLevelNav breadcrumbs={breadcrumbs} />
			{children}
		</>
	);
}
