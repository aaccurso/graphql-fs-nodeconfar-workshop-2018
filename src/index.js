const { ApolloServer } = require('apollo-server');
const schema = require('./schema');

// Se crea el server de Apollo que va a escuchar las consultas
// y resolverlas a partir de nuestro esquema.
const server = new ApolloServer({ schema });

// Se comienza a escuchar las consultas y se levanta la interfaz
// gráfica para realizar consultas con GraphQL Playground.
server.listen().then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀  Server ready at ${url}`);
});
