/**
 * @module TypeDefs
 * Definiciones de tipo que conforman nuestro esquema.
 */

const { gql } = require('apollo-server');

module.exports = gql`
type Query {
  hello(name: String): String!
  # Agrega debajo definiciones de campos para Query
  files: [File!]!
  dirs: [Dir!]!
  ls(dir: String): [Stat!]!
}
# Agrega debajo definiciones de tipo como File
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
  files: [File!]!
  dirs: [Dir!]!
  ls: [Stat!]!
}
`;
