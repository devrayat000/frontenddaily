import {
  Card,
  createStyles,
  Group,
  SimpleGrid,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { m, useAnimationControls, useWillChange } from "framer-motion";
import Image from "next/image";
import NextLink from "next/link";
import { forwardRef, useCallback } from "react";

import FrameworkIcon from "~/components/common/FrameworkIcon";
import { useProjectStyles } from "~/styles/project";
import type { ProjectsQuery } from "~/types/graphql.generated";
import { formatDate } from "~/utils/datetime";
import { frameworks } from "~/utils/frameworks";

export type ProjectsProps = {
  projects: ProjectsQuery["projectsConnection"]["edges"];
};

const useStyles = createStyles((theme, _, getRef) => {
  const cardContainer = getRef("cardContainer");

  return {
    container: {
      ref: cardContainer,
      gap: theme.spacing.xs,
      padding: `${theme.spacing.xl * 2}px ${theme.spacing.xl * 3}px`,
      [theme.fn.smallerThan("md")]: {
        paddingLeft: theme.spacing.xl,
        paddingRight: theme.spacing.xl,
      },
      [theme.fn.smallerThan("xs")]: {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    cardWrapper: {
      backgroundColor: theme.colors.gray[2],
      borderRadius: theme.radius.md,
      overflow: "hidden",
      position: "relative",
      cursor: "pointer",
      display: "grid",
      placeItems: "center",
    },
    card: {
      position: "relative",
      borderRadius: "inherit",
      height: "calc(100% - 5px)",
      width: "calc(100% - 5px)",
      zIndex: 1,
    },
    cardBorder: {
      position: "absolute",
      left: 0,
      top: 0,
      height: "100%",
      width: "100%",
      borderRadius: "inherit",
      opacity: 0,
      transition: "opacity 0.5s",
      zIndex: 1,
      [`.${cardContainer}:hover &`]: {
        opacity: 1,
      },
    },
  };
});

const Projects = forwardRef<HTMLAnchorElement, ProjectsProps>(
  ({ projects }, ref) => {
    const { classes } = useStyles();
    const { classes: pclasses } = useProjectStyles();
    const api = useAnimationControls();
    const theme = useMantineTheme();
    const willChange = useWillChange();

    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        api.start((i) => {
          const card = e.currentTarget.children.item(i);
          const rect = card?.getBoundingClientRect();
          if (!rect) return {};

          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          return {
            background: `radial-gradient(
              400px circle at ${x}px ${y}px,
              ${theme.fn.rgba(theme.colors.dark[9], 0.3)},
              transparent 40%
            )`,
          };
        });
      },
      []
    );

    return (
      <SimpleGrid
        cols={3}
        verticalSpacing="xl"
        breakpoints={[
          { maxWidth: "md", cols: 2 },
          { maxWidth: "sm", cols: 1 },
        ]}
        className={classes.container}
        onMouseMove={handleMouseMove}
      >
        {projects.map(({ node: project }, i) => {
          const Icon = frameworks[project.framework];
          return (
            <div key={project.id} className={classes.cardWrapper}>
              <m.div
                className={classes.cardBorder}
                animate={api}
                custom={i}
                style={{ willChange }}
              />
              <Card
                key={project.id}
                component={NextLink}
                href="/projects/[slug]"
                as={`/projects/${project.slug}`}
                title={project.title}
                className={classes.card}
                p="xl"
                ref={ref}
              >
                <Card.Section
                  component={m.figure}
                  className={pclasses.figure}
                  layoutId={`project_${project.id}`}
                >
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
                      <Tooltip
                        label={project.framework}
                        withArrow
                        transition="pop"
                      >
                        <FrameworkIcon>
                          <Icon height={28} width={28} />
                        </FrameworkIcon>
                      </Tooltip>
                    )}
                  </Group>

                  <Text
                    mt="lg"
                    size="md"
                    component="time"
                    dateTime={project.createdAt}
                  >
                    {formatDate(project.createdAt)}
                  </Text>
                </article>
              </Card>
            </div>
          );
        })}
      </SimpleGrid>
    );
  }
);

Projects.displayName = "@home/Projects";
export default Projects;
