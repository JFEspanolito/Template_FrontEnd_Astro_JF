# ARCHITECTURE BLUEPRINT: Astro Edition

## 1. FILOSOFÍA DE COMPONENTES: The Island Law

Astro no es una SPA. Operamos bajo la **Arquitectura de Islas**. Si un componente no necesita JS en el cliente, es un pecado usar `.tsx`.

* **Astro-First (`.astro`):** Es nuestra capa de infraestructura y renderizado estático. El 90% del sitio debe ser `.astro`.
* **Islands of React (`.tsx`):** Solo para interactividad compleja (Modales, Viewers, Toggles).
* **Polimorfismo:** Permitimos componentes polimórficos que cambian de estilo/layout mediante props, pero la lógica de renderizado condicional debe ser clara y no anidada.

---

## 2. ESTRUCTURA DE DIRECTORIOS (Hangar Map)

| Directorio | Propósito | Regla de Oro |
| --- | --- | --- |
| **`./scripts`** | Pipeline de Assets | Ningún asset (audio/video/img) entra a `src/assets` sin pasar por el script de optimización. |
| **`src/core`** | Lógica Pura | Solo TypeScript. Sin dependencias de UI. Aquí vive el "cerebro". |
| **`src/data`** | Static CMS | Es nuestra única fuente de verdad. Los componentes consumen estos objetos `.ts` en tiempo de compilación. |
| **`src/components/pages`** | Fragmentos | Si una página en `src/pages` supera las 200 líneas, se despedaza en fragmentos aquí. |
| **`src/layouts`** | Estructuras Globales | Solo contienen el esqueleto HTML, SEO y el inyector de Temas. |

---

## 3. GESTIÓN DE ESTADO Y TEMAS (The FOUC Prevention)

### El Protocolo de Temas

No usamos `useEffect` para aplicar el tema inicial. El tema es una **Inyección de Bloqueo**.

1. **Script de Head:** En `Layout.astro`, inyectamos un script `<script is:inline>` que lee `localStorage` y aplica la clase `.dark` **antes** de que el DOM sea visible.
2. **Sincronización:** El `ThemeToggle.tsx` (React) solo sirve para *cambiar* el estado y persistir en `localStorage/cookie`. No debe ser el responsable de la primera pintura.

### State Management

Para compartir estado entre islas (ej. `LanguageSwitcher` -> `i18n`), prohibimos el uso de Context Providers globales que envuelvan toda la app. Usamos **Nano Stores** (o eventos nativos) para mantener las islas ligeras y aisladas.

---

## 4. PIPELINE DE DESPLIEGUE (Vercel Adapter)

Para validar si eres **SSG** (Estático) o **SSR** (Servidor), revisa tu `astro.config.mjs`:

* `output: 'static'`: Generamos todo en build (SSG). Es tu configuración actual.
* `output: 'server'`: Necesitamos el adaptador `@astrojs/vercel/serverless`.

**Regla de Arquitecto:** Preferimos SSG para el 100% de la web. Solo activamos SSR si una feature en `spec.md` requiere datos dinámicos por usuario que no pueden ser cacheados.

---

## 5. JARVIS PROTOCOL: Reglas para la IA

Si eres una IA trabajando en este Hangar:

1. **Optimización:** Antes de sugerir una imagen en un componente, verifica si existe en `src/assets` y si ha sido procesada por los scripts de `./scripts`.
2. **Data Integrity:** Nunca escribas un nombre o texto directamente en un `.astro`. Si no está en `src/data/configProject.ts`, pídele al usuario que lo añada ahí primero.
3. **Hydration:** Solo usa la directiva `client:load` o `client:visible` cuando sea estrictamente necesario. Si el componente puede ser estático, **mátalo** y conviértelo a `.astro`.
4. **I18n:** Toda cadena de texto debe pasar por el motor de `src/i18n/ui.ts`.