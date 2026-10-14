# Red Social Web

Aplicación web para conectar personas y compartir publicaciones. Incluye perfiles, amistades, publicaciones con comentarios y reacciones, y chat en tiempo real.

## Tecnologías

- **Frontend:** Next.js 15, React 18 y TypeScript.
- **Backend:** Node.js 20, Express, TypeScript y Socket.IO.
- **Base de datos:** PostgreSQL 17 con migraciones de Knex.
- **Contenedores:** Docker y Docker Compose.

## Requisitos

Para iniciar el proyecto con Docker, instala Docker Engine y Docker Compose v2. No necesitas instalar PostgreSQL ni Node.js en tu máquina: Compose crea la base de datos y construye las imágenes de Node.

## Iniciar en desarrollo

Desde la raíz del repositorio, inicia los tres servicios:

```bash
docker compose up --build
```

La primera ejecución descarga las imágenes e instala las dependencias, por lo que puede tardar unos minutos. Compose espera hasta que PostgreSQL esté listo; el backend aplica las migraciones y luego inicia la API.

Abre la aplicación en [http://localhost:3000](http://localhost:3000). El backend y la conexión Socket.IO están disponibles en el puerto 5000. PostgreSQL escucha en el puerto 5432.

Compose monta el código del frontend y el backend para permitir cambios durante el desarrollo. Los directorios de dependencias y la compilación del frontend permanecen dentro de los contenedores.

Comandos útiles desde otra terminal:

```bash
# Iniciar los servicios en segundo plano
docker compose up --build -d

# Consultar los registros
docker compose logs -f frontend backend postgres

# Detener los servicios y conservar la base de datos
docker compose down
```

Para borrar también los datos de PostgreSQL, usa `docker compose down --volumes`. Esto elimina permanentemente la base de datos local del proyecto.

## Ejecutar en modo producción

El archivo de producción usa las etapas de compilación y arranque optimizadas de los Dockerfiles:

```bash
docker compose -f compose.production.yml up --build -d
docker compose -f compose.production.yml logs -f
docker compose -f compose.production.yml down
```

La compilación del frontend omite ESLint, como indica la configuración actual de Next.js. Ejecuta ESLint por separado para revisar problemas de estilo y calidad.

Antes de exponer esta configuración a usuarios, sustituye las credenciales de ejemplo de PostgreSQL y la clave de firma JWT por valores seguros, y guárdalos fuera del repositorio. La configuración incluida está pensada para desarrollo local.

## Rutas de la aplicación

- `/`: inicio de sesión.
- `/login/sign_up`: creación de una cuenta.
- `/dashboard`: página principal después de iniciar sesión.
- `/dashboard/friends` y `/users/friends`: secciones de amistades.
- `/users/information` y `/users/profile`: información y perfil del usuario.

La API HTTP usa el prefijo `/api` y escucha en el puerto 5000. Entre sus grupos de rutas están `/api/auth`, `/api/persons`, `/api/profile`, `/api/friend` y `/api/posts`. Socket.IO comparte el servidor del backend.

## Estructura

```text
backend/
  src/
    config/       configuración de Express y PostgreSQL
    migrations/   esquema de la base de datos
    modules/      autenticación, perfiles, amistades y publicaciones
frontend/
  social_network/
    src/app/      páginas de Next.js
    src/component/ componentes de la aplicación
docker-compose.yml       servicios de desarrollo
compose.production.yml   servicios de producción
```

## Comprobaciones

Desde `backend/`, `npm run build` compila el backend. Desde `frontend/social_network/`, `npm run build` genera la aplicación de producción y `npm run lint` ejecuta ESLint.

El backend todavía no tiene una suite de pruebas: `npm test` es un marcador que termina con un error.
