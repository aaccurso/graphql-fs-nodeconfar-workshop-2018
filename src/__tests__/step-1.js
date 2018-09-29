const { graphql } = require('graphql');
const schema = require('../schema');

describe('step 1', () => {
  it('should query files', async () => {
    const source = `
      query files {
        files {
          name
          type
        }
      }
    `;

    expect(await graphql({ schema, source })).toMatchSnapshot();
  });
});
