import { gql } from "urql";

export const TAGS_QUERY = gql`
  query Tags($orderBy: TagOrderByInput = name_ASC) {
    tags(orderBy: $orderBy) {
      id
      name
    }
  }
`;

export const FRAMEWORKS_QUERY = gql`
  query Frameworks($orderBy: FrameworkOrderByInput = name_ASC) {
    frameworks(orderBy: $orderBy) {
      id
      name
      logo {
        id
        url
      }
    }
  }
`;
