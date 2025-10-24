import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

// The schema is entirely optional.
// You can delete this file (schema.ts) and the
// app will continue to work.
// The schema provides more precise TypeScript types.
export default defineSchema({
  numbers: defineTable({
    value: v.number(),
  }),
  users: defineTable({
    // WorkOS user ID - primary identifier for webhooks
    idp_id: v.string(),
    // Basic user information
    email: v.string(),
    email_verified: v.boolean(),
    first_name: v.optional(v.string()),
    last_name: v.optional(v.string()),
    profile_picture_url: v.optional(v.string()),
    profile_picture: v.optional(v.string()), // Handle both field names for compatibility
    // Timestamps from WorkOS
    created_at: v.optional(v.string()),
    updated_at: v.optional(v.string()),
    last_sign_in_at: v.optional(v.string()),
    // External system integration
    external_id: v.optional(v.string()),
    // Flexible metadata storage
    metadata: v.optional(v.any()),
  })
    .index('by_idp_id', ['idp_id'])
    .index('by_email', ['email']),
});
