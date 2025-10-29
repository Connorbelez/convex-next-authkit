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

export interface BreadcrumbItem {
	label: string;
	href?: string;
}

interface BreadcrumbNavProps {
	items: BreadcrumbItem[];
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
export function BreadcrumbNav({ items, className }: BreadcrumbNavProps) {
    return (
        <ViewTransition>
            <div className={className}>
                <Breadcrumb>
				<BreadcrumbList>
					{/* Home link */}
					<BreadcrumbItem>
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
					</BreadcrumbItem>

					{items.map((item, index) => {
						const isLast = index === items.length - 1;

						return (
							<div key={index} className="contents">
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									{isLast || !item.href ? (
										<BreadcrumbPage>{item.label}</BreadcrumbPage>
									) : (
										<BreadcrumbLink asChild>
											<Link href={item.href}>{item.label}</Link>
										</BreadcrumbLink>
									)}
								</BreadcrumbItem>
							</div>
						);
					})}
				</BreadcrumbList>
                </Breadcrumb>
            </div>
        </ViewTransition>
	);
}
