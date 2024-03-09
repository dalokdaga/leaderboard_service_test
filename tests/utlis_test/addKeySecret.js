const KeySecret = require('../../models/keySecretModel');

const crearClaveSecreta = async (clave, descripcion, algoritmo) => {
  const nuevaClave = new KeySecret({
    key: clave,
    description: descripcion,
    algorithm: algoritmo
  });
  await nuevaClave.save();
};

module.exports = crearClaveSecreta;
