Given @.cursor/rules/convex_rules.mdc and the workOS webhook payload @convex/workOSSampleWebhooks/user.created.json  create a http webhook handler to keep user creation, updates and delete in sync. the dir @convex/workOSSampleWebhooks/ has sample payloads for all of them. 
You will have to update the schema

here is an example of an implementation:

import { httpRouter } from 'convex/server';
import { internal } from './_generated/api';
import { httpAction } from './_generated/server';

const http = httpRouter();

http.route({
  path: '/workos-webhook',
  method: 'POST',
  handler: httpAction(async (ctx, request) => {
    // Read body as ArrayBuffer first to preserve exact bytes
    const bodyBuffer = await request.arrayBuffer();
    const bodyText = new TextDecoder('utf-8').decode(bodyBuffer);

    const sigHeaderRaw = request.headers.get('workos-signature');
    if (!sigHeaderRaw) {
      return new Response(
        JSON.stringify({
          status: 'error',
          message: 'Missing workos-signature header',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    const sigHeader = String(sigHeaderRaw);

    // Add additional debugging info
    console.log('HTTP Request debug:', {
      bodyLength: bodyBuffer.byteLength,
      contentType: request.headers.get('content-type'),
      userAgent: request.headers.get('user-agent'),
      signature: sigHeader,
    });

    try {
      await ctx.runAction(internal.workos.verifyWebhook, {
        payload: bodyText,
        signature: sigHeader,
      });

      const { data, event } = JSON.parse(bodyText);

      switch (event) {
        case 'user.created': {
          const res = await ctx.runMutation(internal.users.upsertFromWorkOs, {
            data: {
              idp_id: data.id,
              email: data.email,
              email_verified: data.email_verified,
              first_name: data.first_name,
              last_name: data.last_name,
              profile_picture:
                data.profile_picture_url ?? data.profile_picture ?? undefined,
              created_at: data.created_at ?? data.createdAt,
              updated_at: data.updated_at ?? data.updatedAt,
              external_id: data.external_id ?? data.externalId ?? undefined,
              metadata: data.metadata,
            },
          });

          if (!res.success) {
            throw new Error(
              `Failed to upsert user: ${res.userId}, ${res.error}`
            );
          }

          break;
        }