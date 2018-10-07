const { graphql } = require('graphql');
const schema = require('../schema');
const { listDir, listDirRecursive } = require('../queries');

describe('step 6', () => {
  it('should query list dir', async () => {
    expect(await graphql({ schema, source: listDir })).toMatchSnapshot();
  });

  it('should query list dir recursively', async () => {
    expect(await graphql({ schema, source: listDirRecursive })).toMatchSnapshot();
  });
});
