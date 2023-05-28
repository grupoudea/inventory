import { gql } from 'graphql-tag';

const materialTypeDefs = gql`
  type Material {
    id: Int!
    name: String!
    available: Int!
    creation_date: String!
    user_id: Int!
    user: User!
    movement: [Movement!]!
  }

  type Query {
    materials: [Material!]!
    materials(idUser:Int): [Material!]!
    material(id: Int!): Material
  }

  type Mutation {
    createMaterial(name: String!, available: Int!, user_id: Int!): Material!
    updateMaterial(id: Int!, name: String!, available: Int!, user_id: Int!): Material!
    deleteMaterial(id: Int!): Material
  }
`;

export { materialTypeDefs };