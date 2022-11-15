import { Button, Center, Loader, SimpleGrid, Stack, Text } from "@mantine/core";
import useInfiniteScroll from "react-infinite-scroll-hook";
import useSWRInfinite from "swr/infinite";

import { formatGraphqlError } from "~/components/common/ErrorBoundary";
import useCursor from "~/hooks/use-cursor";
import type { ProjectsQuery } from "~/types/graphql.generated";

import createGetKey from "./getKey";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const { tags, framework, search } = useCursor();

  const {
    data,
    isValidating: fetching,
    error,
    setSize,
    mutate,
  } = useSWRInfinite<ProjectsQuery>(
    createGetKey({
      framework,
      search,
      tags,
    }),
    {
      revalidateFirstPage: false,
      persistSize: true,
    }
  );

  const [observe] = useInfiniteScroll({
    loading: fetching,
    hasNextPage: !!data?.at(-1)?.projectsConnection.pageInfo.hasNextPage,
    disabled: !!error,
    rootMargin: "0px 0px 400px 0px",
    onLoadMore() {
      setSize((size) => size + 1);
    },
  });

  function retry() {
    mutate(undefined, { revalidate: true });
  }

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

  if (!data?.length) {
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
        {data.map((d) =>
          d?.projectsConnection?.edges?.map(({ node: project }) => {
            return <ProjectCard key={project.id} project={project} />;
          })
        )}
      </SimpleGrid>

      {(data?.at(-1)?.projectsConnection.pageInfo.hasNextPage || fetching) && (
        <Center ref={observe}>
          <Loader variant="bars" color="cyan" size="lg" />
        </Center>
      )}
    </section>
  );
};

export default Projects;
