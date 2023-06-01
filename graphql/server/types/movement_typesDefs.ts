import { gql } from "graphql-tag";

const movementTypeDefs = gql`
  type Movement {
    id: Int!
    quantity: Int!
    creation_date: String!
    movement_type: String!
    material: Material!
    material_id: Int!
  }

  type Query {
    movements: [Movement!]!
    movements(idMaterial: Int): [Movement!]!
    movement(id: Int!): Movement
  }

  type Mutation {
    createMovement(
      quantity: Int!
      movement_type: String!
      material_id: Int!
    ): Movement!
    updateMovement(
      id: Int!
      quantity: Int!
      movement_type: String!
      material_id: Int!
    ): Movement!
    deleteMovement(id: Int!): Movement
  }
`;

export { movementTypeDefs };
