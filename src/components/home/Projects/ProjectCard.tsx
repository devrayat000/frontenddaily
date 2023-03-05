import { Card, Row, Text, Tooltip } from "@nextui-org/react";
// import Image from "next/image";
import NextLink from "next/link";
import { forwardRef } from "react";

import FrameworkIcon from "~/components/common/FrameworkIcon";
// import { useProjectStyles } from "~/styles/project";
import type { ProjectsQuery } from "~/types/graphql.generated";
import { formatDate } from "~/utils/datetime";
import { frameworks } from "~/utils/frameworks";

export type ProjectCardProps = {
  project: ProjectsQuery["projectsConnection"]["edges"][number]["node"];
};

// const useStyles = createStyles((theme) => ({
//   card: {
//     boxShadow: theme.shadows.sm,
//     transition: "box-shadow 0.25s ease-in, scale 0.25s ease-out",
//     "&:hover": {
//       scale: "1.05",
//       boxShadow: theme.shadows.md,
//     },
//   },
// }));

const ProjectCard = forwardRef<HTMLAnchorElement, ProjectCardProps>(
  ({ project }, ref) => {
    const Icon = frameworks[project.framework];

    return (
      <NextLink key={project.id} href={`/projects/${project.slug}`} passHref>
        <Card
          as={"a"}
          isPressable
          isHoverable
          variant="bordered"
          title={project.title}
          css={{ p: "$xl", borderRadius: "$md" }}
          // ref={ref}
        >
          <Card.Image
            src={project.image.url}
            alt={project.title}
            objectFit="fill"
            loading="lazy"
          />

          <Card.Body as="article">
            <Row justify="space-between" align="flex-start" wrap="nowrap">
              <Text h3 size="$lg" weight="semibold">
                {project.title}
              </Text>

              {Icon && (
                <Tooltip content={project.framework}>
                  <FrameworkIcon
                    auto
                    rounded
                    bordered
                    color="warning"
                    // icon={<Icon height={28} width={28} />}
                  >
                    <Icon height={28} width={28} />
                  </FrameworkIcon>
                </Tooltip>
              )}
            </Row>

            <Text
              size="md"
              as="time"
              // @ts-ignore
              dateTime={project.createdAt}
              css={{ mt: "$lg" }}
            >
              {formatDate(project.createdAt)}
            </Text>
          </Card.Body>
        </Card>
      </NextLink>
    );
  }
);

ProjectCard.displayName = "@home/ProjectCard";
export default ProjectCard;
