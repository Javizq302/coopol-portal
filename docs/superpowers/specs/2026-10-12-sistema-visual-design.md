# Fase 1 — Sistema visual y maquetas · Diseño

**Estado:** aprobado en conversación — pendiente de revisión final del archivo
**Fecha:** 2026-10-12
**Alcance de referencia:** `Documento Alcance Portal Web.docx`, sección 8 ("se presentará una propuesta visual … para su aprobación").

## Objetivo

Construir en Astro el sistema visual del nuevo portal y maquetas navegables de las páginas principales, para presentarlas a COOPOL como propuesta visual. Las maquetas son código real que se reutiliza en la fase 2 (portal completo).

## Restricciones

- Stack existente: Astro 7 + Tailwind 4 (+ React 19 solo donde haga falta). Deploy a cPanel vía rama `deploy` (ver AGENTS.md).
- Sitio estático; sin backoffice ni base de datos (en standby). Contenido en el repo.
- Sin manual de marca: la identidad se deriva del escudo (`~/Documents/WebApps/coopol-web/public/images/logo_coopol.svg`).
- Desarrollo **por partes**, con revisión del usuario al final de cada una.
- Evitar estética genérica "de IA": gradientes morado/azul, glassmorphism, grillas de tarjetas con íconos, hero centrado genérico, carruseles automáticos, emojis.

## Dirección elegida: A — Institucional editorial

Tono de banco central / informe anual: solidez, nueva etapa. Fondo papel cálido, verde profundo dominante, dorado como acento escaso, serif de display + sans sobria, grilla asimétrica, filetes finos.

## 1. Fundamentos visuales ✔

### Paleta (contraste verificado WCAG AA)

| Token | Valor | Uso | Contraste |
|---|---|---|---|
| `paper` | `#F7F5EF` | Fondo general | — |
| `paper-2` | `#EFEBE1` | Bandas alternas | — |
| `ink` | `#14201A` | Texto principal | 15.4:1 sobre paper |
| `ink-muted` | `#4F5B54` | Texto secundario | 6.5:1 sobre paper |
| `green-900` | `#0E3B1F` | Color dominante: header, bloques, footer | 11.6:1 vs paper |
| `green-600` | `#007201` | Verde de marca: enlaces, botón primario | 5.7:1 sobre paper |
| `gold` | `#D4AF37` | Solo sobre `green-900`: cifras, filetes, marcadores | 6.0:1 sobre green-900 |
| `gold-ink` | `#8A6D12` | Dorado para texto sobre papel (puntual) | 4.5:1 sobre paper |
| `rule` | `#D9D3C4` | Filetes finos | — |

Reglas: `gold` nunca como texto sobre fondo claro (1.9:1). El amarillo neón del escudo (`#FAFB0A`) solo vive dentro del logo.

### Tipografía

- **Newsreader** (serif, eje óptico): titulares, cifras grandes.
- **Public Sans**: cuerpo, navegación, formularios.
- Autoalojadas con `@fontsource` (licencia OFL), sin Google Fonts CDN.
- Cifras monetarias y porcentajes con números tabulares (`font-variant-numeric: tabular-nums`).

### Estructura y estilo

- Grilla de 12 columnas, ancho máximo 1280 px, gutter lateral 16 px en móvil.
- Esquinas rectas (2 px solo en inputs). Sin sombras: la profundidad sale de contraste de fondos y filetes.
- Encabezado de sección editorial: número (`01`), etiqueta pequeña en versalitas/mayúsculas, titular serif.
- Movimiento mínimo (transiciones de color/subrayado). Nada de parallax ni carruseles automáticos. Respetar `prefers-reduced-motion`.
- JS solo donde haga falta: menú móvil y desplegables en Astro + script vanilla; React reservado para la calculadora (fase 2). Sin framer-motion.

## Partes de desarrollo ✔

Cada parte termina con revisión del usuario en `astro dev` antes de seguir.

1. **Fundamentos:** tokens, fuentes, layout base, Header (con acceso a Consulta Web), Footer, página interna `/sistema` (paleta, tipografía, componentes base).
2. **Inicio.**
3. **Nosotros:** Quiénes Somos, Consejos, Comités, Gerencia, Historia.
4. **Productos:** catálogo + plantilla de producto con uno de ejemplo.
5. **Noticias:** content collection, listado y detalle.
6. **Sucursales y Contacto:** maqueta del formulario (envío SMTP en fase de integraciones).

Educación y Servicios en Línea: fase 2.

