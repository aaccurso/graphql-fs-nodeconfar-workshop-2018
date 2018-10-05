/**
 * @module FileSystem
 * Helpers para manipular el filesystem.
 */

const fs = require('fs');
const util = require('util');

const fsReadDir = async (args) => {
  const files = await util.promisify(fs.readdir)(args);

  // Filter out files that are hidden by the OS such as .DS_Store
  return files.filter(name => !/^\./.test(name));
};
const fsWriteFile = util.promisify(fs.writeFile);
const fsStat = util.promisify(fs.stat);

const ROOT_PATH = `${__dirname}/__tests__/The_Simpsons`;

module.exports = {
  ROOT_PATH,
  fsReadDir,
  fsWriteFile,
  fsStat,
};
