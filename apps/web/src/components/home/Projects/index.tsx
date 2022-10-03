import { Center, Loader, SimpleGrid } from "@mantine/core";
import { useEffect, useState } from "react";
import { useInView } from "react-cool-inview";
import shallow from "zustand/shallow";

import type { Framework } from "~/graphql/generated";
import { useProjectsRelayQuery } from "~/graphql/generated";
import useLimit from "~/hooks/use-limit";
import { useTagStore } from "~/stores/chip";
import { useFilterStore } from "~/stores/filter";

import ProjectCard from "./ProjectCard";

const Projects = () => {
  const [after, setAfter] = useState<string | undefined | null>();
  const [framework, _search] = useFilterStore(
    (store) => [store.framework, store.search],
    shallow
  );
  const tags = useTagStore((store) => Array.from(store.tags));
  const limit = useLimit();
  const [{ data }] = useProjectsRelayQuery({
    variables: {
      where: {
        framework: framework !== "all" ? (framework as Framework) : undefined,
        _search: _search || undefined,
        tags_some: { name_in: tags.length === 0 ? undefined : tags },
      },
      first: limit,
      after,
    },
  });

  const { observe } = useInView<HTMLDivElement>({
    rootMargin: "200px",
    onEnter: async ({ unobserve }) => {
      unobserve();
      if (data?.projectsConnection.pageInfo.hasNextPage) {
        setAfter(data?.projectsConnection.pageInfo.endCursor);
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
