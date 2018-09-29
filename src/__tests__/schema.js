const { graphql } = require('graphql');
const fs = require('fs');
const util = require('util');
const { ROOT_PATH } = require('../filesystem');
const schema = require('../schema');

const fsUnlink = util.promisify(fs.unlink);

describe('graphql-fs schema', () => {
  it('should query files and dirs', async () => {
    const source = `
    query filesAndDirs {
      files {
        name
        type
      }
      dirs {
        name
        type
        files {
          name
          type
        }
        dirs {
          name
          type
        }
      }
    }
    `;

    expect(await graphql({ schema, source })).toMatchSnapshot();
  });

  it('should ls root dir', async () => {
    const source = `
    query ls {
      ls {
        name
        type
        ... on Dir {
          ls {
            name
            type
          }
        }
      }
    }
    `;

    expect(await graphql({ schema, source })).toMatchSnapshot();
  });

  it('should ls Mother', async () => {
    const source = `
    query lsDirA {
      ls(dir: "Mother") {
        name
        type
        ... on Dir {
          parent
          ls {
            name
            type
          }
        }
      }
    }
    `;

    expect(await graphql({ schema, source })).toMatchSnapshot();
  });

  it('should execute writeFile mutation', async () => {
    const source = `
    mutation writeFile($name: String!, $content: String!) {
      writeFile(name: $name, content: $content) {
        name
      }
    }
    `;
    const variableValues = {
      name: 'test.txt',
      content: 'test',
    };

    expect(await graphql({ schema, source, variableValues })).toMatchSnapshot();
    expect(await fsUnlink(`${ROOT_PATH}/test.txt`)).toBeUndefined();
  });
});
