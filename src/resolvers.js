/**
 * @module Resolvers
 * Funciones que resuelven los campos no triviales
 * de los tipos de nuestro esquema.
 */

const {
  // eslint-disable-next-line no-unused-vars
  FILE_TYPE, DIR_TYPE, readDir, writeFile,
} = require('./filesystem');

const filesResolver = typeFilter => async (obj) => {
  const parent = obj ? obj.name : '';
  const files = await readDir(parent);

  return files.filter(file => file.type === typeFilter);
};

module.exports = {
  Query: {
    hello(obj, { name }) {
      return `Hello ${name || 'World'}!`;
    },
    // Agrega debajo los resolvers para Query
    files: filesResolver(FILE_TYPE),
    dirs: filesResolver(DIR_TYPE),
  },
  // Agrega debajo los resolvers para tipos custom como File
  Dir: {
    files: filesResolver(FILE_TYPE),
    dirs: filesResolver(DIR_TYPE),
  },
};
