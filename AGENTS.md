## Proyecto

Nuevo Portal Web Institucional de **COOPOL** (Cooperativa de Ahorros, Créditos y Servicios Múltiples de los Miembros de la Policía Nacional, Santo Domingo, RD). Desarrollo interno de la Gerencia de Tecnología. Idioma del sitio y del contenido: español (`lang="es"`).

- **Fuente de verdad del alcance:** `Documento Alcance Portal Web.docx` (raíz del repo, sept. 2026). Reemplaza al TDR original (`~/Documents/Pdf/TDR_COOPOL_PortaL_Institucional.pdf`), que pedía portal del socio, MFA, CooperNet, etc. — todo eso quedó fuera.
- **Naturaleza:** portal principalmente informativo. Sin operaciones transaccionales. La **Consulta Web** existente solo se enlaza; no se modifica su lógica.
- **Mapa del sitio:** Inicio · Nosotros (Quiénes Somos, Consejos, Comités, Gerencia, Historia) · Productos (una subpágina por producto) · Educación (cooperativismo, derechos/deberes, finanzas personales) · Noticias (blog con categorías) · Servicios en Línea — nombre provisional — (Calculadora, Bienestar Social, Consulta Web, Apps) · Sucursales y Contacto.
- **Integraciones:** Google Maps, Google Analytics, correo institucional (formulario de contacto vía SMTP + captcha), redes sociales.
- **Infraestructura:** cPanel (Passenger). Docker quedó **descartado**.
- **En standby:** backoffice (noticias/anuncios administrables, roles Admin/Editor, bitácora), porque requiere SSR + base de datos en cPanel. Hasta que se retome, el contenido dinámico (noticias, anuncios, educación) vive en el repo (content collections de Astro).

### Fases de trabajo

1. **Sistema visual + maquetas de páginas principales** (en curso) — propuesta visual para aprobación de COOPOL, según la sección 8 del alcance.
2. Portal público completo.
3. Backoffice (standby).
4. Integraciones.

Specs y planes en `docs/superpowers/specs/` y `docs/superpowers/plans/`.

### Referencia previa

`~/Documents/WebApps/coopol-web` (Next.js, prototipo anterior). Reutilizar **contenido** (políticas de préstamo, plan de defunción por rango, dirección/teléfono, fotos del Consejo, logos de suplidores) y la arquitectura de navegación — **no** su estética.

### Dirección de diseño

Moderno, empresarial e institucional, alineado al logo (escudo verde/amarillo). Debe evitar explícitamente la estética genérica de "sitio hecho con IA": gradientes morado/azul, glassmorphism, grillas de 3 tarjetas con íconos, hero centrado genérico, emojis.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Deploy (cPanel, sin SSH)

- Push a `main` → GitHub Action (`.github/workflows/build.yml`) hace build → publica rama `deploy` (dist, package.json, package-lock.json, app.cjs, tmp/restart.txt)
- La rama `deploy` la genera el Action: nunca hacer commits ni merges a ella.
- cPanel: Git Version Control en `apps/portal-dev`, branch `deploy` → Update from Remote
- Passenger arranca `app.cjs`, que importa `dist/server/entry.mjs`. No modificar app.cjs.
- `tmp/restart.txt` cambia en cada build para que Passenger reinicie solo tras el pull.
- Si no se ven cambios: en la app de cPanel, Ejecutar script JS → `diag`; si hay procesos lsnode viejos → `kill-node` + Reiniciar
- Variables SMTP (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`) van en el panel de la app de Node, nunca en el repo.
- Scripts de emergencia en `package.json` (se corren desde "Ejecutar script JS" en cPanel, que no tiene terminal): `diag` (procesos Node vivos), `kill-node` (mata lsnode huérfanos), `logs` (últimas líneas de stderr.log), `git-check` (prueba la conexión con GitHub, ocultando el token).
