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
export { GET_MOVEMENTS };
