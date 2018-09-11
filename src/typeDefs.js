const { gql } = require('apollo-server');

module.exports = gql`
type Query {
  hello(name: String): String!
  files(dir: String): [File!]!
  dirs(dir: String): [Dir!]!
  ls(dir: String): [Stat!]!
}
type Mutation {
  writeFile(name: String!, content: String!): File!
}
interface Stat {
  name: String!
  type: String!
}
type File implements Stat {
  name: String!
  type: String!
}
type Dir implements Stat {
  name: String!
  type: String!
  parent: String!
  files: [File!]!
  dirs: [Dir!]!
  ls: [Stat!]!
}`;
