/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  // Configuración de Sitio
  readonly PUBLIC_SITE_URL: string;

  // Autenticación
  readonly AUTH_SECRET: string;
  readonly PUBLIC_AUTH_CALLBACK_URL: string;
  readonly GITHUB_ID: string;
  readonly GITHUB_SECRET: string;
  readonly DISCORD_ID: string;
  readonly DISCORD_SECRET: string;
  readonly GOOGLE_ID: string;
  readonly GOOGLE_SECRET: string;
  readonly FACEBOOK_ID: string;
  readonly FACEBOOK_SECRET: string;

  // AI & APIs
  readonly CLAUDE_API_KEY: string;
  readonly OPENAI_API_KEY: string;
  readonly GOOGLE_GEMINI_API_KEY: string;

  // Analíticas
  readonly PUBLIC_GA_ID: string;
  readonly PUBLIC_CLARITY_ID: string;

  // Email
  readonly RESEND_API_KEY: string;
  readonly PUBLIC_RESEND_FROM_NO_REPLY: string;
  readonly PUBLIC_RESEND_FROM_ADMIN: string;
  readonly PUBLIC_RESEND_SUPPORT_EMAIL: string;

  // Base de Datos
  readonly MONGODB_URI: string;

  // Pagos (Stripe & Mercado Pago)
  readonly PUBLIC_STRIPE_PUBLIC_KEY: string;
  readonly STRIPE_SECRET_KEY: string;
  readonly STRIPE_WEBHOOK_SECRET: string;
  readonly PUBLIC_MERCADOPAGO_PUBLIC_KEY: string;
  readonly MERCADOPAGO_PRIVATE_KEY: string;
  readonly MERCADOPAGO_ACCOUNT_ID: string;

  // Planes de Suscripción
  readonly PUBLIC_STRIPE_PRICE_STARTER: string;
  readonly PUBLIC_STRIPE_PRICE_ADVANCED: string;
  readonly PUBLIC_STRIPE_PLAN_STARTER_NAME: string;
  readonly PUBLIC_STRIPE_PLAN_STARTER_PRICE: string;

  // Branding e Interfaz
  readonly PUBLIC_APP_NAME: string;
  readonly PUBLIC_APP_DESCRIPTION: string;
  readonly PUBLIC_DOMAIN_NAME: string;
  readonly PUBLIC_CRISP_ID: string;

  // Infraestructura
  readonly PUBLIC_AWS_BUCKET: string;
  readonly PUBLIC_AWS_CDN_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}