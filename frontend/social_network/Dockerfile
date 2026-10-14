FROM node:20 AS development

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm ci

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
