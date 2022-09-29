import {
  ActionIcon,
  Card,
  createStyles,
  Group,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import Image from "next/future/image";
import { forwardRef } from "react";

import { frameworks } from "~/utils/frameworks";

import type projects from "./data.json";

export type ProjectCardProps = {
  project: typeof projects[number];
};

const useStyles = createStyles((theme) => ({
  card: {
    boxShadow: theme.shadows.sm,
    transition: "box-shadow 0.25s ease-in, scale 0.25s ease-out",
    "&:hover": {
      scale: "1.05",
      boxShadow: theme.shadows.md,
    },
  },
  section: { position: "relative", aspectRatio: "3/2" },
  framework: { borderColor: "#E0E0E0" },
}));

const ProjectCard = forwardRef<HTMLAnchorElement, ProjectCardProps>(
  ({ project }, ref) => {
    const { classes } = useStyles();

    const framework = frameworks.find((f) => f.name == project.framework)!;

    return (
      <Card
        key={project.id}
        component={NextLink}
        href="/projects/[slug]"
        as={`/projects/${project.slug}`}
        title={project.title}
        className={classes.card}
        p="xl"
        radius="md"
        ref={ref}
      >
        <Card.Section component="figure" className={classes.section}>
          <Image src={project.image.url} alt={project.title} fill />
        </Card.Section>

        <article>
          <Group position="apart">
            <Title order={3} weight={600}>
              {project.title}
            </Title>

            <Tooltip label={project.framework} withArrow transition="pop">
              <ActionIcon
                variant="outline"
                size="xl"
                radius="xl"
                className={classes.framework}
              >
                <framework.icon height={28} width={28} />
              </ActionIcon>
            </Tooltip>
          </Group>

          <Text mt="lg" size="lg" component="time" dateTime={project.createdAt}>
            {new Intl.DateTimeFormat(["en-UK", "en-US"], {
              dateStyle: "medium",
            }).format(new Date(project.createdAt))}
          </Text>
        </article>
      </Card>
    );
  }
);

ProjectCard.displayName = "ProjectCard";
export default ProjectCard;
