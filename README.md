# Leaderboard Service

Este es el servicio de tablero de líderes para gestionar tableros de líderes y usuarios.

## Requisitos

- Node.js
   * node v20.11.1
   * npm 10.2.4
- MongoDB
- Docker y Docker-Compose (Opcional)

## Instalación

1. Clona este repositorio en tu máquina local.
   ```bash
   git clone https://github.com/dalokdaga/leaderboard_service_test.git

2. Ir al directorio del proyecto.
   ```bash
   cd leaderboard_service_test

3. Instala las dependencias utilizando npm:

   ```bash
   npm install

## Configuración de variables de entorno

1. Crea archivo .env
2. Agrega las siguientes variables  (Se necesita tener mongo instalado para uso local)
   ```bash
   MONGODB_URI=mongodb://localhost:27017/leaderboard_test
   MONGODB_URI_TEST=mongodb://localhost:27017/test
3. Ejecutar aplicación en local
   ```bash
   node server.js

## Instalación Con docker
Uso del servicio usando docker.
1. Clona este repositorio en tu máquina local.
   ```bash
   git clone https://github.com/dalokdaga/leaderboard_service_test.git

2. Ir al directorio del proyecto.
   ```bash
   cd leaderboard_service_test

3. Instala las dependencias utilizando npm:

   ```bash
   npm install

4. Ejecuta el docker-compose para que se configure (Se necesita tener docker y docker-compose)
   ```bash
   docker-compose up --build
no es necesario agregar variables de entorno ya que el archivo docker-compose tiene la configuración para su correcto funcionamiento.

## Ejecución de pruebas test
1. Una vez configurado el proyecto las pruebas se puede ejecutar con los siguientes comandos usando la terminal
   ```bash
   npx jest tests/leaderboardController.test.js

   ```bash
   npx jest tests/userController.test.js

## ¿Como utilizar la api? 
1. Se debe de generar un x-api-key que nos permitira utilizarla, ejecutar:
   ```bash
   node commands/cli.js generate 32 sha256 "Clave para acceso a la base de datos"

2. El x-api-key generado se debe de enviar en los headers de cada petición para el servicio api rest permita el uso de los endpoints.

## Endpoints (Curls)
1. Creating a leaderboard
   ```bash
    curl --location 'http://localhost:3000/leaderboards' \
    --header 'x-api-key: sustituir-por-api-key-generada' \
    --header 'Content-Type: application/json' \
    --data '{
        "name": "Tablero MetalSlug",
        "game": "Bomberman"
        
    }'
2. Deleting a leaderboard
   ```bash
    curl --location --request DELETE 'http://localhost:3000/leaderboards/65ecbb6290dd067e3b8547fc' \
    --header 'x-api-key: sustituir-por-api-key-generada'
   
3. Adding users to a leaderboard
   ```bash
   curl --location 'http://localhost:3000/users' \
   --header 'x-api-key: sustituir-por-api-key-generada' \
   --header 'Content-Type: application/json' \
   --data-raw '{
      "username": "example_user1",
      "email": "user1@example.com",
      "leaderboardId": "65ecbcea5a913d010ee76f97"
   }'

4. Updating scores of users
   ```bash
   curl --location --request PUT 'http://localhost:3000/users/65ecbd4f1afc395283366e8c' \
   --header 'x-api-key: sustituir-por-api-key-generada' \
   --header 'Content-Type: application/json' \
   --data '{
      "score": 500
   }'

5. Getting leaderboard with pagination
   ```bash
   curl --location 'http://localhost:3000/leaderboards/65ecbcea5a913d010ee76f97/users?page=1&limit=20' \
   --header 'x-api-key: sustituir-por-api-key-generada'

6. Getting rank and score of X user
   ```bash
   curl --location --request GET 'http://localhost:3000/users/leaderboard/65ecbcea5a913d010ee76f97/users/65ecbd4f1afc395283366e8c/rank' \
   --header 'x-api-key: sustituir-por-api-key-generada' \
   --header 'Content-Type: application/json' \
   --data '{
      "score": 500
   }'

7. Getting N users around X user in the leaderboard (a segment of the leaderboard where X user is in the middle)
   ```bash
   curl --location 'http://localhost:3000/users/around-user/leaderboard/65ecbcea5a913d010ee76f97/user/65ecbd4f1afc395283366e8c/2' \
   --header 'x-api-key: sustituir-por-api-key-generada' \
   --data ''

Para poder observar un mejor comportamiento en los endpoints puede registrar mas de un usuario en un leaderboard