# Imagen base utilizando la versión específica de Node.js que estás usando
FROM node:20.11.1

# Directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Instalando dependencias
# Primero copia los archivos de definición de dependencias para aprovechar la cache de Docker
COPY package*.json ./

RUN npm install

# Copiar todos los archivos del proyecto al directorio de trabajo del contenedor
COPY . .

# Exponer el puerto en el que corre tu aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "app.js"]
