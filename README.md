# Template_FrontEnd_Astro_JF

Template minimal basado en Astro 5.x y React 19.x.
Migra la robustez de una arquitectura empresarial de Next.js hacia la agilidad de las Islas de Astro, manteniendo separación clara de lógica de negocio mediante DDD (Domain-Driven Design).

### ⚙️ Stack

| Área          | Tecnología                       |
| ------------- | -------------------------------- |
| Framework     | Astro 5.x (SSG / SSR)            |
| UI Runtime    | React 19.x (Islas)               |
| Estilos       | Tailwind CSS 4.x + DaisyUI       |
| Arquitectura  | DDD (Core / Hexagonal)           |
| Analíticas    | GA / Clarity + Partytown         |
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

| Comando           | Acción                                  |
| ----------------- | --------------------------------------- |
| `pnpm install`    | Instala dependencias                    |
| `pnpm dev`        | Servidor de desarrollo (localhost:4321) |
| `pnpm build`      | Build de producción en `./dist/`        |
| `pnpm preview`    | Previsualiza el build                   |
| `pnpm astro sync` | Regenera tipos de Astro                 |

### 🧠 Arquitectura CORE (DDD)

Separación estricta de responsabilidades:

- **Domain**: Entidades y contratos (sin dependencias externas).
- **Application**: Casos de uso (lógica pura).
- **Infrastructure**: Persistencia (MongoDB) y servicios externos (Stripe, APIs).

### 🧩 Variables de Entorno

- Las variables accesibles desde cliente deben usar prefijo `PUBLIC_`.
- Copiar `.env.example` a `.env.local`.
- Acceso vía `import.meta.env.PUBLIC_VARIABLE_NAME`.
- `src/env.d.ts` garantiza tipado y autocompletado.

### 🛠️ Scripts útiles

Generar árbol de directorios (Windows):

```
winget install GerdHoffmann.Tree
& "C:\Program Files (x86)\GnuWin32\bin\tree.exe" -I 'node_modules|.next' > tree.txt
```

Scripts de mantenimiento ubicados en la carpeta `scripts/`.

### 1. `convert_pdf_to_jpg.js`

Convierte la primera página de un PDF a imagen JPG.

**Requisitos:**

1.  **Ghostscript:**
    - Descarga: [Ghostscript Releases](https://github.com/ArtifexSoftware/ghostpdl-downloads/releases)
    - Busca el instalador (ej: `gs10060w64.exe`).
    - ⚠️ **Importante:** Marca la casilla "Add to PATH" durante la instalación.
    - Verificar versión: `gswin64c -version`

**Uso:**

```
node scripts/convert_pdf_to_jpg.js
```

### 2. `convert-images-to-webp.js`

Convierte imágenes `.png`, `.jpg`, `.jpeg` y `.svg` a formato moderno `.webp` en las mismas ubicaciones. Conserva los originales.

**Dependencias:**

```
npm i sharp glob
```

**Uso:**

```
node scripts/convert-images-to-webp.js
```

### 3. `convert-audio-to-webm.js`

Convierte archivos de audio (`.mp3`, `.wav`, `.m4a`, `.aac`, `.ogg`) a `.webm` (codec Opus). Conserva los originales.

**Requisitos:**

- **FFmpeg:** Debe estar instalado y agregado a las variables de entorno (PATH).
- (Opcional) `npm i glob`
- **Uso:**

```
node scripts/convert-audio-to-webm.js
```

### 4. `normalize-names.js`

Normaliza nombres de archivos y carpetas (elimina acentos, espacios por guiones bajos, pasa a minúsculas).

**Flujo de trabajo recomendado:**

- Navega a la carpeta que quieres normalizar.
- Ejecuta el script apuntando a su ubicación.

**Uso:**

```
# 1. Ir a la carpeta objetivo
cd "ruta/a/tu/carpeta/public/certificates"

# 2. Ejecutar script (ajusta la ruta según donde estés)
node "../../scripts/normalize-names.js" -r
```

**Modo prueba (Simulacro - No cambia nada, solo muestra logs):**

```
node "../../scripts/normalize-names.js" --dry
```

### 💻 VSCode recomendado

Configuración sugerida para ocultar ruido visual y mejorar la legibilidad.
VSCode Setting JSon

```
AppData\Roaming\Code\User\settings.json
```

File Nesting & Exclusions:

```
  "explorer.fileNesting.enabled": true,
  "explorer.fileNesting.patterns": {
    "package.json": ",.eslintrc.json, next.config.js, package-lock.json, postcss.config.js, tailwind.config.ts, jsconfig.json, next-sitemap.config.js, tailwind.config.js,vercel.json,pnpm-lock.yaml,yarn.lock,tsconfig.json,postcss.config.mjs,next.config.ts,next-env.d.ts,eslint.config.mjs,.stylelintrc.json,config.ts,next-auth.d.ts,.dockerignore,Dockerfile,vite.config.ts,pnpm-workspace.yaml,astro.config.mjs,tailwind.config.mjs",
    "README.md": "tree.txt,llms.txt, AI_ARCHITECTURE.md, .cursorrules, .llmignore,.gitignore,.env.example,.env.local,.env*,config.js,configApi.js,config.ts,configApi.ts,llms.md",
  },
  "files.exclude": {
    ".astro": true,
    ".next": true,
    ".vscode": true,
    "**/.agent": true,
    "**/.claude": true,
    "**/.codex": true,
    "**/.cursor": true,
    "**/.gemini": true,
    "**/.opencode": true,
    "dist": true,
    "node_modules": true
  },
```

Colores de interfaz (High Contrast Selection):

```
"workbench.colorCustomizations": {
    //Selector Color
    "editor.selectionBackground": "#ffd54f80",
    "editor.selectionForeground": "#000000",
    "editor.inactiveSelectionBackground": "#ffecb340",

    "editor.selectionHighlightBackground": "#00000000",
    "editor.wordHighlightBackground": "#00000000",
    "editor.wordHighlightStrongBackground": "#00000000",

    // Apagar barras amarillas de resultados de búsqueda
    "editor.rangeHighlightBackground": "#00000000",

    // Colores personalizados para búsqueda (amarillo transparente)
    "editor.findMatchBackground": "#ffeb3b99",
    "editor.findMatchHighlightBackground": "#ffeb3b55",
    "editor.findRangeHighlightBackground": "#ffeb3b33",
    "editor.findMatchBorder": "#ffeb3b",
    "editor.findMatchHighlightBorder": "#ffeb3b"
},
```
