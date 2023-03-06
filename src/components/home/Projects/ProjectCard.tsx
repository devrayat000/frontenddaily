import { Card, createStyles, Group, Text, Title, Tooltip } from "@mantine/core";
import Image from "next/image";
import NextLink from "next/link";
import { forwardRef } from "react";

import FrameworkIcon from "~/components/common/FrameworkIcon";
import { useProjectStyles } from "~/styles/project";
import type { ProjectsQuery } from "~/types/graphql.generated";
import { formatDate } from "~/utils/datetime";
import { frameworks } from "~/utils/frameworks";

export type ProjectCardProps = {
  project: ProjectsQuery["projectsConnection"]["edges"][number]["node"];
};

const useStyles = createStyles((theme) => ({
  card: {
    borderWidth: 2,
    // boxShadow: theme.shadows.sm,
    // transition: "box-shadow 0.25s ease-in, scale 0.25s ease-out",
    "&:hover": {
      // scale: "1.05",
      // boxShadow: theme.shadows.md,
    },
  },
}));

const ProjectCard = forwardRef<HTMLAnchorElement, ProjectCardProps>(
  ({ project }, ref) => {
    const { classes } = useStyles();
    const { classes: pclasses } = useProjectStyles();

    const Icon = frameworks[project.framework];

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
        withBorder
      >
        <Card.Section component="figure" className={pclasses.figure}>
          <Image
            src={project.image.url}
            alt={project.title}
            fill
            loading="lazy"
          />
        </Card.Section>

        <article>
          <Group position="apart" align="flex-start" noWrap>
            <Title order={3} size="h4" weight={600}>
              {project.title}
            </Title>

            {Icon && (
              <Tooltip label={project.framework} withArrow transition="pop">
                <FrameworkIcon>
                  <Icon height={28} width={28} />
                </FrameworkIcon>
              </Tooltip>
            )}
          </Group>

          <Text mt="lg" size="md" component="time" dateTime={project.createdAt}>
            {formatDate(project.createdAt)}
          </Text>
        </article>
      </Card>
    );
  }
);

ProjectCard.displayName = "@home/ProjectCard";
export default ProjectCard;
