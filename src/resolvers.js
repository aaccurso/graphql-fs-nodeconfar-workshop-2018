/**
 * @module Resolvers
 * Funciones que resuelven los campos no triviales
 * de los tipos de nuestro esquema.
 */

module.exports = {
  Query: {
    hello(obj, { name }) {
      return `Hello ${name || 'World'}!`;
    },
  },
};
