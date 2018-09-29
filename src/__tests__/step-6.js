const { graphql } = require('graphql');
const schema = require('../schema');

describe('step 6', () => {
  it('should query list dir', async () => {
    const source = `
      query lsDir {
        ls(dir: "Mother") {
          name
          type
        }
      }
    `;

    expect(await graphql({ schema, source })).toMatchSnapshot();
  });

  it('should query list dir recursively', async () => {
    const source = `
      query listDir {
        ls(dir: "Mother") {
          ...stats
          ... on Dir {
            parent
            ...stats
          }
        }
      }
      
      fragment stats on Stat {
        name
        type
      }
    `;

    expect(await graphql({ schema, source })).toMatchSnapshot();
  });
});
