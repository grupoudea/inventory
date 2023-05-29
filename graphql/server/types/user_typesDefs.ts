import { gql } from "graphql-tag";

const userTypesDefs = gql`
type User {
  id: Int!
  email: String!
  password: String!
  rol_id:Int!
  rol: Rol!

}

type Query {
  users: [User!]!
  user(id: Int!): User
}

type Mutation {
  createUser(email: String!, password: String!, rolId: Int!): User!
  updateUser(id: Int!, email: String!, password: String!, rolId: Int!): User!
  deleteUser(id: Int!): User
}
`;

export {userTypesDefs}