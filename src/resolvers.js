/**
 * @module Resolvers
 * Funciones que resuelven los campos no triviales
 * de los tipos de nuestro esquema.
 */

const {
  // eslint-disable-next-line no-unused-vars
  FILE_TYPE, DIR_TYPE, readDir, writeFile,
} = require('./filesystem');

module.exports = {
  Query: {
    hello(obj, { name }) {
      return `Hello ${name || 'World'}!`;
    },
    // Agrega debajo los resolvers para Query
    files: async () => {
      const files = await readDir();

      return files.filter(file => file.type === FILE_TYPE);
    },
  },
  // Agrega debajo los resolvers para tipos custom como File
};
