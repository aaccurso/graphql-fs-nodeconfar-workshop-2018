const { graphql } = require('graphql');
const schema = require('../schema');
const { listRecursive } = require('../queries');

describe('step 5', () => {
  it('should query list recursively', async () => {
    expect(await graphql({ schema, source: listRecursive })).toMatchSnapshot();
  });
});
