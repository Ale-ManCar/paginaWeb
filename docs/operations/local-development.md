# Desarrollo local

## Servicios

- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`
- MinIO API y consola: `localhost:9000` y `localhost:9001`
- Mailpit SMTP y UI: `localhost:1025` y `localhost:8025`

Las credenciales incluidas son exclusivamente locales. Producción utilizará secretos externos y servicios administrados cuando se apruebe la infraestructura.

## Inicio

Desde la raíz del repositorio:

```powershell
Copy-Item .env.example .env
npm install
docker compose up -d
npm run dev
```

## Detención

```powershell
docker compose down
```

No use `docker compose down --volumes` salvo que se pretenda eliminar deliberadamente todos los datos locales.
