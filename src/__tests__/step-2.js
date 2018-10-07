const { graphql } = require('graphql');
const schema = require('../schema');
const { dirs, filesAndDirs } = require('../queries');

describe('step 2', () => {
  it('should query dirs', async () => {
    expect(await graphql({ schema, source: dirs })).toMatchSnapshot();
  });

  it('should query files and dirs', async () => {
    expect(await graphql({ schema, source: filesAndDirs })).toMatchSnapshot();
  });
});
