import * as Tooltip from "@radix-ui/react-tooltip";
import Image from "next/image";
import NextLink from "next/link";
import { forwardRef } from "react";

import FrameworkIcon from "~/components/common/FrameworkIcon";
import type { ProjectsQuery } from "~/types/graphql.generated";
import { formatDate } from "~/utils/datetime";
import { frameworks } from "~/utils/frameworks";

export type ProjectCardProps = {
  project: ProjectsQuery["projectsConnection"]["edges"][number]["node"];
};

const ProjectCard = forwardRef<HTMLAnchorElement, ProjectCardProps>(
  ({ project }, ref) => {
    const Icon = frameworks[project.framework];

    return (
      <NextLink
        key={project.id}
        role="article"
        href="/projects/[slug]"
        as={`/projects/${project.slug}`}
        title={project.title}
        className="rounded-lg border-2 overflow-hidden bg-white border-slate-200 p-6"
        ref={ref}
      >
        <figure className="-m-6 relative aspect-card">
          <Image
            src={project.image.url}
            alt={project.title}
            fill
            loading="lazy"
          />
        </figure>

        <article className="mt-12">
          <section className="flex justify-between items-start flex-nowrap">
            <h3 className="text-lg font-semibold">{project.title}</h3>

            {Icon && (
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <FrameworkIcon>
                      <Icon height={28} width={28} />
                    </FrameworkIcon>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
                      sideOffset={5}
                    >
                      {project.framework}
                      <Tooltip.Arrow className="fill-white" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            )}
          </section>

          <time className="mt-5" dateTime={project.createdAt}>
            {formatDate(project.createdAt)}
          </time>
        </article>
      </NextLink>
    );
  }
);

ProjectCard.displayName = "@home/ProjectCard";
export default ProjectCard;
