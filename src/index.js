const repl = require('repl');
const { graphql, buildSchema } = require('graphql');
const fs = require('fs');
const util = require('util');

const readDir = util.promisify(fs.readdir);
const writeFile = util.promisify(fs.writeFile);
const statFn = util.promisify(fs.stat);

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello(name: String): String!
    readDir(dir: String): [Stat!]!
  }
  type Mutation {
    writeFile(name: String!, content: String!): Stat!
  }
  type Stat {
    name: String!
    type: String!
  }
`);

class Stat {
  constructor({ name, type }) {
    this.name = name;
    this.type = type;
  }
}

const mockDirPath = '__tests__/mockDir';

const FILE_TYPE = 'file';
const DIR_TYPE = 'dir';

// The root provides a resolver function for each API endpoint
const root = {
  hello: ({ name }) => `Hello ${name || 'World'}`,
  readDir: async ({ dir }) => {
    const path = `${mockDirPath}/${dir || ''}`;
    const files = await readDir(path);

    const stats = await Promise.all(files.map(async (name) => {
      const stat = await statFn(`${path}/${name}`);
      const type = stat.isFile() ? FILE_TYPE : DIR_TYPE;

      return new Stat({
        name,
        type,
      });
    }));

    return stats;
  },
  writeFile: async ({ name, content }) => {
    await writeFile(`${mockDirPath}/${name}`, content);

    return new Stat({
      name,
      type: FILE_TYPE,
    });
  },
};

// Eval REPL query input and print out the response
const graphqlEval = (query, context, filename, callback) => {
  graphql(schema, query, root).then(response => callback(null, response));
};

// Custom REPL writer
const writer = output => util.inspect(output, {
  depth: null,
  colors: true,
  compact: false,
});

repl.start({ prompt: '> ', eval: graphqlEval, writer });
