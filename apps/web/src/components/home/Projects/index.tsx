import { SimpleGrid } from "@mantine/core";

import projects from "./data.json";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  return (
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
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </SimpleGrid>
  );
};

export default Projects;
