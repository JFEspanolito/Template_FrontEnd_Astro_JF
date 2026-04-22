# Portfolio BoilerPlate (Protocolo Alpha)

Template de grado industrial basado en **Astro 5.x** y **React 19.x**. Diseñado para portafolios técnicos que exigen una separación estricta entre la lógica de negocio (DDD) y la capa de presentación, optimizando el tiempo de carga mediante hidratación selectiva.

## 0. AI Governance & Protocols

Este repositorio no es solo código; es un entorno dirigido. La carpeta `AI/` contiene el cerebro del proyecto:

* **ARCHITECTURE_BLUEPRINT.md**: Define la ley sobre el uso de Islas, SSR y la política de Zero-JS por defecto.
* **SECURITY_FIREWALL.md**: Protocolos de defensa contra fugas de secretos y validación de inyecciones.
* **DESIGN_SYSTEM.md**: Firewall visual que prohíbe el uso de valores crudos (Hex/RGBA), forzando el uso de tokens semánticos en Tailwind 4.
* **Agents.md**: Manual de operaciones para que cualquier agente de IA (Claude, GPT, Gemini) entienda sus límites y capacidades dentro del hangar.

---

### 1. Clonación e Instalación

```bash
git clone https://github.com/JFEspanolito/Template_FrontEnd_Astro_JF.git
cd Template_FrontEnd_Astro_JF
pnpm install

```

### 2. Configuración de Infraestructura

Copia el manifiesto de variables de entorno y configura tus sensores:

```bash
cp env.example .env.local

```

---

## 2. Stack Tecnológico

| Área | Tecnología |
| --- | --- |
| **Framework** | Astro 5.x (SSG / SSR selectivo) |
| **UI Runtime** | React 19.x (Hydration Islands) |
| **Estado Global** | Nano Stores (Agnóstico al framework) |
| **Estilos** | Tailwind CSS 4.x + DaisyUI 5.x |
| **Arquitectura** | DDD (Core / Hexagonal Layers) |
| **Testing** | Vitest (Protocolo TDD Obligatorio) |

---

## 3. Estructura del Hangar (Tree Map)

```text
src/
 ├─ app/                  # Orquestación de rutas y lógica de servidor
 ├─ components/
 │   ├─ analytics/        # Componentes de telemetría (Partytown)
 │   ├─ ui/               # Islas de React (Modal, STLViewer)
 │   └─ shared/           # Componentes atómicos .astro
 ├─ core/                 # Lógica de negocio (Independiente del framework)
 ├─ store/                # Estados compartidos vía Nano Stores
 ├─ i18n/                 # Diccionarios y lógica de lenguaje
 ├─ data/                 # Configuración de proyecto y CV
 └─ styles/               # CSS global y @theme tokens
AI/                       # Reglas de gobernanza y habilidades
 ├─ rules/                # Protocolos DDD, TDD y Design System
 ├─ skills/               # Habilidades especializadas para agentes
 └─ specs/                # FEATURES_INDEX.md

```

---

## 4. Gestión de Estado: Nano Stores

En Astro, el uso de Context API de React es un antipatrón que rompe la comunicación entre islas de diferentes frameworks. Este proyecto utiliza **Nano Stores** para la comunicación entre componentes:

* `$langStore`: Control de internacionalización persistente.
* `$themeStore`: Sincronización de modo oscuro/claro.
* `$modalStore`: Sistema centralizado de diálogos de sistema.

---

## 5. Herramientas de Mantenimiento

El sistema incluye scripts en `/scripts` para la optimización automática de activos:

- `convert-images-to-webp.js`: Migración de activos visuales (.png, .jpg, .jpeg, .svg) a formatos de próxima generación (.webp) utilizando la librería sharp para reducir el peso sin perder fidelidad.
- `convert-video-to-webm.js`: Compresión de medios de video (.mp4, .mov, .avi, etc.) a formato .webm (codecs VP9/AV1) para optimización de métricas de carga como el LCP, gestionado mediante FFmpeg.
- `convert-audio-to-webm.js`: Conversión de archivos de audio (.mp3, .wav, .m4a, etc.) a .webm con codec Opus, garantizando alta fidelidad con el mínimo bitrate posible.
- `convert_pdf_to_jpg.js`: Generación de vistas previas de documentos mediante la conversión de la primera página de archivos PDF a imagen JPG, utilizando ImageMagick y Ghostscript.
- `normalize-names.js`: Estandarización de nomenclaturas en el sistema de archivos (eliminación de acentos, conversión a minúsculas y sustitución de caracteres especiales por guiones bajos) para garantizar compatibilidad total en despliegues.
- `rename_files_from_x_to_numberSerie.js`: Indexación y renombrado masivo de archivos en secuencias numéricas (ej. 00, 01, 02), ideal para la gestión sistemática de activos repetitivos.
- Generar árbol de directorios (Windows):
```
winget install GerdHoffmann.Tree
& "C:\Program Files (x86)\GnuWin32\bin\tree.exe" -I 'node_modules|.next|dist|build|.astro|.vscode|.agent|agents|rules|skills' > tree.txt
```

---

## 6. Configuración de VSCode

Para mantener la higiene visual, utiliza el siguiente patrón de **File Nesting**:

```json
{
  "explorer.fileNesting.enabled": true,
  "explorer.fileNesting.patterns": {
    "package.json": ",.eslintrc.json, next.config.js, package-lock.json, postcss.config.js, tailwind.config.ts, jsconfig.json, next-sitemap.config.js, tailwind.config.js,vercel.json,pnpm-lock.yaml,yarn.lock,tsconfig.json,postcss.config.mjs,next.config.ts,next-env.d.ts,eslint.config.mjs,.stylelintrc.json,config.ts,next-auth.d.ts,.dockerignore,Dockerfile,vite.config.ts,pnpm-workspace.yaml,astro.config.mjs,tailwind.config.mjs,bun.lock,middleware.ts,tsconfig.tsbuildinfo,opencode.json",
    "README.md": "tree.txt,llms.txt, AI_ARCHITECTURE.md, .cursorrules, .llmignore,.gitignore,.env.example,.env.local,.env*,config.js,configApi.js,config.ts,configApi.ts,llms.md,CLAUDE.md,AGENTS.md,TOOLS.md,.llmrules,spec.md,designGuidelines.md"
  },
  "files.exclude": {
    ".astro": true,
    ".next": true,
    ".vercel": true,
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
  "explorer.compactFolders": true
}

```

---

## 🎯 Protocolo de Ejecución

1. **Fase de Instalación**: `pnpm install`
2. **Fase de Configuración**: Copiar `env.example` a `.env.local` y configurar los sensores `PUBLIC_*`.
3. **Fase de Desarrollo**: `pnpm dev` (Localhost:4321).
4. **Fase de Verificación**: `pnpm test` antes de cualquier commit.