## 2. Header, navegación y Footer ✔

### Header (escritorio)

- **Barra de utilidad** (fina, `green-900`, texto pequeño): izquierda "Lun–Vie 8:00–4:00 · (809) 533-1411"; derecha enlaces a Sucursales y Educación. Se desplaza con el scroll.
- **Barra principal** (fondo `paper`, filete inferior, sticky):
  - Izquierda: escudo + "COOPOL" en Newsreader, con línea pequeña "Cooperativa de los Miembros de la Policía Nacional".
  - Centro: Nosotros · Productos · Noticias · Servicios en Línea · Contacto.
  - Derecha: botón sólido **Consulta Web ↗** (`green-600`, esquinas rectas), siempre visible.
- **Desplegables:** panel a todo el ancho bajo el header (fondo `paper`, filetes), con las subpáginas como índice (título + una línea de descripción) y una nota destacada a la derecha. Se abre con clic/teclado (`aria-expanded`), cierra con `Esc` o clic fuera. Sin sombras.

### Header (móvil)

- Escudo + "COOPOL" a la izquierda, botón "Menú" (texto + ícono) a la derecha.
- Panel de pantalla completa en `green-900`: navegación en serif grande (`paper` sobre verde), subsecciones como acordeones, **Consulta Web** fijo abajo en `gold` sobre verde, teléfono y horario al pie.

### Búsqueda

Fuera de esta fase. Opción futura: búsqueda estática con Pagefind.

### Footer

Fondo `green-900`, filete `gold` superior.
- Fila superior: escudo + nombre legal completo en serif + línea institucional corta.
- Cuatro columnas: Nosotros · Productos · Servicios en Línea · Contacto (dirección, teléfono, correo, horario).
- Barra inferior: © año COOPOL · Política de privacidad · redes como texto ("Facebook · Instagram · YouTube").

### Datos institucionales

| Dato | Valor |
|---|---|
| Consulta Web | `https://consulta.coopol.com.do` (abre en pestaña nueva) |
| Correo | `info@coopol.com.do` |
| Teléfono | (809) 533-1411 |
| Dirección | Calle Rafael Sánchez Ravelo, casi esquina Av. Independencia, Zona Universitaria, Santo Domingo, RD |
| Horario | Lunes a Viernes · 8:00 a. m. – 4:00 p. m. |
| Redes sociales | `TODO` — placeholders hasta recibir URLs |

Estos datos viven en un solo módulo (`src/data/site.ts`) para no repetirlos.

## 3. Parte 1 — estructura y verificación ✔

### Archivos

```
src/
  data/site.ts             datos institucionales + estructura de navegación (fuente única)
  styles/global.css        @import tailwind, tokens en @theme, fuentes, estilos base
  layouts/BaseLayout.astro <html lang="es">, <head> con SEO básico (title, description), Header, <main>, Footer
  components/
    Header.astro           barra de utilidad + barra principal + paneles desplegables + menú móvil
    Footer.astro
    Logo.astro             escudo + wordmark; variantes `light` (sobre paper) y `dark` (sobre green-900)
    Button.astro           variantes: primary, secondary (borde), link (con flecha)
    SectionHeading.astro   número + etiqueta + titular serif
  pages/
    index.astro            placeholder con el layout (la Home real es la Parte 2)
    sistema.astro          guía viva: paleta, tipografía, botones, encabezados; `noindex`, fuera del menú
public/logo-coopol.svg     copiado de coopol-web (provisional)
```

- La navegación (Header, menú móvil y Footer) se genera desde `site.ts`.
- Desplegables y menú móvil: `<script>` vanilla dentro de `Header.astro`, sin React.
- Dependencias nuevas: `@fontsource-variable/newsreader`, `@fontsource-variable/public-sans`.

### Verificación (antes de entregar para revisión)

- `astro check` y `npm run build` sin errores.
- Revisión visual en `astro dev` a 375, 768 y 1280 px.
- Teclado: Tab alcanza todo, desplegables abren con Enter y cierran con Esc, foco visible.
- Solo combinaciones de color de la tabla de contraste.

### Fuera de la Parte 1

Contenido real de la Home, demás páginas, fotografía, formulario. Los enlaces del menú a rutas aún inexistentes darán 404 hasta su parte (esperado).

## Pendientes conocidos

- Redibujar el logo como SVG limpio (el actual es un bitmap vectorizado de 525 KB).
- Fotografías reales de COOPOL (mientras tanto: stock documental).
