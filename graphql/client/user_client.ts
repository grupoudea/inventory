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
      id
      email
      name
      rol {
        name
      }
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($email: String!, $rolId: Int!) {
    createUser(email: $email, rolId: $rolId) {
      creation_date
      email
      id
      rol_id
    }
  }
`;

export { GET_USERS, GET_USER, CREATE_USER };
