import { httpRouter } from 'convex/server';
import { internal } from './_generated/api';
import { httpAction } from './_generated/server';

const http = httpRouter();

const normalizeNullToUndefined = <T extends Record<string, unknown>>(obj: T): T => {
  Object.keys(obj).forEach((key) => {
    const k = key as keyof T;
    if (obj[k] === null) {
      obj[k] = undefined as any;
    }
  });
  return obj;
}

// Health check endpoint for webhook testing
http.route({
  path: '/workos-webhook/health',
  method: 'GET',
  handler: httpAction(async () => {
    return new Response(
      JSON.stringify({
        status: 'healthy',
        message: 'WorkOS webhook endpoint is active',
        timestamp: new Date().toISOString(),
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }),
});

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
      // Verify webhook signature
      const event = await ctx.runAction(internal.workos.verifyWebhook, {
        payload: bodyText,
        signature: sigHeader,
      });

      const { data, event: eventType } = JSON.parse(bodyText);

      console.log('Processing WorkOS webhook event:', {
        eventId: event.id,
        eventType,
        userId: data.id,
        email: data.email,
      });

      // Handle different webhook events
      switch (eventType) {
        case 'user.created': {
          console.log('Processing user.created event');
          const res = await ctx.runMutation(internal.users.create, {
            idp_id: data.id,
            email: data.email,
            email_verified: data.email_verified,
            first_name: data.first_name ?? undefined,
            last_name: data.last_name ?? undefined,
            profile_picture:
              data.profile_picture_url ?? data.profile_picture ?? undefined,
            created_at: data.created_at ?? data.createdAt,
            updated_at: data.updated_at ?? data.updatedAt ?? undefined,
            last_sign_in_at: data.last_sign_in_at ?? undefined,
            external_id: data.external_id ?? data.externalId ?? undefined,
            metadata: data.metadata,
          });

          if (!res) {
            console.error('Failed to upsert user:', {
              userId: data.id,
              email: data.email,
            });
            throw new Error(`Failed to upsert user: ${data.idp_id} RES: ${res}`);
          }

          console.log('Successfully processed user.created event:', {
            userId: res._id,
            workosId: data.id,
            email: data.email,
          });

          break;
        }

        default: {
          console.log('Received unhandled webhook event:', {
            eventType,
            eventId: event.id,
          });

          // Return success for unhandled events to avoid WorkOS retrying
          return new Response(
            JSON.stringify({
              status: 'success',
              message: `Event type ${eventType} received but not handled`,
              eventId: event.id,
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
          );
        }
      }

      // Return success response for processed events
      return new Response(
        JSON.stringify({
          status: 'success',
          message: `Successfully processed ${eventType} event`,
          eventId: event.id,
          timestamp: new Date().toISOString(),
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );

    } catch (error) {
      console.error('Webhook processing failed:', {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        bodyLength: bodyBuffer.byteLength,
        signaturePresent: !!sigHeader,
      });

      // Return error response
      return new Response(
        JSON.stringify({
          status: 'error',
          message: 'Webhook processing failed',
          error: error instanceof Error ? error.message : String(error),
          timestamp: new Date().toISOString(),
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  }),
});

export default http;