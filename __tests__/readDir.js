const fs = require('fs');
const util = require('util');

const readdir = util.promisify(fs.readdir);

describe('promisified readdir', () => {
  it('should read dir', async () => {
    const files = await readdir(
      `${__dirname}/mockDir`,
      'utf8',
    );

    expect(files).toEqual(['dirA', 'fileA.txt', 'fileB.txt']);
  });
});
