'use cache';

import { UserAvatarMenu } from '@/components/auth/UserAvatarMenu';

export default async function Header() {
  return (
    <header className="sticky top-0 z-10 bg-background p-4 border-b-2 border-slate-200 dark:border-slate-800 flex flex-row justify-between items-center">
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold tracking-tight">convex-next-authkit</span>
      </div>
      <div className="flex items-center gap-3">
        <UserAvatarMenu />
      </div>
    </header>
  );
}