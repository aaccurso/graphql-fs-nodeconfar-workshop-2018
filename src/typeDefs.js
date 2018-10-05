/**
 * @module TypeDefs
 * Definiciones de tipo que conforman nuestro esquema.
 */

const { gql } = require('apollo-server');

module.exports = gql`
type Query {
  hello(name: String): String!
}
`;
