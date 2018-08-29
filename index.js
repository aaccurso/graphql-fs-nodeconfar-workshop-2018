const repl = require('repl');
const { graphql, buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello(name: String): String!
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
    hello: ({ name }) => `Hello ${name || 'World'}`
};

// Eval REPL query input and print out the response
const graphqlEval = (query, context, filename, callback) => {
    graphql(schema, query, root).then(response => callback(null, response));
};

repl.start({ prompt: '> ', eval: graphqlEval });
