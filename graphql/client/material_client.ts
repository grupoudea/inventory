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

export { GET_MATERIALS };
