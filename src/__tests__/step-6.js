const { graphql } = require('graphql');
const schema = require('../schema');

describe('step 6', () => {
  it('should query list dir', async () => {
    const source = `
      query lsDir {
        ls(dir: "Mother") {
          name
          type
          ... on Dir {
            parent
            ls {
              name
              type
            }
          }
        }
      }
    `;

    expect(await graphql({ schema, source })).toMatchSnapshot();
  });

  it('should query list dir recursively', async () => {
    const source = `
      query lsDir {
        ls(dir: "Mother") {
          name
          type
          ... on Dir {
            parent
            ls {
              name
              type
            }
          }
        }
      }
    `;

    expect(await graphql({ schema, source })).toMatchSnapshot();
  });
});
