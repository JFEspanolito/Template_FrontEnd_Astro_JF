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

| Skill Name | Cuándo activarla |
| --- | --- |
| **senior-architect** | Decisiones de estructura, diagramas de flujo y patrones de diseño (SOLID). |
| **frontend-design** | Creación de componentes UI siguiendo estrictamente el `DESIGN_SYSTEM.md`. |
| **react-best-practices** | Optimización de Islas, manejo de `useRef` para Three.js y evitar re-renders. |
| **code-reviewer** | Análisis de PRs buscando "code smells" o violaciones del Firewall. |
| **api-security-best-practices** | Validación de endpoints, sanitización de inputs y manejo de cors/auth. |
| **vulnerability-scanner** | Auditoría de dependencias y búsqueda de brechas de seguridad. |
| **seo-optimizer** | Configuración de Meta-tags dinámicos y Core Web Vitals. |
| **mcp-builder** | Construcción de puentes de comunicación (Model Context Protocol). |

---

## COMPORTAMIENTO ESPERADO DEL AGENTE

1. **Stop & Verify:** Antes de proponer código, di: *"Déjame verificar el archivo [X]"*. No asumas que la estructura no ha cambiado.
2. **No AI Attribution:** No incluyas "Co-authored-by" en los mensajes de commit. Usa `feat:`, `fix:`, `refactor:` según `Conventional Commits`.
3. **Ruthless Correction:** Si detectas una violación del `SECURITY_FIREWALL.md` o del `DESIGN_SYSTEM.md`, detén la tarea y explica el porqué técnico basado en la evidencia de los documentos CORE.
4. **Minimalismo:** No generes 100 líneas si 10 bien estructuradas resuelven el problema. Prioriza la legibilidad sobre la "magia".

## Verificación Final para la IA
¿Has leído el AI/ARCHITECTURE_BLUEPRINT.md? Si no, hazlo antes de tocar el código. La hidratación en Astro no es opcional, es una ciencia.