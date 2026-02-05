
## 📂 Carpeta `src/components/pages`
Esta carpeta sirve como puente entre el sistema de rutas de Astro y la lógica interactiva de React.

## 🎯 Propósito
Separar la **Ruta** (archivo `.astro`) de la **Vista** (archivo `.tsx`). Esto permite:

-  **Portabilidad**: migrar páginas completas desde Next.js casi sin cambios estructurales.

-  **DDD (Domain-Driven Design)**: aislar la lógica de presentación de la infraestructura del framework (rutas).

-  **Control de hidratación**: decidir qué páginas son interactivas (`client:load`) y cuáles permanecen como HTML estático.
 

## 🛠️ Flujo de trabajo

### 1. La Ruta

`src/pages/preguntas.astro`
Define la URL y los metadatos (SEO).

```
import Layout from "../layouts/Layout.astro";

import PreguntasPage from "@/components/pages/PreguntasPage";  

<Layout title="Preguntas">
<PreguntasPage client:load />
</Layout>
```
### 2. La Vista

`src/components/pages/PreguntasPage.tsx`
Contiene toda la lógica de React (estado, hooks, etc.).

```
export default function PreguntasPage() {
// Lógica de React, hooks, etc.
return <section>...</section>;
}
``` 

### ⚠️ Recordatorio importante

Casing: el nombre del archivo en disco debe coincidir exactamente con el import para evitar errores de compilación en servidor.

Variables de entorno: si la vista usa variables, deben tener prefijo PUBLIC_ y estar declaradas en