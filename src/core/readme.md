Aquí tienes una propuesta de `README.md` adaptada para un boilerplate en **Astro** 🚀. He ajustado las rutas para que sigan la estructura de directorios estándar de Astro (usando la carpeta `src/`) y manteniendo la lógica de **DDD** que hemos construido.

---

# 🚀 Boilerplate: Astro + DDD (Clean Architecture)

Este repositorio es una base sólida para proyectos que requieren una separación clara entre la lógica de negocio y la tecnología, utilizando **Astro** para el manejo de rutas y componentes, y **Zod** para la seguridad de datos.

## 📁 Estructura del Proyecto

La lógica central reside en `/src/core/`, manteniéndose independiente de los frameworks.

### 🏗️ Capas del Core (`/src/core/`)

- **Domain 🧠**: Contiene las reglas esenciales.
- `src/core/creature/domain/Creature.ts`: Entidad con validaciones de negocio.
- `src/core/creature/domain/CreatureRepository.ts`: Contrato (interfaz) para persistencia.
- `src/core/creature/domain/CreatureSchema.ts`: Esquema de **Zod** para contratos de datos.

- **Application 🎬**: Orquestadores de casos de uso.
- `src/core/creature/application/UploadCreature.ts`: Proceso para validar y guardar.

- **Infrastructure 🛠️**: Implementaciones técnicas.
- `src/core/creature/infrastructure/MongoRepository.ts`: Conexión real con la base de datos.

---

## 🛣️ Rutas de la API (Endpoints)

En Astro, las APIs se definen dentro de `src/pages/api/`. Estas rutas actúan como puentes hacia el `core`.

### `src/pages/api/creature.ts`

Este archivo maneja las peticiones para el sistema de criaturas (Upload & Community View).

| Método   | Endpoint        | Acción                                                   |
| -------- | --------------- | -------------------------------------------------------- |
| **POST** | `/api/creature` | Valida el JSON con Zod y sube la criatura al sistema.    |
| **GET**  | `/api/creature` | Retorna el listado completo para el filtrado en cliente. |

**Ejemplo de implementación (POST):**

```
import { CreatureSchema } from "../../core/creature/domain/CreatureSchema";

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const result = CreatureSchema.safeParse(body);

  if (!result.success) {
    return new Response(JSON.stringify(result.error.format()), { status: 400 });
  }

  // Llamada al caso de uso de Application...
  return new Response(JSON.stringify({ message: "Éxito" }), { status: 201 });
};

```

---

## 🛡️ Seguridad y Robustez

1. **Validación con Zod 🧼**: Cada entrada es filtrada antes de llegar al dominio.
2. **Variables de Entorno 🔐**: Las claves de MongoDB se configuran en el archivo `.env` (no incluido en el repositorio).
3. **Prevención de Spam (Frontend) 🖱️**:

- Implementación de `disabled` en el botón `BtnSubir` durante el proceso de `fetch`.
- Estado de carga (`isUploading`) para evitar clics accidentales.

---

## 🛠️ Comandos de Instalación

```
# Instalar dependencias
pnpm install

# Instalar Zod (si empiezas de cero)
pnpm add zod

# Ejecutar en desarrollo
pnpm dev

```
