import { Center, Loader, SimpleGrid } from "@mantine/core";
import { useEffect } from "react";
import { useInView } from "react-cool-inview";

import type { Framework } from "~/graphql/generated";
import { useProjectsRelayQuery } from "~/graphql/generated";
import useCursor from "~/hooks/use-cursor";
import useLimit from "~/hooks/use-limit";

import ProjectCard from "./ProjectCard";

const Projects = () => {
  const { cursor, setCursor, tags, framework, search } = useCursor();
  const limit = useLimit();

  const [{ data }] = useProjectsRelayQuery({
    variables: {
      where: {
        framework: framework !== "all" ? (framework as Framework) : undefined,
        _search: search || undefined,
        tags_some: tags?.length === 0 ? undefined : { name_in: tags },
      },
      first: limit,
      after: cursor || undefined,
    },
  });

  const { observe } = useInView<HTMLDivElement>({
    rootMargin: "200px",
    onEnter: async ({ unobserve }) => {
      unobserve();
      if (data?.projectsConnection.pageInfo.hasNextPage) {
        setCursor(data?.projectsConnection.pageInfo.endCursor ?? "");
      }
    },
  });

  useEffect(() => {
    if (data?.projectsConnection.pageInfo.hasNextPage) {
      observe();
    }
  }, [
    data?.projectsConnection.pageInfo.hasNextPage,
    data?.projectsConnection.pageInfo.endCursor,
    observe,
  ]);

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
