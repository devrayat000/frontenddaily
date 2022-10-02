import { Center, Loader, SimpleGrid } from "@mantine/core";
import { useInView } from "react-cool-inview";
import shallow from "zustand/shallow";

import type { Framework } from "~/graphql/generated";
import { useProjectsQuery } from "~/graphql/generated";
import { useFilterStore } from "~/stores/filter";

// import initialProjects from "./data.json";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  // const [projects, setProjects] = useState(initialProjects);
  const { framework, _search } = useFilterStore(
    (store) => ({
      framework: store.framework,
      _search: store.search,
    }),
    shallow
  );
  const [{ data }] = useProjectsQuery({
    variables: {
      where: {
        AND: [
          {
            framework:
              framework !== "all" ? (framework as Framework) : undefined,
          },
          { _search },
        ],
      },
    },
  });

  const { observe } = useInView<HTMLDivElement>({
    rootMargin: "200px",
    // onEnter: async ({ unobserve }) => {
    //   unobserve();
    //   await new Promise((res) => setTimeout(res, 1000));
    //   setProjects((prev) => [...prev, ...initialProjects]);
    //   observe();
    // },
  });

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
        {data?.projects?.map((project) => {
          return <ProjectCard key={project.id} project={project} />;
        })}
      </SimpleGrid>

      <Center ref={observe}>
        <Loader variant="bars" color="cyan" size="lg" />
      </Center>
    </section>
  );
};

export default Projects;
