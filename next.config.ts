import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const ContentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com https://www.recaptcha.net https://www.googletagmanager.com https://t.contentsquare.net https://www.clarity.ms https://scripts.clarity.ms https://assets.apollo.io",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.fontshare.com",
  "img-src 'self' data: blob: https:",
  "object-src 'none'",
  "font-src 'self' data: https://fonts.gstatic.com https://api.fontshare.com",
  isDev
    ? "connect-src 'self' https: http://localhost:* http://127.0.0.1:* ws://127.0.0.1:* ws://localhost:*"
    : "connect-src 'self' https:",
  "form-action 'self' https://formsubmit.co",
  "frame-src https://www.google.com https://www.recaptcha.net https://formsubmit.co https://www.googletagmanager.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,

  images: {
    minimumCacheTTL: 31536000,
    qualities: [70, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.marmasec.com",
      },
      {
        protocol: "https",
        hostname: "marma-security.vercel.app",
      },
      {
        protocol: "https",
        hostname: "logo.clearbit.com",
      },
      {
        protocol: "https",
        hostname: "dunytgqgpv9fu.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "*.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "*.amplifyapp.com",
      },
    ],
  },

  async headers() {
    return [
      // ─── Security headers on ALL routes ───────────────────────────────
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy,
          },
        ],
      },

      // ─── Cache headers  ──────────────
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/favicon.ico",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
