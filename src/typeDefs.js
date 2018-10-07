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
}
# Agrega debajo definiciones de tipo como File
type File {
  name: String!
  type: String!
}
type Dir {
  name: String!
  type: String!
  files: [File!]!
  dirs: [Dir!]!
}
`;
