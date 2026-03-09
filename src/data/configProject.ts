// src/data/configProject.ts
const configProject = {
  // ======================================================
  // 🧩 PROYECTO (metadata / web)
  // ======================================================
  appName: "<Astro Astro Place holder>",
  appDescription: "<Astro Place holder>",
  domainName: "website.placeholder.com",
  siteUrl: import.meta.env.PUBLIC_SITE_URL || "http://localhost:4321",

  // ======================================================
  // 🌐 METADATOS / SEO
  // ======================================================
  language: "en-US",
  themeColor: "#000000",
  colors: {
    main: "#111111",
    background: "#000000",
    foreground: "#ffffff",
  },
  keywords: ["placeholder", "example"],
  author: "<Astro Place holder>",
  twitter: "@<Astro Place holder>",

  // Rutas hacia imágenes base
  images: {
    ogDefault: "/images/placeholder.webp",
    twitterCard: "/images/placeholder.webp",
    favicon: "/favicon.ico",
    icon16: "/favicon.ico",
    icon32: "/favicon.ico",
    icon192: "/images/placeholder-192.png",
    icon512: "/images/placeholder-512.png",
    appleTouch: "/images/placeholder-apple.png",
    safariMask: "/images/placeholder-mask.png",
  },

  // ======================================================
  // 💬 SOPORTE / CONTACTO (público)
  // ======================================================
  support: {
    email: "correo@placeholder.com",
  },

  // ======================================================
  // ✉️ RESEND (client-side references)
  // ======================================================
  resend: {
    fromAdmin: "admin@placeholder.com",
    fromNoReply: "noreply@placeholder.com",
  },

  // ======================================================
  // 🔗 REDES SOCIALES (para JSON-LD)
  // ======================================================
  socials: {
    github: "https://github.com/placeholder",
    linkedin: "https://linkedin.com/placeholder",
    twitter: "https://twitter.com/placeholder",
    instagram: "https://instagram.com/placeholder",
  },

  // ======================================================
  // 📣 MARKETING (placeholders)
  // ======================================================
  marketing: {
    tagline: "<Astro Place holder>",
    testimonials: {
      headline: "<Astro Place holder>",
      subhead: "<Astro Place holder>",
      items: [],
    },
  },
};

export default configProject;