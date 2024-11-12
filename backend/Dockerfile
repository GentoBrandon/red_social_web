# Usar una imagen base de Node.js
FROM node:18

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar solo los archivos de configuración necesarios para la instalación y compilación
COPY package*.json ./
COPY tsconfig.json ./

# Instalar dependencias, incluyendo las devDependencies necesarias para TypeScript
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Compilar TypeScript a JavaScript
RUN npm run build

# Exponer el puerto en el que la aplicación se ejecutará
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
