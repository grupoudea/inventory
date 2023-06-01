import { gql } from "graphql-tag";

const userTypesDefs = gql`
  type User {
    id: Int!
    name: String!
    email: String!
    rol_id: Int!
    rol: Rol!
    creation_date: String!
  }

  type Query {
    users: [User!]!
    user(email: String!): User
  }

  type Mutation {
    createUser(email: String!, name: String!, rolId: Int!): User!
    updateUser(id: Int!, rolId: Int!): User!
    deleteUser(id: Int!): User
  }
`;

export { userTypesDefs };
