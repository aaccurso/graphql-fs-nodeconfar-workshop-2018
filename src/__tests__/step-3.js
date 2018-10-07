const { graphql } = require('graphql');
const schema = require('../schema');
const { filesAndDirsRecursive } = require('../queries');

describe('step 3', () => {
  it('should query files and dirs recursively', async () => {
    expect(await graphql({ schema, source: filesAndDirsRecursive })).toMatchSnapshot();
  });
});
