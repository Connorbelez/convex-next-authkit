"use client";

import { UserAvatarMenu } from "@/components/auth/UserAvatarMenu";
import { useNavigationTransition } from "@/components/transitions/useNavigationTransition";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
	const router = useRouter();
	const pathname = usePathname();
	const { handleNavigation } = useNavigationTransition();

	const handleNavigationClick = (href: string) => {
		handleNavigation(href);
	};

	return (
		<header className="sticky top-0 z-10 bg-background p-4 border-b-2 border-slate-200 dark:border-slate-800 flex flex-row justify-between items-center">
			<div className="flex items-center gap-3">
				<span className="text-sm font-semibold tracking-tight">
					convex-next-authkit
				</span>
			</div>
			<div className="flex items-center gap-3">
				<UserAvatarMenu />
			</div>
		</header>
	);
}
