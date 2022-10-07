import { Center, Loader, SimpleGrid } from "@mantine/core";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useQuery } from "urql";

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

  const [{ data, fetching, error }] = useQuery<
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
      setCursor(data?.projectsConnection.pageInfo.endCursor);
    },
  });

  // const { observe } = useInView<HTMLDivElement>({
  //   rootMargin: "200px",
  //   onEnter: async ({ unobserve }) => {
  //     unobserve();
  //     if (data?.projectsConnection.pageInfo.hasNextPage) {
  //       setCursor(data?.projectsConnection.pageInfo.endCursor ?? "");
  //     }
  //   },
  // });

  // useEffect(() => {
  //   if (data?.projectsConnection.pageInfo.hasNextPage) {
  //     observe();
  //   }
  // }, [
  //   data?.projectsConnection.pageInfo.hasNextPage,
  //   data?.projectsConnection.pageInfo.endCursor,
  //   observe,
  // ]);

  return (
    <section>
      <SimpleGrid
        cols={3}
        verticalSpacing="xl"
        breakpoints={[
          { maxWidth: "md", cols: 2 },
          { maxWidth: "sm", cols: 1 },
        ]}
        sx={(theme) => ({
          gap: theme.spacing.xl * 1.7,
          margin: `${theme.spacing.xl * 2}px ${theme.spacing.xl * 3}px`,
          [theme.fn.smallerThan("md")]: {
            marginLeft: theme.spacing.xl,
            marginRight: theme.spacing.xl,
          },
          [theme.fn.smallerThan("xs")]: {
            marginLeft: 0,
            marginRight: 0,
          },
        })}
      >
        {data?.projectsConnection?.edges?.map(({ node: project }) => {
          return <ProjectCard key={project.id} project={project} />;
        })}
      </SimpleGrid>

      {data?.projectsConnection.pageInfo.hasNextPage && (
        <Center ref={observe}>
          <Loader variant="bars" color="cyan" size="lg" />
        </Center>
      )}
    </section>
  );
};

export default Projects;
