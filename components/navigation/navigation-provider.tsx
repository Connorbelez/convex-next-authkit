"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { TwoLevelNav } from "./two-level-nav";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function NavigationProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  useEffect(() => {
    // Generate breadcrumbs based on current pathname
    let newBreadcrumbs: BreadcrumbItem[] = [];

    if (pathname === "/") {
      // Home page - no breadcrumbs needed
      newBreadcrumbs = [];
    } else if (pathname.startsWith("/listings")) {
      if (pathname === "/listings") {
        // Listings index page
        newBreadcrumbs = [
          { label: "Home", href: "/" },
          { label: "Listings" }
        ];
      } else {
        // Listing detail page
        const listingMatch = pathname.match(/^\/listings\/([^/]+)/);
        if (listingMatch) {
          newBreadcrumbs = [
            { label: "Home", href: "/" },
            { label: "Listings", href: "/listings" },
            { label: "Property Details" }
          ];
        }
      }
    } else if (pathname.startsWith("/profile")) {
      newBreadcrumbs = [
        { label: "Home", href: "/" },
        { label: "Profile" }
      ];
    } else if (pathname.startsWith("/server")) {
      newBreadcrumbs = [
        { label: "Home", href: "/" },
        { label: "Server" }
      ];
    } else {
      // For other routes, generate breadcrumbs from path
      const pathSegments = pathname.split("/").filter(Boolean);
      if (pathSegments.length > 0) {
        newBreadcrumbs.push({ label: "Home", href: "/" });
        
        let currentPath = "";
        pathSegments.forEach((segment, index) => {
          currentPath += `/${segment}`;
          const isLast = index === pathSegments.length - 1;
          newBreadcrumbs.push({
            label: segment.charAt(0).toUpperCase() + segment.slice(1),
            href: isLast ? undefined : currentPath
          });
        });
      }
    }

    setBreadcrumbs(newBreadcrumbs);
  }, [pathname]);

  return (
    <>
      <TwoLevelNav breadcrumbs={breadcrumbs} />
      {children}
    </>
  );
}
