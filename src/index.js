const repl = require('repl');
const { graphql, buildSchema } = require('graphql');
const fs = require('fs');
const util = require('util');

const readDir = util.promisify(fs.readdir);
const writeFile = util.promisify(fs.writeFile);

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello(name: String): String!
    readDir(dir: String): [String!]
    writeFile(file: String!, data: String!): String!
  }
`);

const mockDirPath = '__tests__/mockDir';

// The root provides a resolver function for each API endpoint
const root = {
  hello: ({ name }) => `Hello ${name || 'World'}`,
  readDir: ({ dir }) => readDir(`${mockDirPath}/${dir || ''}`),
  writeFile: ({ file, data }) => writeFile(`${mockDirPath}/${file}`, data)
    .then(() => `File ${file} created.`),
};

// Eval REPL query input and print out the response
const graphqlEval = (query, context, filename, callback) => {
  graphql(schema, query, root).then(response => callback(null, response));
};

repl.start({ prompt: '> ', eval: graphqlEval });
