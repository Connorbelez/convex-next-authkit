import { authkitMiddleware } from '@workos-inc/authkit-nextjs';
import { NextResponse, type NextRequest } from 'next/server';

const redirectUri = process.env.NEXT_PUBLIC_WORKOS_REDIRECT_URI;
if (!redirectUri) {
  // Throwing here gives a clearer error during middleware initialization
  throw new Error(
    'Missing NEXT_PUBLIC_WORKOS_REDIRECT_URI environment variable. Please set it to your app callback URL (e.g. http://localhost:3000/callback)'
  );
}

const base = authkitMiddleware({
  eagerAuth: true,

  redirectUri,
  middlewareAuth: {
    enabled: true,
    unauthenticatedPaths: ['/', '/sign-in', '/sign-up'],
  },
});

function generateRequestId() {
  try {
    // Prefer Web Crypto API when available (Edge-safe)
    // @ts-ignore
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  } catch (e) {
    // ignore
  }
  // fallback small random id
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

export default async function proxy(req: NextRequest) {
  // call the authkit middleware first
  const res = (await base(req as any, {} as any)) as NextResponse;
  try {
    const existing = req.headers.get('x-request-id');
    const requestId = existing ?? generateRequestId();
    res.headers.set('x-request-id', requestId);
  } catch (e) {
    // swallow - logging should not break middleware
  }
  return res;
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};