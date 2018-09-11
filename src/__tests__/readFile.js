const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

describe('promisified readFile', () => {
  it('should read file', async () => {
    const content = await readFile(
      `${__dirname}/mockFile.txt`,
      'utf8',
    );

    expect(content).toBe('Lorem ipsum');
  });
});
