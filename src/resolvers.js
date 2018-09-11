const {
  files,
  dirs,
  ls,
  writeFile,
} = require('./filesystem');

module.exports = {
  Query: {
    hello(obj, { name }) {
      return `Hello ${name || 'World'}!`;
    },
    files,
    dirs,
    ls,
  },
  Dir: {
    files,
    dirs,
    ls,
  },
  Mutation: {
    writeFile,
  },
  Stat: {
    __resolveType(obj) {
      return obj.type;
    },
  },
};
