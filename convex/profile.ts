import { action, mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

export const getCurrentUserProfile = query({
  args: {},
  returns: v.any(),
  handler: async (ctx): Promise<any> => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return {
        user: null,
        roles: [],
        organizations: [],
        memberships: [],
        activeOrganizationId: null,
      };
    }

    const workosUserId = identity.subject;

    const user = await ctx.db
      .query("users")
      .withIndex("by_idp_id", (q) => q.eq("idp_id", workosUserId))
      .unique();

    if (!user) {
      return {
        user: null,
        roles: [],
        organizations: [],
        memberships: [],
        activeOrganizationId: null,
      };
    }

    const memberships = await ctx.db
      .query("organization_memberships")
      .withIndex("byUserId", (q) => q.eq("user_id", workosUserId))
      .collect();

    const orgIds = Array.from(new Set(memberships.map((m) => m.organization_id)));
    const organizations = [] as Array<any>;
    for (const orgId of orgIds) {
      const org = await ctx.db
        .query("organizations")
        .withIndex("byWorkosId", (q) => q.eq("id", orgId))
        .unique();
      if (org) organizations.push(org);
    }

    const roles: any = await ctx.runQuery(internal.roles.getUserRoles, { userId: user._id });

    return {
      user,
      roles,
      organizations,
      memberships,
      activeOrganizationId: user.active_organization_id ?? null,
    };
  },
});

export const updateProfile = mutation({
  args: v.object({
    first_name: v.optional(v.string()),
    last_name: v.optional(v.string()),
    phone: v.optional(v.string()),
  }),
  returns: v.object({ synced: v.boolean() }),
  handler: async (ctx, args): Promise<{ synced: boolean }> => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");
    const workosUserId = identity.subject;

    const user = await ctx.db
      .query("users")
      .withIndex("by_idp_id", (q) => q.eq("idp_id", workosUserId))
      .unique();
    if (!user) throw new Error("User not found");

    await ctx.db.patch(user._id, {
      ...(args.first_name !== undefined ? { first_name: args.first_name } : {}),
      ...(args.last_name !== undefined ? { last_name: args.last_name } : {}),
      ...(args.phone !== undefined ? { phone: args.phone } : {}),
      updated_at: new Date().toISOString(),
    });

    try {
      await ctx.scheduler.runAfter(0, internal.workos.updateUserProfile, {
        userId: workosUserId,
        firstName: args.first_name,
        lastName: args.last_name,
        phone: args.phone,
      });
      // We schedule the sync and report success of scheduling.
      return { synced: true };
    } catch (_err) {
      // If scheduling fails, report not synced.
      return { synced: false };
    }
  },
});

export const setActiveOrganization = mutation({
  args: v.object({ organization_id: v.string() }),
  returns: v.null(),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");
    const workosUserId = identity.subject;

    const membership = await ctx.db
      .query("organization_memberships")
      .withIndex("byUserOrganization", (q) =>
        q.eq("user_id", workosUserId).eq("organization_id", args.organization_id)
      )
      .unique();

    if (!membership) {
      throw new Error("Cannot set organization: not a member");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_idp_id", (q) => q.eq("idp_id", workosUserId))
      .unique();
    if (!user) throw new Error("User not found");

    await ctx.db.patch(user._id, { active_organization_id: args.organization_id });
    return null;
  },
});

export const generateUploadUrl = action({
  args: {},
  returns: v.string(),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");
    const url = await ctx.storage.generateUploadUrl();
    return url;
  },
});

export const saveProfilePicture = mutation({
  args: v.object({ storageId: v.id("_storage") }),
  returns: v.null(),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");
    const workosUserId = identity.subject;

    const user = await ctx.db
      .query("users")
      .withIndex("by_idp_id", (q) => q.eq("idp_id", workosUserId))
      .unique();
    if (!user) throw new Error("User not found");

    const url = await ctx.storage.getUrl(args.storageId);
    if (!url) throw new Error("File not found");

    await ctx.db.patch(user._id, {
      profile_picture_url: url,
      profile_picture: url,
      updated_at: new Date().toISOString(),
    });

    return null;
  },
});

export const syncOrganizationsFromWorkOS = action({
  args: {},
  returns: v.object({
    success: v.boolean(),
    message: v.string(),
    organizationsSynced: v.number(),
  }),
  handler: async (ctx): Promise<{
    success: boolean;
    message: string;
    organizationsSynced: number;
  }> => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");
    const workosUserId = identity.subject;

    const result = await ctx.runAction(internal.workos.syncUserOrganizations, {
      userId: workosUserId,
    });
    return result;
  },
});



