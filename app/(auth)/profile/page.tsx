"use client";

import { useEffect, useMemo, useState } from "react";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Camera, Pencil, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_MEMBERSHIPS, MOCK_ORGS } from "@/lib/mock-data/organizations";

type ProfileData = {
  user: any;
  roles: Array<{ slug: string; name?: string }>;
  organizations: Array<any>;
  memberships: Array<any>;
  activeOrganizationId: string | null;
};

function getInitials(first?: string | null, last?: string | null, email?: string | null) {
  const name = [first, last].filter(Boolean).join(" ");
  if (name.trim()) {
    const parts = name.trim().split(/\s+/);
    return `${parts[0]?.[0] ?? ""}${parts.length > 1 ? parts[parts.length - 1][0] ?? "" : ""}`.toUpperCase() || "U";
  }
  if (email && email.length > 0) return email[0]!.toUpperCase();
  return "U";
}

export default function ProfilePage() {
  const { user: authUser } = useAuth();
  const data = useQuery(api.profile.getCurrentUserProfile, {});
  const updateProfile = useMutation(api.profile.updateProfile);
  const setActiveOrg = useMutation(api.profile.setActiveOrganization);
  const generateUploadUrl = useAction(api.profile.generateUploadUrl);
  const saveProfilePicture = useMutation(api.profile.saveProfilePicture);
  const syncOrganizations = useAction(api.profile.syncOrganizationsFromWorkOS);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [activeOrg, setActiveOrgLocal] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [usingMocks, setUsingMocks] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const composed: ProfileData | undefined = useMemo(() => {
    if (!data) return undefined;
    let organizations = data.organizations ?? [];
    let memberships = data.memberships ?? [];
    let usedMock = false;
    if (organizations.length === 0) {
      organizations = [...MOCK_ORGS];
      const uid = data.user?.idp_id ?? "mock-user";
      memberships = MOCK_MEMBERSHIPS(uid);
      usedMock = true;
    }
    return { ...data, organizations, memberships, activeOrganizationId: data.activeOrganizationId } as ProfileData;
  }, [data]);

  useEffect(() => {
    if (!data) return;
    setFirstName(data.user?.first_name ?? "");
    setLastName(data.user?.last_name ?? "");
    setPhone(data.user?.phone ?? "");
    setActiveOrgLocal(data.activeOrganizationId ?? "");
    setUsingMocks((data.organizations?.length ?? 0) === 0);
  }, [data]);

  const dirty = useMemo(() => {
    if (!data?.user) return false;
    return (
      firstName !== (data.user.first_name ?? "") ||
      lastName !== (data.user.last_name ?? "") ||
      phone !== (data.user.phone ?? "") ||
      activeOrg !== (data.activeOrganizationId ?? "")
    );
  }, [data, firstName, lastName, phone, activeOrg]);

  const displayName = [firstName || data?.user?.first_name, lastName || data?.user?.last_name]
    .filter(Boolean)
    .join(" ") || authUser?.email || "User";

  async function onSave() {
    if (!data?.user) return;
    setIsSaving(true);
    try {
      const res = await updateProfile({ first_name: firstName, last_name: lastName, phone: phone });
      if (!res.synced) {
        toast.warning("Saved locally. WorkOS sync will retry later.");
      } else {
        toast.success("Profile updated");
      }
    } catch (e: any) {
      toast.error(e?.message || "Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  }

  async function onChangeOrg(value: string) {
    setActiveOrgLocal(value);
    try {
      await setActiveOrg({ organization_id: value });
      toast.success("Organization updated");
    } catch (e: any) {
      toast.error(e?.message || "Unable to change organization");
    }
  }

  async function onPickAvatar(file: File) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be ≤ 5MB");
      return;
    }
    setUploading(true);
    try {
      const uploadUrl = await generateUploadUrl({});
      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const json = await res.json();
      const storageId = json.storageId as string;
      await saveProfilePicture({ storageId });
      toast.success("Profile picture updated");
    } catch (e: any) {
      toast.error(e?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function onSyncOrganizations() {
    setIsSyncing(true);
    try {
      const result = await syncOrganizations();
      if (result.success) {
        toast.success(result.message);
        // Invalidate the current query to refetch data
        window.location.reload();
      } else {
        toast.error(result.message);
      }
    } catch (e: any) {
      toast.error(e?.message || "Failed to sync organizations");
    } finally {
      setIsSyncing(false);
    }
  }

  if (data === undefined) {
    return (
      <div className="mx-auto w-full max-w-[1120px] px-4 py-8 space-y-6">
        <Skeleton className="h-40 w-full" />
        <div className="grid gap-6 lg:grid-cols-12">
          <Skeleton className="h-80 w-full lg:col-span-4" />
          <Skeleton className="h-80 w-full lg:col-span-8" />
        </div>
      </div>
    );
  }

  const imageUrl = data?.user?.profile_picture_url || data?.user?.profile_picture || (authUser as any)?.profilePictureUrl || "";
  const email = data?.user?.email ?? authUser?.email ?? "";
  const roles = (data?.roles ?? []) as Array<{ slug: string; name?: string }>;

  return (
    <div className="mx-auto w-full max-w-[1180px] px-4 py-8 space-y-6">
      <Toaster />

      {/* Hero Header */}
      <Card className="relative overflow-hidden border bg-linear-to-br from-muted/40 via-background to-background p-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <Avatar className="h-20 w-20 border">
              {imageUrl ? (
                <AvatarImage src={imageUrl} alt={displayName} />
              ) : (
                <AvatarFallback className="text-lg">{getInitials(firstName, lastName, email)}</AvatarFallback>
              )}
            </Avatar>
            <label className="absolute -bottom-1 -right-1 inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border bg-background shadow" aria-label="Change profile picture">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void onPickAvatar(f);
                }}
              />
              {uploading ? <Upload className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
            </label>
          </div>
          <div className="min-w-0">
            <div className="text-xl font-semibold tracking-tight truncate">{displayName}</div>
            <div className="text-sm text-muted-foreground truncate">{email}</div>
          </div>
        </div>
      </Card>

      {usingMocks ? (
        <Card className="border border-dashed p-4 text-sm">
          Using demo organizations for preview. Connect WorkOS orgs to see real memberships.
        </Card>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left rail (≈38%) */}
        <div className="space-y-6 lg:col-span-4">
          <Card className="p-5">
            <div className="mb-3 text-sm font-medium">Roles</div>
            <div className="flex flex-wrap gap-2">
              {roles.length === 0 ? <span className="text-sm text-muted-foreground">No roles</span> : null}
              {roles.map((r) => (
                <Badge key={r.slug} variant="secondary" className="capitalize">
                  {r.name || r.slug}
                </Badge>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <div className="mb-3 text-sm font-medium">Organization</div>
            <Select value={activeOrg} onValueChange={(v) => void onChangeOrg(v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select organization" />
              </SelectTrigger>
              <SelectContent>
                {(composed?.organizations ?? []).map((o) => (
                  <SelectItem key={o.id} value={o.id}>
                    {o.name}
                    {o.isMock ? " (Demo)" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {usingMocks && (
              <div className="mt-3">
                <Button
                  onClick={() => void onSyncOrganizations()}
                  disabled={isSyncing}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  {isSyncing ? "Syncing..." : "Sync Organizations from WorkOS"}
                </Button>
              </div>
            )}
          </Card>
        </div>

        {/* Right content (≈62%) */}
        <div className="space-y-6 lg:col-span-8">
          <Card className="p-5">
            <div className="mb-4 text-sm font-medium">Personal Information</div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first">First name</Label>
                <Input id="first" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last">Last name</Label>
                <Input id="last" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="email">Email (read-only)</Label>
                <Input id="email" value={email} readOnly disabled />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +1 415 555 2671"
                />
              </div>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <Button onClick={() => void onSave()} disabled={!dirty || isSaving}>
                {isSaving ? "Saving..." : "Save changes"}
              </Button>
              {!dirty ? <span className="text-sm text-muted-foreground">All changes saved</span> : null}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}


