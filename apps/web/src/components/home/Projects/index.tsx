import { Center, Loader, SimpleGrid } from "@mantine/core";
import { useState } from "react";
import { useInView } from "react-cool-inview";

import initialProjects from "./data.json";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const [projects, setProjects] = useState(initialProjects);

  const { observe } = useInView<HTMLDivElement>({
    rootMargin: "200px",
    onEnter: async ({ unobserve }) => {
      unobserve();
      await new Promise((res) => setTimeout(res, 1000));
      setProjects((prev) => [...prev, ...initialProjects]);
      observe();
    },
  });

  return (
    <section>
      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: "md", cols: 2 },
          { maxWidth: "sm", cols: 1 },
        ]}
        sx={(theme) => ({
          gap: theme.spacing.xl * 1.7,
          margin: `${theme.spacing.xl * 2}px ${theme.spacing.xl * 3}px`,
        })}
      >
        {projects.map((project, i) => {
          return <ProjectCard key={project.id + i} project={project} />;
        })}
      </SimpleGrid>

      <Center ref={observe}>
        <Loader variant="bars" color="cyan" size="lg" />
      </Center>
    </section>
  );
};

export default Projects;
