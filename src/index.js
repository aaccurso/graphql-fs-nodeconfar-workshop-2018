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
    readDir(dir: String): [Stats]
    writeFile(file: String!, data: String!): String!
  }
  type Stats {
    name: String!
    type: String!
  }
`);

const mockDirPath = '__tests__/mockDir';

// The root provides a resolver function for each API endpoint
const root = {
  hello: ({ name }) => `Hello ${name || 'World'}`,
  readDir: async ({ dir }) => {
    const path = `${mockDirPath}/${dir || ''}`;
    const files = await readDir(path);

    const stats = await Promise.all(files.map(async (name) => {
      const stat = await statFn(`${path}/${name}`);
      const type = stat.isFile() ? 'file' : 'dir';

      return {
        name,
        type,
      };
    }));

    return stats;
  },
  writeFile: async ({ file, data }) => {
    await writeFile(`${mockDirPath}/${file}`, data);

    return `File ${file} created.`;
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
