import { Button, Center, Loader, SimpleGrid, Stack, Text } from "@mantine/core";
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
      <Stack align="center">
        <Text size="lg" color="red">
          {formatGraphqlError(error)}
        </Text>
        <Button variant="outline" color="red" onClick={retry}>
          Try Again
        </Button>
      </Stack>
    );
  }

  if (
    data?.projectsConnection?.edges &&
    data.projectsConnection.edges.length <= 0
  ) {
    return (
      <Stack align="center">
        <Text component="p" size="xl" weight={500}>
          Sorry, we could not find any match
          {search && (
            <>
              for <b>{search}</b>
            </>
          )}
        </Text>
        <Text component="p" size="sm">
          Please try {search ? "searching" : "filtering"} with another term
        </Text>
      </Stack>
    );
  }

  return (
    <section>
      <SimpleGrid
        cols={3}
        verticalSpacing="xl"
        spacing={"md"}
        breakpoints={[
          { maxWidth: "md", cols: 2 },
          { maxWidth: "sm", cols: 1 },
        ]}
        sx={(theme) => ({
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

      {(data?.projectsConnection.pageInfo.hasNextPage || fetching) && (
        <Center ref={observe}>
          <Loader variant="bars" color="cyan" size="lg" />
        </Center>
      )}
    </section>
  );
};

export default Projects;
