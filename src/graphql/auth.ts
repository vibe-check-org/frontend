import { gql } from '@apollo/client';


export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
      user {
        id
        email
        vorname
        nachname
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($input: CreateUserInput!) {
    register(createUserInput: $input) {
      id
      email
    }
  }
`;

