import { gql } from "@apollo/client";

const GET_MOVEMENTS = gql`
  query Movements($idMaterial: Int) {
    movements(idMaterial: $idMaterial) {
      creation_date
      id
      movement_type
      quantity
      material {
        name
      }
    }
  }
`;

const CREATE_MOVEMENT = gql`
  mutation CreateMovement(
    $quantity: Int!
    $movementType: String!
    $materialId: Int!
  ) {
    createMovement(
      quantity: $quantity
      movement_type: $movementType
      material_id: $materialId
    ) {
      creation_date
      id
      movement_type
      quantity
      material_id
    }
  }
`;

export { GET_MOVEMENTS, CREATE_MOVEMENT };
