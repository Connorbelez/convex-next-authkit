'use node';

import { WorkOS } from '@workos-inc/node';
import { v } from 'convex/values';
import { internalAction } from './_generated/server';

export const verifyWebhook = internalAction({
  args: v.object({
    payload: v.string(),
    signature: v.string(),
  }),
  returns: v.any(),
  handler: async (_, args) => {
    const workos = new WorkOS(process.env.WORKOS_API_KEY);

    // Use the exact webhook secret from WorkOS dashboard
    const webhookSecret = process.env.WORKOS_WEBHOOK_SECRET;

    // WorkOS SDK bug fix applied in node_modules

    try {
      console.log('Testing WorkOS webhook with fix applied:', {
        payloadLength: args.payload.length,
        signature: args.signature,
        secretConfigured: !!webhookSecret,
      });

      const event = await workos.webhooks.constructEvent({
        payload: JSON.parse(args.payload),
        sigHeader: args.signature,
        secret: String(webhookSecret),
      });

      console.log('WorkOS SDK returned:', {
        event,
        eventType: typeof event,
        eventKeys: event ? Object.keys(event) : 'no keys - event is falsy',
        eventId: event?.id || 'no id property',
        eventName: event?.event || 'no event property',
      });

      if (!event) {
        throw new Error('WorkOS SDK returned undefined/null event object');
      }

      console.log('WorkOS webhook verification successful:', {
        eventId: event.id,
        eventType: event.event,
      });

      return event;
    } catch (error) {
      console.error('WorkOS webhook verification failed:', {
        error: error instanceof Error ? error.message : String(error),
        errorName: error instanceof Error ? error.constructor.name : 'Unknown',
        payloadLength: args.payload.length,
        signaturePresent: !!args.signature,
        secretPresent: !!webhookSecret,
      });
      throw error;
    }
  },
});

export const getUserRoleFromWorkOS = internalAction({
  args: v.object({ userId: v.string() }),
  returns: v.object({ role: v.string() }),
  handler: async (_ctx, { userId }) => {
    const workos = new WorkOS(process.env.WORKOS_API_KEY);
    try {
      const user = await workos.userManagement.getUser(userId);
      const role = (user?.metadata as Record<string, string> | undefined)?.role || 'member';
      return { role };
    } catch (_err) {
      return { role: 'member' };
    }
  },
});
