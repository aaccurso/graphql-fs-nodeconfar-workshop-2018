const fs = require('fs');
const util = require('util');

const fsReadDir = util.promisify(fs.readdir);
const fsWriteFile = util.promisify(fs.writeFile);
const fsStat = util.promisify(fs.stat);

const ROOT_PATH = `${__dirname}/__tests__/mockDir`;
const FILE_TYPE = 'File';
const DIR_TYPE = 'Dir';

const readDir = async ({ dir, parent, typeFilter }) => {
  const parentPath = parent ? `${parent}/` : '';
  const path = `${ROOT_PATH}/${parentPath}${dir || ''}`;
  const files = await fsReadDir(path);

  const stats = await Promise.all(files.map(async (name) => {
    const stat = await fsStat(`${path}/${name}`);

    if (stat.isFile()) {
      return { name, type: FILE_TYPE };
    }

    return {
      name,
      dir: name,
      parent: `${parentPath}${dir || ''}`,
      type: DIR_TYPE,
    };
  }));

  return typeFilter
    ? stats.filter(({ type }) => type === typeFilter)
    : stats;
};

const writeFile = async (obj, { name, content }) => {
  await fsWriteFile(`${ROOT_PATH}/${name}`, content);

  return {
    name,
    type: FILE_TYPE,
  };
};

const files = (obj, args) => readDir({ ...args, ...obj, typeFilter: FILE_TYPE });

const dirs = (obj, args) => readDir({ ...args, ...obj, typeFilter: DIR_TYPE });

const ls = (obj, args) => readDir({ ...args, ...obj });

module.exports = {
  files,
  dirs,
  ls,
  writeFile,
};
