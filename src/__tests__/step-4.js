const { graphql } = require('graphql');
const schema = require('../schema');
const { list } = require('../queries');

describe('step 4', () => {
  it('should query list', async () => {
    expect(await graphql({ schema, source: list })).toMatchSnapshot();
  });
});
