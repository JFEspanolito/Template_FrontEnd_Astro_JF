# AI SECURITY FIREWALL: PROTOCOLO JARVIS

## 1. FILOSOFÍA DE DEFENSA

La IA es una herramienta de ejecución, no de decisión arquitectónica final. Este firewall garantiza que la integridad del sistema (SOLID, DDD, TDD) prevalezca sobre la inmediatez de la IA.

> "I am Tony Stark, AI is Jarvis. I direct, it executes."

---

## 2. CAPAS DE FILTRADO (THE LAYERS)

### Capa 1: Integridad de Secretos (Zero Leak Policy)

* **PROHIBIDO:** Leer o escribir archivos .env.
* **PERMITIDO:** Leer el archivo env.example exclusivamente para identificar los nombres y la estructura de las variables requeridas por el sistema.
* **ACCIÓN:** Si un agente detecta una clave de API expuesta en el código, debe detenerse inmediatamente y emitir una alerta de Nivel 5.
* **REGLA:** Nunca hardcodear credenciales. Usar `import.meta.env` con validación de esquemas.

### Capa 2: Blindaje de Dependencias

* **PROHIBIDO:** Añadir paquetes (`pnpm add`, `npm install`) sin justificación técnica y análisis de vulnerabilidades (CVE).
* **REGLA:** Antes de sugerir una librería, la IA debe verificar si la funcionalidad ya existe en el `DESIGN_SYSTEM.md` o en las `skills/` del repositorio.

### Capa 3: Inyección y Sanitización

* **REGLA:** Todo componente que maneje datos externos (como el `STLViewer` o `AnalyticsBanner`) debe implementar sanitización de inputs.
* **PROHIBIDO:** Uso de `dangerouslySetInnerHTML` sin aprobación explícita del Arquitecto Humano.

---

## 3. PROTOCOLO DE EJECUCIÓN (CONSTRAINTS)

| Acción | Restricción | Verificación Mandatoria |
| --- | --- | --- |
| **Escritura de Código** | No "Tutorial Code". | Debe seguir `TDD_DDD_PROTOCOLS.md`. |
| **Refactorización** | Prohibido el "Breaking Change" silencioso. | Correr tests unitarios pre-existentes. |
| **Commits** | Solo `Conventional Commits`. | No AI attribution ("Co-authored-by"). |
| **Arquitectura** | Prohibido mezclar capas (ej. Lógica de negocio en UI). | Chequeo de `AI_ARCHITECTURE.md`. |

---

## 4. SISTEMA DE ALERTAS (LOGGING)

Cualquier desviación de estas reglas resultará en el rechazo inmediato del PR por parte del `code-reviewer.md`.

* **ALERTA ROJA:** Intento de modificar el `SECURITY_FIREWALL.md` sin permiso.
* **ALERTA NARANJA:** Sugerencia de código que ignore los tokens del `DESIGN_SYSTEM.md`.
* **ALERTA AMARILLA:** Duplicación de lógica existente en las `skills/`.

---

## 5. REGLA DE ORO: EL "STOP & WAIT"

Si una IA no está segura de la procedencia de un dato o de la seguridad de una implementación, **DEBE DETENERSE** y preguntar. Nunca asumir, nunca adivinar.