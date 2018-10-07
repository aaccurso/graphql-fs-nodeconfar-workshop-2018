const { graphql } = require('graphql');
const filesystem = require('../filesystem');
const schema = require('../schema');
const { writeFile } = require('../queries');

jest.mock('../filesystem');

describe('step 7', () => {
  it('should execute writeFile mutation', async () => {
    filesystem.writeFile.mockImplementation(() => Promise.resolve({
      name: 'test.txt',
    }));
    const variableValues = {
      name: 'test.txt',
      content: 'test',
    };

    expect(await graphql({ schema, source: writeFile, variableValues })).toMatchSnapshot();
    expect(filesystem.writeFile).toBeCalledWith('test.txt', 'test');
  });
});
