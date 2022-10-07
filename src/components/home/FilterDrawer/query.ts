import { gql } from "urql";

export const TAGS_QUERY = gql`
  query Tags($orderBy: TagOrderByInput = name_ASC) {
    tags(orderBy: $orderBy) {
      id
      name
    }
  }
`;
