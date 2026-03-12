# FEATURES INDEX: [PROJECT_NAME] Blueprint

## 1. VISIÓN DEL SISTEMA (The "Big Picture")

* **Nombre del Proyecto:** `[NOMBRE_DEL_PROYECTO]`
* **Objetivo Primario:** `[DEFINICIÓN_DEL_VALOR_DE_NEGOCIO]`
* **Stack Tecnológico:** `[Astro | Next.js] + Tailwind v4 + TDD + DDD`
* **Estado de Infraestructura:** `[MVP | PRODUCTION | LEGACY]`

---

## 2. ATLAS DE RUTAS (Engineering Entry Points)

Agente, estas son las coordenadas de este hangar. Queda prohibido crear carpetas fuera de este esquema:

* **CORE LÓGICA:** `./src/core/` -> Aquí reside el Dominio (Entities, Use Cases). Sin dependencias externas.
* **UI & LAYOUT:** `./src/components/` -> Atoms, Molecules y Organisms.
* **VISTAS/RUTAS:** `./src/app/` (Next) o `./src/pages/` (Astro).
* **LABORATORIO DE PRUEBAS:** `./TDD/` -> Es el único lugar donde se permiten archivos `.test.ts/js`.
* **CONOCIMIENTO:** `./AI/` -> Reglas de diseño, arquitectura y specs.

---

## 3. ROADMAP ESTRATÉGICO (Feature Tracking)

| ID | Feature | Prioridad | Estado | Ubicación Principal |
| --- | --- | --- | --- | --- |
| **F-001** | `[Ej: Auth System]` | `CRITICAL` | `TODO` | `src/libs/auth` |
| **F-002** | `[Ej: Global Store]` | `HIGH` | `TODO` | `src/core/context` |

> **Nota de Arquitecto:** No se marca una feature como `DONE` hasta que sus tests en `./TDD` pasen al 100% y el código respete el `DESIGN_SYSTEM.md`.

---

## 4. ESPECIFICACIONES TÉCNICAS (The Contract)

### [F-ID] - [NOMBRE_DE_LA_FEATURE]

* **Definición del Problema:** `[¿Qué necesidad de negocio resuelve esto?]`
* **Impacto en el Dominio:** `[¿Qué entidades del /src/core se ven afectadas?]`
* **Punto de Inyección (Entry Point):** * Archivo: `[Ruta exacta del archivo a modificar]`
* Acción: `[Descripción técnica de la intervención]`

* **Detalles de Implementación:**
* `[Punto 1: Lógica de UI]`
* `[Punto 2: Conexión con API/Data]`

* **Protocolo TDD (Requisito de Salida):**
* Se debe crear: `TDD/[nombre-feature].test.js`
* Cobertura mínima: `[Logic coverage, UI state, Edge cases]`

---

## 5. JARVIS PROTOCOL: Reglas de Ejecución para IA

Si eres una IA operando en este repositorio, este documento es tu **Orden de Operaciones**:

1. **Fase de Reconocimiento:** Antes de escribir código, usa `fd` y `rg` para mapear los archivos mencionados en la sección 4.
2. **Aislamiento de Lógica:** No ensucies la capa de Presentación con lógica de negocio. Mueve los cálculos pesados a `./src/core`.
3. **Ciclo TDD Obligatorio:** Si la feature no tiene un archivo correspondiente en `./TDD`, la tarea se considera fallida.
4. **Respeto al Sistema de Diseño:** Está terminantemente prohibido usar Hex/RGBA crudos. Usa los tokens de `@theme`.
5. **Memoria de Engram:** Al finalizar, usa `mem_save` para registrar qué decisiones de arquitectura se tomaron (Patrones, tradeoffs, bugs encontrados).