import {
  Button,
  Col,
  Grid,
  // Center,
  Loading,
  Row,
  Text,
} from "@nextui-org/react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useQuery } from "urql";

import { formatGraphqlError } from "~/components/common/ErrorBoundary";
import useCursor from "~/hooks/use-cursor";
import type {
  Framework,
  ProjectsQuery,
  ProjectsQueryVariables,
} from "~/types/graphql.generated";
import { PROJECT_LIMIT } from "~/utils/constants";

import ProjectCard from "./ProjectCard";
import { PROJECTS_QUERY } from "./query";

const Projects = () => {
  const { cursor, setCursor, tags, framework, search } = useCursor();

  const [{ data, fetching, error }, retry] = useQuery<
    ProjectsQuery,
    ProjectsQueryVariables
  >({
    query: PROJECTS_QUERY,
    variables: {
      where: {
        framework: framework !== "all" ? (framework as Framework) : undefined,
        _search: search || undefined,
        tags_some: tags?.length === 0 ? undefined : { name_in: tags },
      },
      first: PROJECT_LIMIT,
      after: cursor || undefined,
    },
  });
  const [observe] = useInfiniteScroll({
    loading: fetching,
    hasNextPage: !!data?.projectsConnection.pageInfo.hasNextPage,
    disabled: !!error,
    rootMargin: "0px 0px 400px 0px",
    onLoadMore() {
      // setCursor("xx");
      setCursor(data?.projectsConnection.pageInfo.endCursor);
    },
  });

  if (error) {
    return (
      <Col css={{ alignItems: "center" }}>
        <Text size="lg" color="red">
          {formatGraphqlError(error)}
        </Text>
        <Button bordered color="error" onClick={retry}>
          Try Again
        </Button>
      </Col>
    );
  }

  if (
    data?.projectsConnection?.edges &&
    data.projectsConnection.edges.length <= 0
  ) {
    return (
      <Col css={{ alignItems: "center" }}>
        <Text as="p" size="xl" weight="medium">
          Sorry, we could not find any match
          {search && (
            <>
              for <b>{search}</b>
            </>
          )}
        </Text>
        <Text as="p" size="sm">
          Please try {search ? "searching" : "filtering"} with another term
        </Text>
      </Col>
    );
  }

  return (
    <section>
      <Grid.Container
      // cols={3}
      // verticalSpacing="xl"
      // breakpoints={[
      //   { maxWidth: "md", cols: 2 },
      //   { maxWidth: "sm", cols: 1 },
      // ]}
      // sx={(theme) => ({
      //   gap: theme.spacing.xl * 1.7,
      //   margin: `${theme.spacing.xl * 2}px ${theme.spacing.xl * 3}px`,
      //   [theme.fn.smallerThan("md")]: {
      //     marginLeft: theme.spacing.xl,
      //     marginRight: theme.spacing.xl,
      //   },
      //   [theme.fn.smallerThan("xs")]: {
      //     marginLeft: 0,
      //     marginRight: 0,
      //   },
      // })}
      >
        {data?.projectsConnection?.edges?.map(({ node: project }) => {
          return (
            <Grid xs={4} key={project.id}>
              <ProjectCard project={project} />
            </Grid>
          );
        })}
      </Grid.Container>

      {/* {(data?.projectsConnection.pageInfo.hasNextPage || fetching) && (
        <Row as="div" justify="center" align="center" ref={observe}>
          <Loading  color="primary" size="lg" />
        </Row>
      )} */}
    </section>
  );
};

export default Projects;
