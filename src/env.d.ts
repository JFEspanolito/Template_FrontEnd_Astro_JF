/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  // Core
  readonly SITE_URL: string;

  // Database
  readonly MONGODB_URI: string;

  // AI APIs
  readonly CLAUDE_API_KEY: string;
  readonly OPENAI_API_KEY: string;
  readonly GOOGLE_GEMINI_API_KEY: string;

  // Auth
  readonly AUTH_SECRET: string;
  readonly AUTH_TRUST_HOST: string;

  readonly GITHUB_ID: string;
  readonly GITHUB_SECRET: string;
  readonly GOOGLE_ID: string;
  readonly GOOGLE_SECRET: string;

  // Email
  readonly RESEND_API_KEY: string;

  // Payments (server)
  readonly STRIPE_SECRET_KEY: string;
  readonly STRIPE_WEBHOOK_SECRET: string;

  // Analytics
  readonly PUBLIC_GA_ID: string;
  readonly PUBLIC_CLARITY_ID: string;
  readonly PUBLIC_CRISP_ID: string;

  // Payments (client)
  readonly PUBLIC_STRIPE_KEY: string;
  readonly PUBLIC_MERCADOPAGO_KEY: string;

  // Branding
  readonly PUBLIC_APP_NAME: string;
  readonly PUBLIC_APP_DESCRIPTION: string;
  readonly PUBLIC_DOMAIN_NAME: string;

  // UI
  readonly PUBLIC_DEFAULT_THEME: string;
  readonly PUBLIC_DEFAULT_LANG: string;

  // Stripe Plans
  readonly PUBLIC_STRIPE_PRICE_STARTER: string;
  readonly PUBLIC_STRIPE_PRICE_ADVANCED: string;

  readonly PUBLIC_STRIPE_PLAN_STARTER_NAME: string;
  readonly PUBLIC_STRIPE_PLAN_STARTER_PRICE: string;
  readonly PUBLIC_STRIPE_PLAN_ADVANCED_NAME: string;
  readonly PUBLIC_STRIPE_PLAN_ADVANCED_PRICE: string;

  // Storage
  readonly PUBLIC_AWS_BUCKET: string;
  readonly PUBLIC_AWS_BUCKET_URL: string;
  readonly PUBLIC_AWS_CDN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}