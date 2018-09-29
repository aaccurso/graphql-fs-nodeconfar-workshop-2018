const { graphql } = require('graphql');
const schema = require('../schema');

describe('step 4', () => {
  it('should query list', async () => {
    const source = `
      query list {
        ls {
          name
          type
        }
      }
    `;

    expect(await graphql({ schema, source })).toMatchSnapshot();
  });
});
