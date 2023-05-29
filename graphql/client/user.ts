import { gql } from "@apollo/client";

const GET_USERS = gql`
  query Users {
    users {
      email
      id
      rol {
        name
      }
      creation_date
    }
  }
`;

const GET_USER = gql`
  query User($email: String!) {
    user(email: $email) {
      email
      name
      rol {
        name
      }
    }
  }
`;

export { GET_USERS, GET_USER };
