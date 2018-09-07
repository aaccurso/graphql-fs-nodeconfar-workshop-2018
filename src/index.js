const repl = require('repl');
const { graphql, buildSchema } = require('graphql');
const fs = require('fs');
const util = require('util');

const fsReadDir = util.promisify(fs.readdir);
const fsWriteFile = util.promisify(fs.writeFile);
const fsStat = util.promisify(fs.stat);

const ROOT_PATH = '__tests__/mockDir';
const FILE_TYPE = 'File';
const DIR_TYPE = 'Dir';

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
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
`);

let readDir;

class File {
  constructor({ name }) {
    this.name = name;
    this.type = FILE_TYPE;
  }
}

class Dir {
  constructor({ name, parent }) {
    this.name = name;
    this.parent = parent;
    this.type = DIR_TYPE;
  }

  files() {
    return readDir({
      dir: this.name,
      parent: this.parent,
      typeFilter: FILE_TYPE,
    });
  }

  dirs() {
    return readDir({
      dir: this.name,
      parent: this.parent,
      typeFilter: DIR_TYPE,
    });
  }
}

readDir = async ({ dir, parent, typeFilter }) => {
  const parentPath = parent ? `${parent}/` : '';
  const path = `${ROOT_PATH}/${parentPath}${dir || ''}`;
  const files = await fsReadDir(path);

  const stats = await Promise.all(files.map(async (name) => {
    const stat = await fsStat(`${path}/${name}`);
    return stat.isFile()
      ? new File({ name })
      : new Dir({ name, parent: `${parentPath}${dir || ''}` });
  }));

  return stats.filter(({ type }) => type === typeFilter);
};

// The root provides a resolver function for each API endpoint
const root = {
  hello: ({ name }) => `Hello ${name || 'World'}`,
  files: args => readDir({ ...args, typeFilter: FILE_TYPE }),
  dirs: args => readDir({ ...args, typeFilter: DIR_TYPE }),
  writeFile: async ({ name, content }) => {
    await fsWriteFile(`${ROOT_PATH}/${name}`, content);

    return new File({
      name,
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
