const { graphql } = require('graphql');
const schema = require('../schema');
const { readDir } = require('../filesystem');

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

  describe('readDir', () => {
    it('should list files and directories', async () => {
      const files = await readDir();

      expect(files).toMatchSnapshot();
    });
  });
});
