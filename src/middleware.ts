import { defineMiddleware } from "astro:middleware";

/**
 * Security headers middleware.
 *
 * - output: "server" / "hybrid" → headers applied on every request at runtime.
 * - output: "static" (default)  → headers applied at build-time only (dev + preview).
 *   For production static hosting, configure headers via your platform:
 *   Vercel  → vercel.json "headers"
 *   Netlify → public/_headers
 *   Cloudflare Pages → public/_headers
 */
export const onRequest = defineMiddleware(async (_context, next) => {
  const response = (await next()) as Response;

  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  return response;
});
