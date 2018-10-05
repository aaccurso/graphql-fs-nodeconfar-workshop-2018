/**
 * @module Schema
 * El esquema creado a partir de los resolvers y
 * las definiciones de tipos.
 */

const { makeExecutableSchema } = require('graphql-tools');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

module.exports = makeExecutableSchema({ typeDefs, resolvers });
