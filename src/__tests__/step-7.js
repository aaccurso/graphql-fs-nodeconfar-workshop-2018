const { graphql } = require('graphql');
const fs = require('fs');
const util = require('util');
const { ROOT_PATH } = require('../filesystem');
const schema = require('../schema');

const fsUnlink = util.promisify(fs.unlink);

describe('step 7', () => {
  it('should execute writeFile mutation', async () => {
    const source = `
    mutation writeFile($name: String!, $content: String!) {
      writeFile(name: $name, content: $content) {
        name
      }
    }
    `;
    const variableValues = {
      name: 'test.txt',
      content: 'test',
    };

    expect(await graphql({ schema, source, variableValues })).toMatchSnapshot();
    expect(await fsUnlink(`${ROOT_PATH}/test.txt`)).toBeUndefined();
  });
});
