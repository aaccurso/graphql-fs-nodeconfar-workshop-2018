const { graphql } = require('graphql');
const schema = require('../schema');
const { readDir } = require('../filesystem');
const { hello, helloNodeConf } = require('../queries');

describe('step 0', () => {
  it('should query hello', async () => {
    expect(await graphql({ schema, source: hello })).toMatchSnapshot();
  });

  it('should query hello nodeconf', async () => {
    expect(await graphql({ schema, source: helloNodeConf })).toMatchSnapshot();
  });

  describe('readDir', () => {
    it('should list files and directories', async () => {
      const files = await readDir();

      expect(files).toMatchSnapshot();
    });
  });
});
