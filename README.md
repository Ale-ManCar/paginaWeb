# Grupo 1 Store

Tienda en línea para Ecuador construida como monolito modular con Next.js, NestJS, PostgreSQL y Redis.

## Estado

Fase 1 en construcción. Los supuestos comerciales están documentados en `docs/requirements/assumptions.md` y aún no equivalen a aprobación fiscal o legal.

## Requisitos locales

- Node.js 22 o superior
- npm 10 o superior
- Docker con Docker Compose

## Inicio rápido

```powershell
Copy-Item .env.example .env
npm install
docker compose up -d postgres redis minio mailpit
npm run dev
```

Web: `http://localhost:3000`. API: `http://localhost:3001/api/v1/health`.

## Verificación

```powershell
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
```
