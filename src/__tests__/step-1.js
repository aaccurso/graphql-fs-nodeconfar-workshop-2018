const { graphql } = require('graphql');
const schema = require('../schema');
const { files } = require('../queries');

describe('step 1', () => {
  it('should query files', async () => {
    expect(await graphql({ schema, source: files })).toMatchSnapshot();
  });
});
