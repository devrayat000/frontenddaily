import { gql } from "urql";

export const SIMPLE_PROJECT_FRAGMENT = gql`
  fragment SimpleProject on Project {
    id
    title
    slug
    image {
      id
      url
    }
    framework
    createdAt
  }
`;

export const PROJECTS_QUERY = gql`
  query Projects(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $skip: Int
    $where: ProjectWhereInput
  ) {
    projectsConnection(
      after: $after
      before: $before
      first: $first
      last: $last
      skip: $skip
      where: $where
      orderBy: createdAt_DESC
    ) {
      edges {
        cursor
        node {
          ...SimpleProject
        }
      }
      pageInfo {
        hasNextPage
        pageSize
        endCursor
      }
    }
  }
  ${SIMPLE_PROJECT_FRAGMENT}
`;
