// ../data/configProject.ts
export const configProject = {
  // ======================================================
  // 🧩 PROYECTO (metadata / web)
  // ======================================================
  appName: "<Astro Placeholder for AppName>",
  tabname: "<Astro Placeholder for TabName>",
  appDescription: "<Astro Placeholder for Description>",
  ogTitle: "<Astro Placeholder for preview name>",
  ogDescription: "<Astro Placeholder for preview description>",
  domainName: "placeholder.com",
  siteUrl: "https://placeholder.com",
  copyright_es: `© ${new Date().getFullYear()} — Todos los derechos reservados.`,
  copyright_en: `© ${new Date().getFullYear()} — All rights reserved.`,

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
  keywords: ["placeholder"],
  author: "Tierra Hueca Studio",
  twitter: "@placeholder",

  // Rutas hacia imágenes base
  // se recomienda qué las imagenes sean de 1200x630px para OG y 1024x512px para Twitter
  images: {
    ogDefault: "/PageCover/cover.webp",
    twitterCard: "/PageCover/cover.webp",
    favicon: "/PageCover/favicon.ico",
    icon16: "/PageCover/favicon.ico",
    icon32: "/PageCover/favicon.ico",
    icon192: "/PageCover/cover.webp",
    icon512: "/PageCover/cover.webp",
    appleTouch: "/PageCover/cover.webp",
    safariMask: "/PageCover/cover.webp",
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

  // ======================================================
  // 🧭 NAVEGACION (labels y rutas i18n)
  // ======================================================
  navigation: {
    ES: {
      home: { label: "Inicio", href: "/" },
      services: {
        label: "Servicios",
        childrens: [
          { label: "Submenu 1", href: "/CV" },
          { label: "Submenu 2", href: "/404" },
        ],
      },
    },
    EN: {
      home: { label: "Home", href: "/" },
      services: {
        label: "Services",
        childrens: [
          { label: "Submenu 1", href: "/CV" },
          { label: "Submenu 2", href: "/404" },
        ],
      },
    },
  },
};
