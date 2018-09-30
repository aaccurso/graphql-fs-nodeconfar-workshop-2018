const { graphql } = require('graphql');
const { writeFile } = require('../filesystem');
const schema = require('../schema');

jest.mock('../filesystem');

describe('step 7', () => {
  it('should execute writeFile mutation', async () => {
    writeFile.mockImplementation(() => Promise.resolve({
      name: 'test.txt',
    }));
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
    expect(writeFile).toBeCalledWith(
      undefined,
      { content: 'test', name: 'test.txt' },
      undefined,
      expect.anything(),
    );
  });
});
