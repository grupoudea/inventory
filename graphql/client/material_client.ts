import { gql } from "@apollo/client";
const GET_MATERIALS = gql`
  query Materials {
    materials {
      id
      available
      creation_date
      name
      user_id
    }
  }
`;

const CREATE_MATERIAL = gql`
  mutation CreateMaterial($userId: Int!, $name: String!) {
    createMaterial(user_id: $userId, name: $name) {
      name
    }
  }
`;

export { GET_MATERIALS, CREATE_MATERIAL };
