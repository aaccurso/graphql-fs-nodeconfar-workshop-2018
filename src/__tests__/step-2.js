const { graphql } = require('graphql');
const schema = require('../schema');

describe('step 2', () => {
  it('should query files and dirs', async () => {
    const source = `
      query filesAndDirs {
        files {
          name
          type
        }
        dirs {
          name
          type
        }
      }
    `;

    expect(await graphql({ schema, source })).toMatchSnapshot();
  });
});
