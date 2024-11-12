# Usa la última versión de Node.js
FROM node:20

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Exponer el puerto en el que corre la aplicación
EXPOSE 5000

# Ejecuta las migraciones y luego inicia la aplicación en modo de desarrollo
CMD ["sh", "-c", "npx knex migrate:latest && npm run dev"]
