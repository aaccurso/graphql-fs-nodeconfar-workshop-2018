/**
 * @module FileSystem
 * Helpers para manipular el filesystem.
 */

const fs = require('fs');
const util = require('util');

const fsReadDir = async (args) => {
  const files = await util.promisify(fs.readdir)(args);

  // Descartar archivos ocultos por el OS como .DS_Store
  return files.filter(name => !/^\./.test(name));
};
const fsWriteFile = util.promisify(fs.writeFile);
const fsStat = util.promisify(fs.stat);

const ROOT_PATH = 'The_Simpsons';
const FILE_TYPE = 'File';
const DIR_TYPE = 'Dir';

/**
 * Lista archivos y directorios bajo un cierto path
 * @param {String} path - Directorio a ser leído
 * @returns {Array} stats - Listado de archivos y directorios
 */
const readDir = async (path = '') => {
  const finalPath = `${ROOT_PATH}/${path}`;
  const files = await fsReadDir(finalPath);

  return Promise.all(files.map(async (name) => {
    const stat = await fsStat(`${finalPath}/${name}`);
    const type = stat.isFile() ? FILE_TYPE : DIR_TYPE;

    return {
      name,
      type,
    };
  }));
};

/**
 * Crea un archivo y lo escribe con el contenido provisto
 * @param {String} name - Nombre del archivo
 * @param {String} content - Contenido del archivo
 * @returns {Object} file - Representación del archivo creado
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
