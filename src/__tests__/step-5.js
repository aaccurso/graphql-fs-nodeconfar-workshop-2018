const { graphql } = require('graphql');
const schema = require('../schema');

describe('step 5', () => {
  it('should query list on Dir', async () => {
    const source = `
      ls {
        name
        type
        ... on Dir {
          parent
        }
      }
    `;

    expect(await graphql({ schema, source })).toMatchSnapshot();
  });  

  it('should query list recursively', async () => {
    const source = `
      ls {
        name
        type
        ... on Dir {
          ls {
            name
            type
          }
        }
      }
    `;

    expect(await graphql({ schema, source })).toMatchSnapshot();
  });
});
