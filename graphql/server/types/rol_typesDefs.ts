import { gql } from "graphql-tag";

const rolTypeDefs = gql`
  type Rol {
    id: Int!
    name: String!
    users: [User!]!
  }

  extend type Query {
    roles: [Rol!]!
    rol(id: Int!): Rol
  }

  extend type Mutation {
    createRole(name: String!): Rol!
    updateRole(id: Int!, name: String!): Rol!
    deleteRole(id: Int!): Rol!
  }
`;

export { rolTypeDefs };
