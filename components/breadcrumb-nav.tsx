"use client";

import Link from "next/link";
import { Home } from "lucide-react";
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ViewTransition } from "react";
import { useNavigationTransition } from "@/components/transitions/useNavigationTransition";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { SITE_URL } from "@/lib/siteurl";

export interface BreadcrumbItemProps {
	label: string;
	href?: string;
}

interface BreadcrumbNavProps {
	items: BreadcrumbItemProps[];
	className?: string;
}

/**
 * Professional breadcrumb navigation component
 * Shows navigational hierarchy with clickable links
 *
 * @example
 * <BreadcrumbNav items={[
 *   { label: "Listings", href: "/listings" },
 *   { label: "Property Details" }
 * ]} />
 */
export function BreadcrumbNav({ className, items }: BreadcrumbNavProps) {
	const [localItems, setLocalItems] = useState<BreadcrumbItemProps[]>(items);
	useEffect(() => {
		setLocalItems(items);
	}, [items]);
	return (
		<ViewTransition>
			<div className={className}>
				<Breadcrumb>
					<BreadcrumbList>
						{/* Home link */}
						{/* <BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link
									href="/"
									className="flex items-center gap-1.5"
									aria-label="Go to home"
								>
									<Home className="h-4 w-4" />
									<span className="sr-only md:not-sr-only md:inline">Home</span>
								</Link>
							</BreadcrumbLink>
						</BreadcrumbItem> */}

						{localItems.map((item, index) => {
							const isLast = index === localItems.length - 1;
							if (index === 0) {
								return (
									<div key={item.label} className="contents">
										<BreadcrumbItem key={item.label}>
											<BreadcrumbLink asChild>
												<Link
													href="/"
													className="flex items-center gap-1.5"
													aria-label="Go to home"
												>
													<Home className="h-4 w-4" />
													<span className="sr-only md:not-sr-only md:inline">
														Home
													</span>
												</Link>
											</BreadcrumbLink>
										</BreadcrumbItem>
										<BreadcrumbSeparator />
									</div>
								);
							}
							return (
								<div key={item.label} className="contents">
									<BreadcrumbItem>
										{isLast || !item.href ? (
											<BreadcrumbPage>{item.label}</BreadcrumbPage>
										) : (
											<BreadcrumbLink asChild>
												<Link href={item.href}>{item.label}</Link>
											</BreadcrumbLink>
										)}
									</BreadcrumbItem>
									{!isLast && <BreadcrumbSeparator />}
								</div>
							);
						})}
					</BreadcrumbList>
				</Breadcrumb>
			</div>
		</ViewTransition>
	);
}
