# Template_FrontEnd_Astro_JF

Template minimal basado en Astro 5.x y React 19.x.
Migra la robustez de una arquitectura empresarial de Next.js hacia la agilidad de las Islas de Astro, manteniendo separación clara de lógica de negocio mediante DDD (Domain-Driven Design).

### ⚙️ Stack

| Área | Tecnología |
|------|------------|
| Framework | Astro 5.x (SSG / SSR) |
| UI Runtime | React 19.x (Islas) |
| Estilos | Tailwind CSS 4.x + DaisyUI |
| Arquitectura | DDD (Core / Hexagonal) |
| Analíticas | GA / Clarity + Partytown |
| UX / UI Utils | Framer Motion, Lucide, Hot Toast |

---

### 🚀 Estructura del Proyecto

```
/
├── src/
│   ├── components/
│   │   ├── analytics/      # Isla de React para GA/Clarity
│   │   ├── buttons/        # Componentes atómicos (ButtonBasic.astro)
│   │   ├── layout/         # Header y Footer globales
│   │   └── ui/             # Componentes de UI complejos
│   ├── data/               # Configuración estática (configProject.ts)
│   ├── env.d.ts            # Tipos para import.meta.env
│   ├── i18n/               # Diccionarios multiidioma
│   ├── layouts/            # Plantilla maestra (Layout.astro)
│   ├── libs/               # Utilidades (cn, client-side utils)
│   ├── pages/              # Enrutado por archivos
│   └── styles/             # CSS global (Tailwind 4 @theme)
├── public/                 # Assets estáticos
├── astro.config.mjs        # Integraciones (Vite + React)
└── tsconfig.json           # TypeScript estricto
```

### 🧞 Comandos

Todos desde la raíz usando pnpm:

| Comando | Acción |
|--------|--------|
| `pnpm install` | Instala dependencias |
| `pnpm dev` | Servidor de desarrollo (localhost:4321) |
| `pnpm build` | Build de producción en `./dist/` |
| `pnpm preview` | Previsualiza el build |
| `pnpm astro sync` | Regenera tipos de Astro |

### 🧠 Arquitectura CORE (DDD)

Separación estricta de responsabilidades:

-   **Domain**: Entidades y contratos (sin dependencias externas).
    
-   **Application**: Casos de uso (lógica pura).
    
-   **Infrastructure**: Persistencia (MongoDB) y servicios externos (Stripe, APIs).

### 🧩 Variables de Entorno

-   Las variables accesibles desde cliente deben usar prefijo `PUBLIC_`.
    
-   Copiar `.env.example` a `.env.local`.
    
-   Acceso vía `import.meta.env.PUBLIC_VARIABLE_NAME`.
    
-   `src/env.d.ts` garantiza tipado y autocompletado.

### 🛠️ Configuración VSCode

File Nesting recomendado (`settings.json`):
```
"explorer.fileNesting.enabled": true,
"explorer.fileNesting.patterns": {
	"package.json": ",.eslintrc.json, next.config.js, package-lock.json, postcss.config.js, tailwind.config.ts, jsconfig.json, next-sitemap.config.js, tailwind.config.js,vercel.json,pnpm-lock.yaml,yarn.lock,tsconfig.json,postcss.config.mjs,next.config.ts,next-env.d.ts,eslint.config.mjs,.stylelintrc.json,config.ts,next-auth.d.ts,.dockerignore,Dockerfile,vite.config.ts,pnpm-workspace.yaml,astro.config.mjs,tailwind.config.mjs",
	"README.md": "tree.txt,llms.txt, AI_ARCHITECTURE.md, .cursorrules, .llmignore,.gitignore,.env.example,.env.local,.env*,config.js,configApi.js,config.ts,configApi.ts,llms.txt",
},
```