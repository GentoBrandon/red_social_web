FROM node:20-bookworm-slim AS development

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN --mount=type=secret,id=npm_ca \
    if [ -f /run/secrets/npm_ca ]; then export NODE_EXTRA_CA_CERTS=/run/secrets/npm_ca; fi; \
    npm ci --no-audit --no-fund && test -x node_modules/.bin/next

# Copia el resto de la aplicación
COPY . .

# Expone el puerto en el que corre la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación en modo de desarrollo
CMD ["npm", "run", "dev"]

FROM development AS build
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM build AS production
ENV NODE_ENV=production
CMD ["npm", "start"]
