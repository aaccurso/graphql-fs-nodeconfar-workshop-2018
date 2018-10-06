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
const FILE_TYPE = 'File';
const DIR_TYPE = 'Dir';

/**
 * Lista archivos y directorios bajo un cierto path
 * @param {String} path - Directorio a ser leído
 */
const readDir = async (path = '') => {
  const finalPath = `${ROOT_PATH}/${path}`;
  const files = await fsReadDir(finalPath);

  return Promise.all(files.map(async (name) => {
    const stat = await fsStat(`${finalPath}/${name}`);

    if (stat.isFile()) {
      return { name, type: FILE_TYPE };
    }

    return {
      name,
      type: DIR_TYPE,
    };
  }));
};

/**
 * Crea un archivo y lo escribe con el contenido provisto
 * @param {String} name - Nombre del archivo
 * @param {String} content - Contenido del archivo
 */
const writeFile = async (name, content) => {
  await fsWriteFile(`${ROOT_PATH}/${name}`, content);

  return {
    name,
    type: FILE_TYPE,
  };
};

module.exports = {
  ROOT_PATH,
  DIR_TYPE,
  FILE_TYPE,
  readDir,
  writeFile,
};
