# DESIGN SYSTEM: The Visual Firewall

## 1. EL PROBLEMA: Inconsistencia y Hex-Hardcoding

Poner un `#FF5733` directamente en un componente es un pecado capital. Si mañana el cliente decide que el "Naranja Vibrante" ahora es "Azul Corporativo", no voy a permitirte hacer un `Search & Replace` en 40 archivos.

**Regla de Oro:** Si no es una variable, no existe.

---

## 2. DESIGN TOKENS (Variables de Verdad)

### Paleta de Colores

Cualquier color usado debe referenciar a un token semántico. No usamos "Azul", usamos "Primary".

| Categoría | Token | Valor (Editable) | Uso |
| --- | --- | --- | --- |
| **Brand** | `--color-primary` | `[#COLOR_HEX]` | Acciones principales, botones, enlaces. |
| **Brand** | `--color-secondary` | `[#COLOR_HEX]` | Elementos de acento. |
| **Neutral** | `--color-bg` | `[#COLOR_HEX]` | Fondo de la aplicación. |
| **Neutral** | `--color-text` | `[#COLOR_HEX]` | Color base de la tipografía. |
| **Status** | `--color-error` | `[#COLOR_HEX]` | Alertas, validaciones fallidas. |

### Tipografía & Escala

Usamos una escala modular para evitar que cada desarrollador invente un tamaño de fuente nuevo.

* **Base:** `16px` (1rem).
* **Scale:** `1.25` (Major Third).
* **Tokens:** `--text-sm`, `--text-base`, `--text-lg`, `--text-xl`, `--text-2xl`.

---

## 3. ESTÁNDARES DE IMPLEMENTACIÓN

### Prohibiciones Estrictas (The "No-Fly" Zone)

* **NO Inline Styles:** El atributo `style=""` está vetado salvo para cálculos dinámicos de JS (ej. posiciones de animaciones).
* **NO Magic Numbers:** Márgenes como `margin: 13px` son ilegales. Usa la escala de espaciado: `--spacing-1` (4px), `--spacing-2` (8px), etc.
* **NO Unscaled Units:** Siempre usa `rem` para accesibilidad. `px` solo para bordes de 1 o 2px.

### Unidades y Medidas

Para cálculos de layout complejos, usa CSS moderno:

Container Width=min(100%−2⋅padding,max-width)

# ESTÁNDAR DE TEMAS: Capa Dual de Abstracción
Nuestra arquitectura visual se divide en dos capas para garantizar que el cambio de tema sea instantáneo y libre de errores circulares.

- Capa de Valores (The Values): Definida en :root y html.dark. Contiene los valores crudos (Hex/RGBA). Usamos el prefijo --raw-* para evitar colisiones.
- Capa Semántica (The Tokens): Definida dentro de @theme. Mapea los valores crudos a nombres funcionales que Tailwind reconoce automáticamente como utilidades (ej. bg-body-background).

# CONFIGURACIÓN DEL MOTOR (CSS)
El agente debe seguir esta estructura estrictamente. Se prohíbe el uso de cualquier valor "raw" fuera de los bloques de declaración de tema.

Directriz de Escalabilidad: Utiliza una arquitectura de variables multinivel. Cada decisión de diseño debe ser controlable desde un único punto de verdad. Si un elemento requiere un ajuste, el agente debe proponer un nuevo token semántico en lugar de aplicar un estilo local.

```
@theme {
  /* Backgrounds - Capa Funcional */
  --body-background: var(--raw-color-background);
  --card-background: var(--raw-bg-card);

  /* Buttons - Capa Funcional */
  --btn-primary: var(--raw-btn-primary);
  --btn-secondary: var(--raw-btn-secondary);
  --btn-text-primary: var(--raw-btn-text-primary);
  --btn-text-secondary: var(--raw-btn-text-secondary);

  /* Typography - Capa Funcional */
  --foreground-base: var(--raw-color-foreground);
  --foreground-muted: var(--raw-text-muted);
  --foreground-highlight: var(--raw-text-highlight);

  /* Accents - Capa Funcional */
  --accent-one: var(--raw-highlight-1);
  --accent-two: var(--raw-highlight-2);

  /* Shadows */
  --shadow-soft: var(--raw-shadow-soft);

  /* Fonts */
  --font-display: "Syne", "sans-serif";
  --font-body: "Space Grotesk", "sans-serif";
}

/* --- LIGHT MODE --- */
:root {
  /* Base */
  --raw-color-background: #6a6e72;
  --raw-color-foreground: #111111;
  --raw-bg-card: #f4f4f5;

  /* Interactive */
  --raw-btn-primary: #ffffff;
  --raw-btn-text-primary: #111111;
  --raw-btn-secondary: rgba(0, 0, 0, 0.06);
  --raw-btn-text-secondary: #1c2c42;

  /* Text & Status */
  --raw-text-muted: #010305;
  --raw-text-highlight: #a3e635;
  --raw-highlight-1: #2294f2;
  --raw-highlight-2: #ffcd03;
  
  --raw-shadow-soft: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* --- DARK MODE --- */
html.dark {
  /* Base */
  --raw-color-background: #111111;
  --raw-color-foreground: #e2e8f0;
  --raw-bg-card: #18181b;

  /* Interactive */
  --raw-btn-primary: #27272a;
  --raw-btn-text-primary: #e2e8f0;
  --raw-btn-secondary: rgba(255, 255, 255, 0.06);
  --raw-btn-text-secondary: #94a3b8;

  /* Text & Status */
  --raw-text-muted: #94a3b8;
  --raw-text-highlight: #a3e635;
  --raw-highlight-1: #2294f2;
  --raw-highlight-2: #ffcd03;
  
  --raw-shadow-soft: 0 1px 3px rgba(0, 0, 0, 0.4);
}
```

---

## 4. COMPONENTES ATÓMICOS

Tratamos la UI como piezas de LEGO, no como bloques de mármol.

1. **Atom:** Botones, Inputs, Badges (Sin lógica de negocio).
2. **Molecule:** Card de producto, SearchBar (Lógica UI mínima).
3. **Organism:** Navbar, Footer, Formulario de Registro (Conexión con datos).

---

## 5. JARVIS PROTOCOL: Verificación de UI

Si eres una IA trabajando en este repo, antes de enviar un cambio de frontend:

1. **Inspección de Variables:** ¿Este color está en `:root` o en `tailwind.config.js`? Si no, cámbialo.
2. **Responsividad:** ¿Usaste clases de layout (`flex`, `grid`) o forzaste posiciones con `absolute`? Solo acepto lo primero.
3. **Accesibilidad:** ¿El contraste cumple con el estándar WCAG? Si el texto no es legible, el diseño es basura.

---

## 🛠️ Herramientas Sugeridas (Tooling)

* **Linter:** `eslint-plugin-tailwindcss` o similares para evitar clases arbitrarias.
* **Inspector:** Usa `eza` para verificar la estructura de assets en `/public`.
* **Visualización:** `bat` para revisar los archivos de temas de CSS rápidamente.