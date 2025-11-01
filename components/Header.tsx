"use client";

import { usePathname, useRouter } from "next/navigation";
import { UserAvatarMenu } from "@/components/auth/UserAvatarMenu";
import { useNavigationTransition } from "@/components/transitions/useNavigationTransition";

export default function Header() {
	const router = useRouter();
	const pathname = usePathname();
	const { handleNavigation } = useNavigationTransition();

	const handleNavigationClick = (href: string) => {
		handleNavigation(href);
	};

	return (
		<header className="sticky top-0 z-10 flex flex-row items-center justify-between border-slate-200 border-b-2 bg-background p-4 dark:border-slate-800">
			<div className="flex items-center gap-3">
				<span className="font-semibold text-sm tracking-tight">
					convex-next-authkit
				</span>
			</div>
			<div className="flex items-center gap-3">
				<UserAvatarMenu />
			</div>
		</header>
	);
}
