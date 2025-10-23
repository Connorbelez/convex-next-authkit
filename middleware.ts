import { authkitMiddleware } from '@workos-inc/authkit-nextjs';

const redirectUri = process.env.NEXT_PUBLIC_WORKOS_REDIRECT_URI;
if (!redirectUri) {
  // Throwing here gives a clearer error during middleware initialization
  throw new Error(
    'Missing NEXT_PUBLIC_WORKOS_REDIRECT_URI environment variable. Please set it to your app callback URL (e.g. http://localhost:3000/callback)'
  );
}

export default authkitMiddleware({
  eagerAuth: true,
  redirectUri,
  middlewareAuth: {
    enabled: true,
    unauthenticatedPaths: ['/', '/sign-in', '/sign-up'],
  },
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
