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
