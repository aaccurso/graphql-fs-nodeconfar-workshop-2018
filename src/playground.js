const {
  hello,
  files,
  dirs,
  filesAndDirsRecursive,
  list,
  listRecursive,
  listDirRecursive,
  writeFile,
} = require('./queries');

const endpoint = 'http://localhost:4000';
const responses = [''];
const createTab = (name, query, variables = '') => ({
  name,
  query: query.trim(),
  endpoint,
  responses,
  variables: JSON.stringify(variables, null, 2),
});

module.exports = {
  tabs: [
    createTab('Step 0', hello),
    createTab('Step 1', files),
    createTab('Step 2', dirs),
    createTab('Step 3', filesAndDirsRecursive),
    createTab('Step 4', list),
    createTab('Step 5', listRecursive),
    createTab('Step 6', listDirRecursive),
    createTab('Step 7', writeFile, {
      name: 'test.txt',
      content: 'test',
    }),
  ],
};
