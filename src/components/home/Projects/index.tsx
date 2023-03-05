import useInfiniteScroll from "react-infinite-scroll-hook";
import { useQuery } from "urql";

import { formatGraphqlError } from "~/components/common/ErrorBoundary";
import useCursor from "~/hooks/use-cursor";
import type {
  Framework,
  ProjectsQuery,
  ProjectsQueryVariables,
} from "~/types/graphql.generated";
import { PROJECT_LIMIT } from "~/utils/constants";

import ProjectCard from "./ProjectCard";
import { PROJECTS_QUERY } from "./query";

const Projects = () => {
  const { cursor, setCursor, tags, framework, search } = useCursor();

  const [{ data, fetching, error }, retry] = useQuery<
    ProjectsQuery,
    ProjectsQueryVariables
  >({
    query: PROJECTS_QUERY,
    variables: {
      where: {
        framework: framework !== "all" ? (framework as Framework) : undefined,
        _search: search || undefined,
        tags_some: tags?.length === 0 ? undefined : { name_in: tags },
      },
      first: PROJECT_LIMIT,
      after: cursor || undefined,
    },
  });
  const [observe] = useInfiniteScroll({
    loading: fetching,
    hasNextPage: !!data?.projectsConnection.pageInfo.hasNextPage,
    disabled: !!error,
    rootMargin: "0px 0px 400px 0px",
    onLoadMore() {
      // setCursor("xx");
      setCursor(data?.projectsConnection.pageInfo.endCursor);
    },
  });

  if (error) {
    return (
      <section className="flex flex-col items-center">
        <p className="text-red-500 text-lg">{formatGraphqlError(error)}</p>
        <button
          className="text-red-500 border border-current rounded"
          onClick={retry}
        >
          Try Again
        </button>
      </section>
    );
  }

  if (
    data?.projectsConnection?.edges &&
    data.projectsConnection.edges.length <= 0
  ) {
    return (
      <section className="flex flex-col items-center">
        <p className="text-red-500 text-xl font-medium">
          Sorry, we could not find any match
          {search && (
            <>
              for <b>{search}</b>
            </>
          )}
        </p>
        <p className="text-sm">
          Please try {search ? "searching" : "filtering"} with another term
        </p>
      </section>
    );
  }

  return (
    <section>
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-12 mx-0 sm:mx-6 lg:mx-18">
        {data?.projectsConnection?.edges?.map(({ node: project }) => {
          return <ProjectCard key={project.id} project={project} />;
        })}
      </section>

      {(data?.projectsConnection.pageInfo.hasNextPage || fetching) && (
        <div className="grid place-items-center" ref={observe}>
          Loading...
          {/* <Loader variant="bars" color="cyan" size="lg" /> */}
        </div>
      )}
    </section>
  );
};

export default Projects;
