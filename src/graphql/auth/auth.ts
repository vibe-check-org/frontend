// src/graphql/auth/auth.ts
import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation logon($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      access_token
      expires_in
      refresh_token
      refresh_expires_in
    }
  }
`;

export const REFRESH_TOKEN = gql`
  mutation Refresh($refreshToken: String!) {
    refresh(refresh_token: $refreshToken) {
      access_token
      expires_in
      refresh_token
      refresh_expires_in
      roles
      id_token
      scope
    }
  }
`;

export const SIGN_UP = gql`
mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      vorname
      nachname
      email
      geburtsdatum
      profilbildUrl
      rolle
      erstelltAm
      aktualisiertAm
      name
    }
  }
`;

// console.error('Token refresh failed:', JSON.stringify(error, null, 2));
// mutation RefreshToken($refreshToken: String!) {
