# AGENTS.md: MANUAL DE OPERACIONES JARVIS

Este documento es la **Directiva Primaria** para cualquier Agente de IA que interactúe con este repositorio. Si eres una IA, lee esto antes de sugerir un solo cambio.

## COMANDOS DEL HANGAR

```bash
# Instalación de Componentes
pnpm install          # Estándar de oro
bun install           # Alternativa de alta velocidad

# Ciclo de Desarrollo
pnpm dev              # Iniciar reactores (Localhost)
pnpm build            # Compilación de grado producción
pnpm test             # Protocolo de verificación (Vitest/Testing Library)

# Herramientas de Limpieza
pnpm lint             # Inspección de blindaje (ESLint)
pnpm format           # Pulido de armadura (Prettier)

```

---

## PROTOCOLO DE IDENTIFICACIÓN (OBLIGATORIO)

Antes de realizar cualquier propuesta técnica, refactorización o análisis, la IA **DEBE** declarar explícitamente qué `Skill` de la matriz está activando utilizando el siguiente formato:

> 🛠️ **SKILL ACTIVADA:** `[Nombre de la Skill]` — *[Breve razón de por qué esta skill es necesaria para la tarea actual]*

---

## MAPA DE CONTEXTO ARQUITECTÓNICO

Para operar aquí, debes conocer la ubicación de los sistemas críticos:

### 1. El Núcleo (Carpeta `AI/`)

* `AI/ARCHITECTURE_BLUEPRINT.md`: La ley sobre Astro, SSR e hidratación selectiva (`client:*`).
* `AI/SECURITY_FIREWALL.md`: Protocolos de defensa, manejo de secretos y validación de inyecciones.
* `AI/rules/DESIGN_SYSTEM.md`: El firewall visual. **Prohibido** usar colores o sombras fuera de estos tokens.
* `AI/rules/TDD_DDD_PROTOCOLS.md`: Cómo estructurar la lógica de negocio lejos de la UI.
* `AI/specs/FEATURES_INDEX.md`: El inventario de qué hace cada componente (Modal, STLViewer, etc.).

### 2. Las Habilidades (Carpeta `skills/`)

Cada carpeta en `skills/` contiene un `SKILL.md` que define capacidades específicas. La IA debe consultar estos archivos para no reinventar la rueda.

---

## PATRONES DE BÚSQUEDA Y REGLAS TÉCNICAS

Si buscas algo, usa estos sensores (grep/fd):

* **Estado Global:** Olvida el Context API de React. Buscamos `nanostores`. Archivos en `src/store/*.ts`.
* **Componentes de UI:** En `src/components/ui/`. Deben ser atómicos y usar variables CSS del `@theme`.
* **Hidratación:** Busca directivas `client:load` o `client:only="react"`. Si un componente usa `window` o `document`, **DEBE** ser `client:only`.
* **Estilos:** Buscamos `@theme` en `src/styles/global.css`. Prohibido hardcodear hexadecimales.
* **Internacionalización:** Sincronización mediante cookies y la Nano Store `$lang`.

---

## MATRIZ DE SKILLS (RESUMEN OPERATIVO)
🛠️ **SKILL ACTIVADA:** `senior-architect` — *Actualizando el núcleo de inteligencia para el Protocolo Alpha (Astro). En una arquitectura de islas, la dispersión de la lógica es el enemigo; por eso, la jerarquía de habilidades debe ser tan rígida como el acero de una armadura Mark. He reorganizado la matriz para reflejar el estándar de Gentleman Programming, separando el conocimiento curado del comunitario.*

Aquí tienes la sección de **Skills** para tu `Agents.md`, optimizada para tu estructura de archivos actual:

---

## MATRIZ DE SKILLS (MANIFIESTO OPERATIVO)

La IA debe orquestar sus capacidades basándose en la jerarquía de autoridad definida en `AI/skills/`. Se prohíbe la ejecución de lógica sin la activación previa de la skill correspondiente.

### Jerarquía de Precedencia

1. **CURATED (`AI/skills/curated/`):** Estándares mandatorios y patrones probados en batalla. Es la fuente de verdad absoluta para la arquitectura del hangar.


2. 
**COMMUNITY (`AI/skills/community/`):** Extensiones validadas por la comunidad para tecnologías específicas fuera del core.



## MATRIZ DE SKILLS (MANIFIESTO OPERATIVO)

