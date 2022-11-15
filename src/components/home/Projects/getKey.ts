import type { Framework, ProjectsQuery } from "~/types/graphql.generated";
import { PROJECT_LIMIT } from "~/utils/constants";

import { PROJECTS_QUERY } from "./query";

export type CreateGetKeyParams = {
  cursor?: string | undefined | null;
  search?: string;
  tags?: string[] | undefined;
  framework?: string;
};

export const defaultGetKey = createGetKey({});

export default function createGetKey({
  framework,
  search,
  tags,
}: CreateGetKeyParams) {
  return function getKey(
    index: number,
    prevData: ProjectsQuery | null
  ): [string] | [string, object] {
    if (prevData && !prevData.projectsConnection.pageInfo.hasNextPage) {
      return [PROJECTS_QUERY]; // reached the end
    }

    return [
      PROJECTS_QUERY,
      {
        where: {
          framework: framework !== "all" ? (framework as Framework) : undefined,
          _search: search || undefined,
          tags_some: !tags?.length ? undefined : { name_in: tags },
        },
        first: PROJECT_LIMIT,
        after: prevData?.projectsConnection?.pageInfo?.endCursor || undefined,
      },
    ];
  };
}
