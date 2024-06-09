import { gql } from "@apollo/client";

export const LOGGED_USER = gql`
  query LOGGED_USER {
    me {
      id
    }
  }
`;
