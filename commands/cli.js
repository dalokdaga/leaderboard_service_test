const { program } = require('commander');
const crypto = require('crypto');
const KeySecret = require('../models/keySecretModel');
const connectToDatabase = require('../config/database');


connectToDatabase();

program
  .version('1.0.0')
  .description('Comando para generar una clave secreta.');

program
  .command('generate <longitud> <algoritmo> <descripcion>')
  .description('Genera una clave secreta con la longitud y el algoritmo especificados y la agrega a una colección en MongoDB utilizando Mongoose.')
  .action((longitud, algoritmo, descripcion) => {    
    if (isNaN(parseInt(longitud))) {
      console.error('La longitud debe ser un número válido.');
      process.exit(1); 
    }

    // Generar la clave secreta
    const key = crypto.randomBytes(parseInt(longitud)).toString('hex');

    // Crear una nueva instancia del modelo KeySecret
    const nuevaClave = new KeySecret({
      key: key,
      description: descripcion,
      algorithm: algoritmo
    });

    // Guardar la nueva clave en la base de datos
    nuevaClave.save()
      .then(claveGuardada => {
        console.log(`Clave secreta agregada a la colección con ID: ${claveGuardada._id}`);
        process.exit(0); // Salir sin errores
      })
      .catch(error => {
        console.error('Error al guardar la clave secreta:', error);
        process.exit(1); // Salir con código de error
      });
  });

program.parse(process.argv);
