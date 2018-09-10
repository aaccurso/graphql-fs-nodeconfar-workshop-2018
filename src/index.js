const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs');
const util = require('util');

const fsReadDir = util.promisify(fs.readdir);
const fsWriteFile = util.promisify(fs.writeFile);
const fsStat = util.promisify(fs.stat);

const ROOT_PATH = '__tests__/mockDir';
const FILE_TYPE = 'File';
const DIR_TYPE = 'Dir';

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello(name: String): String!
    files(dir: String): [File!]!
    dirs(dir: String): [Dir!]!
  }
  type Mutation {
    writeFile(name: String!, content: String!): File!
  }
  type File {
    name: String!
    type: String!
  }
  type Dir {
    name: String!
    type: String!
    parent: String!
    files(dir: String): [File!]!
    dirs(dir: String): [Dir!]!
  }
`;

const readDir = async ({ dir, parent, typeFilter }) => {
  const parentPath = parent ? `${parent}/` : '';
  const path = `${ROOT_PATH}/${parentPath}${dir || ''}`;
  const files = await fsReadDir(path);

  const stats = await Promise.all(files.map(async (name) => {
    const stat = await fsStat(`${path}/${name}`);

    return stat.isFile()
      ? { name, type: FILE_TYPE }
      : { name, parent: `${parentPath}${dir || ''}`, type: DIR_TYPE };
  }));

  return stats.filter(({ type }) => type === typeFilter);
};

const files = (obj, args) => readDir({ ...obj, ...args, typeFilter: FILE_TYPE });

const dirs = (obj, args) => readDir({ ...obj, ...args, typeFilter: DIR_TYPE });

// The root provides a resolver function for each API endpoint
const resolvers = {
  Query: {
    hello: (obj, { name }) => `Hello ${name || 'World'}!`,
    files,
    dirs,
  },
  Dir: {
    files,
    dirs,
  },
  Mutation: {
    writeFile: async (obj, { name, content }) => {
      await fsWriteFile(`${ROOT_PATH}/${name}`, content);

      return {
        name,
        type: FILE_TYPE,
      };
    },
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀  Server ready at ${url}`);
});
