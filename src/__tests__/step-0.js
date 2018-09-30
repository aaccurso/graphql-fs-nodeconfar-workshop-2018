const { graphql } = require('graphql');
const schema = require('../schema');

describe('step 0', () => {
  it('should query hello', async () => {
    const source = `
      query hello {
        hello
      }
    `;

    expect(await graphql({ schema, source })).toMatchSnapshot();
  });

  it('should query hello nodeconf', async () => {
    const source = `
      query hello {
        hello(name: "NodeConf")
      }
    `;

    expect(await graphql({ schema, source })).toMatchSnapshot();
  });
});
