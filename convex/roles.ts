import { v } from "convex/values";
import { internalMutation, internalQuery } from "./_generated/server";
import schema from "./schema";

const roleFields = schema.tables.roles.validator.fields;
const userRoleFields = schema.tables.user_roles.validator.fields;

// Create or update a role based on WorkOS webhook data
export const createOrUpdateRole = internalMutation({
	args: v.object({
		slug: v.string(),
		name: v.optional(v.string()),
		permissions: v.optional(v.array(v.string())),
		created_at: v.optional(v.string()),
		updated_at: v.optional(v.string()),
	}),
	handler: async (ctx, args) => {
		const existingRole = await ctx.db
			.query("roles")
			.withIndex("by_slug", (q) => q.eq("slug", args.slug))
			.unique();

		if (existingRole) {
			// Update existing role
			await ctx.db.patch(existingRole._id, {
				name: args.name,
				permissions: args.permissions,
				updated_at: args.updated_at,
			});
			console.log("Role updated:", {
				roleId: existingRole._id,
				slug: args.slug,
				permissions: args.permissions,
			});
			return existingRole._id;
		}
		// Create new role
		const roleId = await ctx.db.insert("roles", {
			slug: args.slug,
			name: args.name,
			permissions: args.permissions,
			created_at: args.created_at,
			updated_at: args.updated_at,
		});
		console.log("Role created:", {
			roleId,
			slug: args.slug,
			permissions: args.permissions,
		});
		return roleId;
	},
});

// Delete a role based on WorkOS webhook data
export const deleteRole = internalMutation({
	args: v.object({
		slug: v.string(),
	}),
	handler: async (ctx, args) => {
		const existingRole = await ctx.db
			.query("roles")
			.withIndex("by_slug", (q) => q.eq("slug", args.slug))
			.unique();

		if (!existingRole) {
			console.log("Role not found for deletion:", { slug: args.slug });
			return { success: false, message: "Role not found" };
		}

		// Delete all user role assignments for this role first
		const userRoleAssignments = await ctx.db
			.query("user_roles")
			.withIndex("by_roleSlug", (q) => q.eq("roleSlug", args.slug))
			.collect();

		for (const assignment of userRoleAssignments) {
			await ctx.db.delete(assignment._id);
		}

		// Delete the role
		await ctx.db.delete(existingRole._id);

		console.log("Role deleted:", {
			roleId: existingRole._id,
			slug: args.slug,
			assignmentsDeleted: userRoleAssignments.length,
		});

		return { success: true, message: "Role deleted successfully" };
	},
});

// Assign a role to a user
export const assignRoleToUser = internalMutation({
	args: v.object({
		userId: v.id("users"),
		roleSlug: v.string(),
		assignedAt: v.optional(v.string()),
	}),
	handler: async (ctx, args) => {
		// Check if user exists
		const user = await ctx.db.get(args.userId);
		if (!user) {
			throw new Error(`User not found: ${args.userId}`);
		}

		// Check if role exists
		const role = await ctx.db
			.query("roles")
			.withIndex("by_slug", (q) => q.eq("slug", args.roleSlug))
			.unique();

		if (!role) {
			throw new Error(`Role not found: ${args.roleSlug}`);
		}

		// Check if assignment already exists
		const existingAssignment = await ctx.db
			.query("user_roles")
			.withIndex("by_user_role", (q) =>
				q.eq("userId", args.userId).eq("roleSlug", args.roleSlug)
			)
			.unique();

		if (existingAssignment) {
			console.log("User role assignment already exists:", {
				userId: args.userId,
				roleSlug: args.roleSlug,
			});
			return existingAssignment._id;
		}

		// Create new assignment
		const assignmentId = await ctx.db.insert("user_roles", {
			userId: args.userId,
			roleSlug: args.roleSlug,
			assignedAt: args.assignedAt || new Date().toISOString(),
		});

		console.log("Role assigned to user:", {
			assignmentId,
			userId: args.userId,
			roleSlug: args.roleSlug,
		});

		return assignmentId;
	},
});

// Remove a role from a user
export const removeRoleFromUser = internalMutation({
	args: v.object({
		userId: v.id("users"),
		roleSlug: v.string(),
	}),
	handler: async (ctx, args) => {
		const assignment = await ctx.db
			.query("user_roles")
			.withIndex("by_user_role", (q) =>
				q.eq("userId", args.userId).eq("roleSlug", args.roleSlug)
			)
			.unique();

		if (!assignment) {
			console.log("User role assignment not found:", {
				userId: args.userId,
				roleSlug: args.roleSlug,
			});
			return { success: false, message: "Assignment not found" };
		}

		await ctx.db.delete(assignment._id);

		console.log("Role removed from user:", {
			assignmentId: assignment._id,
			userId: args.userId,
			roleSlug: args.roleSlug,
		});

		return { success: true, message: "Role removed successfully" };
	},
});

// Get all roles for a user
export const getUserRoles = internalQuery({
	args: v.object({
		userId: v.id("users"),
	}),
	handler: async (ctx, args) => {
		const assignments = await ctx.db
			.query("user_roles")
			.withIndex("by_userId", (q) => q.eq("userId", args.userId))
			.collect();

		const roleSlugs = assignments.map((assignment) => assignment.roleSlug);

		if (roleSlugs.length === 0) {
			return [];
		}

		// Get role details for all assigned roles
		const roles = await ctx.db.query("roles").collect();

		return roles.filter((role) => roleSlugs.includes(role.slug));
	},
});

// Get a single role by slug
export const getRoleBySlug = internalQuery({
	args: v.object({
		slug: v.string(),
	}),
	handler: async (ctx, args) =>
		await ctx.db
			.query("roles")
			.withIndex("by_slug", (q) => q.eq("slug", args.slug))
			.unique(),
});
