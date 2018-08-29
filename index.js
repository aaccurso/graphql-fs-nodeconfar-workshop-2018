const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

readFile(
    'package.json',
    'utf8'
).then(console.log);
