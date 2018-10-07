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

  if (!typeFilter) {
    return files;
  }
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
    ls: filesResolver(),
  },
  // Agrega debajo los resolvers para tipos custom como File
  Stat: {
    __resolveType(obj) {
      return obj.type;
    },
  },
  Dir: {
    files: filesResolver(FILE_TYPE),
    dirs: filesResolver(DIR_TYPE),
    ls: filesResolver(),
  },
};
