const { graphql } = require('graphql');
const schema = require('../schema');

describe('step 3', () => {
  it('should query files and dirs recursively', async () => {
    const source = `
      query filesAndDirs {
        dirs {
          name
          type
          files {
            name
            type
          }
          dirs {
            name
            type
          }
        }
      }
    `;

    expect(await graphql({ schema, source })).toMatchSnapshot();
  });
});
