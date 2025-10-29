"use client";

import { useMemo, useState } from "react";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SettingsDialog } from "@/components/settings-dialog";

function getInitials(name?: string | null, email?: string | null) {
  if (name && name.trim()) {
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] ?? "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] ?? "" : "";
    const initials = `${first}${last}`.toUpperCase();
    return initials || "GU";
  }
  if (email && email.length > 0) {
    return email[0]!.toUpperCase();
  }
  return "GU";
}

export function UserAvatarMenu() {
  const { user, loading } = useAuth();
  const [showSettings, setShowSettings] = useState(false);
  const [settingsKey, setSettingsKey] = useState(0);

  const displayName = useMemo(() => {
    if (!user) return "Guest User";
    const name = [user.firstName, user.lastName].filter(Boolean).join(" ");
    return name || user.email || "User";
  }, [user]);

  const email = user?.email ?? null;
  const imageUrl = (user as any)?.profilePictureUrl ?? null;
  const initials = getInitials(displayName, email);

  if (loading) {
    return (
      <div
        aria-label="Loading user"
        className="h-8 w-8 animate-pulse rounded-full bg-muted"
      />
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger aria-label="Open user menu" asChild>
          <button className="inline-flex items-center justify-center rounded-full outline-hidden">
            <Avatar>
              {imageUrl ? (
                <AvatarImage src={imageUrl} alt={displayName} />
              ) : (
                <AvatarFallback>{initials}</AvatarFallback>
              )}
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={8} align="end" className="z-200">
          <DropdownMenuLabel>
            <div className="flex min-w-40 flex-col">
              <span className="text-sm font-medium">{displayName}</span>
              {email ? (
                <span className="text-xs text-muted-foreground">{email}</span>
              ) : null}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              if (!showSettings) setShowSettings(true);
              setSettingsKey((k) => k + 1);
            }}
          >
            Admin Panel
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {showSettings ? <SettingsDialog key={settingsKey} /> : null}
    </>
  );
}

export default UserAvatarMenu;


