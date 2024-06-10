import { gql } from "@apollo/client";

export const ACCOUNT = gql`
  query USER_ACCOUNT($id: ID!) {
    user(id: $id) {
      id
      firstName
      lastName
    }
  }
`;