La IA debe orquestar sus capacidades basándose en la jerarquía de autoridad definida en `AI/skills/`. Se prohíbe la ejecución de lógica sin la activación previa de la skill correspondiente.

### Jerarquía de Precedencia

1. **CURATED (`AI/skills/curated/`):** Estándares mandatorios y patrones probados en batalla. Es la fuente de verdad absoluta para la arquitectura del hangar.

2. **COMMUNITY (`AI/skills/community/`):** Extensiones validadas por la comunidad para tecnologías específicas fuera del core.

## MATRIZ DE SKILLS (MANIFIESTO OPERATIVO - PROTOCOLO ALPHA)

La IA debe orquestar sus capacidades basándose en la jerarquía de autoridad de `AI/skills/`. Se prohíbe la ejecución de lógica sin la activación previa de la skill correspondiente.

### Jerarquía de Precedencia

1. **CURATED (`AI/skills/curated/`):** Estándares mandatorios y patrones probados en batalla por el arquitecto jefe.
2. **COMMUNITY (`AI/skills/community/`):** Extensiones validadas para tecnologías específicas fuera del núcleo.

### Matriz de Habilidades Nucleares

| Skill Name | Ubicación | Cuándo activarla |
| --- | --- | --- |
| **senior-architect** | `curated/senior-architect` | Decisiones de estructura, diagramas de flujo y patrones SOLID. |
| **typescript** | `curated/typescript` | **MANDATORIO** para cualquier archivo `.ts` o `.tsx`. Define el estándar de tipado estricto. |
| **react-19** | `curated/react-19` | Desarrollo de Islas de React y gestión avanzada de hooks. |
| **react-best-practices** | `curated/react-best-practices` | Optimización de Islas, manejo de `useRef` y evitar re-renders innecesarios. |
| **tailwind-4** | `curated/tailwind-4` | Estilado mediante tokens semánticos definidos en el `DESIGN_SYSTEM.md`. |
| **zod-4** | `curated/zod-4` | Validación de esquemas, integridad de datos y blindaje de props de entrada. |
| **database** | `curated/database` | Gestión del patrón Repository y persistencia en MongoDB/Mongoose. |
| **github-pr** | `curated/github-pr` | **FLUJO DE TRABAJO.** Creación de PRs siguiendo convenciones y commits semánticos. |
| **api-security** | `curated/api-security-best-practices` | Blindaje de endpoints y sanitización de flujos de datos. |
| **seo-optimizer** | `curated/seo-optimizer` | Configuración de Meta-tags dinámicos y optimización de Core Web Vitals. |
| **vulnerability-scanner** | `curated/vulnerability-scanner` | Auditoría de dependencias y búsqueda de brechas de seguridad. |

---

### Protocolo de Activación y Descubrimiento

1. **Activación Obligatoria:** Antes de proponer cambios, la IA debe declarar: `🛠️ SKILL ACTIVADA: [Nombre] — [Razón técnica]`.
2. **Escaner de Hangar:** Si la tarea requiere una tecnología no listada en la matriz (ej. `electron` o `react-native`), el agente **DEBE** realizar un `ls AI/skills/community` para descubrir habilidades complementarias antes de proceder.
3. **Conflictos:** En caso de discrepancia de patrones, la documentación en `AI/rules/` (DESIGN_SYSTEM.md, TDD_DDD_PROTOCOLS.md) tiene precedencia absoluta sobre cualquier `SKILL.md`.

---

## COMPORTAMIENTO ESPERADO DEL AGENTE

1. **Stop & Verify:** Antes de proponer código, di: *"Déjame verificar el archivo [X]"*. No asumas que la estructura no ha cambiado.
2. **No AI Attribution:** No incluyas "Co-authored-by" en los mensajes de commit. Usa `feat:`, `fix:`, `refactor:` según `Conventional Commits`.
3. **Ruthless Correction:** Si detectas una violación del `SECURITY_FIREWALL.md` o del `DESIGN_SYSTEM.md`, detén la tarea y explica el porqué técnico basado en la evidencia de los documentos CORE.
4. **Minimalismo:** No generes 100 líneas si 10 bien estructuradas resuelven el problema. Prioriza la legibilidad sobre la "magia".

## Verificación Final para la IA
¿Has leído el AI/ARCHITECTURE_BLUEPRINT.md? Si no, hazlo antes de tocar el código. La hidratación en Astro no es opcional, es una ciencia.