import { gql } from "@apollo/client";

const GET_USERS = gql`
  query Users {
    users {
      email
      id
      rol {
        name
      }
      rol_id
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
  mutation CreateUser($email: String!, $name: String!, $rolId: Int!) {
    createUser(email: $email, name: $name, rolId: $rolId) {
      creation_date
      email
      id
      rol_id
      name
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($updateUserId: Int!, $rolId: Int!) {
    updateUser(id: $updateUserId, rolId: $rolId) {
      creation_date
      email
      id
      name
      rol_id
    }
  }
`;

export { GET_USERS, GET_USER, CREATE_USER, UPDATE_USER };
