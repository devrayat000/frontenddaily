import { RichText } from "@graphcms/rich-text-react-renderer";
import {
  Box,
  Button,
  Chip,
  Container,
  createStyles,
  Group,
  Stack,
  Text,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";
import { m } from "framer-motion";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import Image from "next/image";
// import NextLink from "next/link";
import { gql, useQuery } from "urql";

import FrameworkIcon from "~/components/common/FrameworkIcon";
import { SIMPLE_PROJECT_FRAGMENT } from "~/components/home/Projects/query";
import ShareButton from "~/components/project/ShareButton";
import { useProjectStyles } from "~/styles/project";
import type {
  ProjectQuery,
  ProjectQueryVariables,
} from "~/types/graphql.generated";
import { formatDate } from "~/utils/datetime";
import { frameworks } from "~/utils/frameworks";
import { getUrl } from "~/utils/getUrl";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export const PROJECT_QUERY = gql`
  query Project($slug: String!) {
    project(where: { slug: $slug }) {
      ...SimpleProject
      description {
        raw
        text
      }
      sourceCode
      preview
      tags {
        id
        name
        slug
      }
    }
  }
  ${SIMPLE_PROJECT_FRAGMENT}
`;

const useStyles = createStyles((theme) => ({
  figure: {
    flexGrow: 2,
    flexShrink: 0,
    margin: 0,
    marginBlock: 0,
    marginInline: 0,
  },
  framework: {
    position: "absolute",
    top: theme.spacing.xl,
    right: theme.spacing.xl,
    zIndex: 1,
    backgroundColor: theme.white,
    "&:hover": {
      backgroundColor: theme.white,
    },
  },
}));

const PostPage: NextPage<Props> = ({ slug }) => {
  const [{ data }] = useQuery<ProjectQuery, ProjectQueryVariables>({
    query: PROJECT_QUERY,
    variables: { slug },
  });

  const { classes, cx } = useStyles();
  const { classes: pclasses } = useProjectStyles(void 0, {
    name: "project-details",
  });

  if (!data?.project) {
    return null;
  }

  const project = data.project;
  const Icon = frameworks[project.framework];

  return (
    <Container fluid>
      <Head>
        <title>{`Frontend Daily | ${project.title}`}</title>
        <link rel="preload" as="image" href={project.image.url} />
        <meta name="title" content={`Frontend Daily | ${project.title}`} />
        <meta name="description" content={project.description?.text} />
        <meta
          name="keywords"
          content={project.tags.map((t) => t.name).join(",")}
        />
        <meta
          property="og:title"
          content={`Frontend Daily | ${project.title}`}
        />
        <meta property="og:description" content={project.description?.text} />
        <meta property="og:image" content={project.image.url} />
        <meta property="og:image:alt" content={`Preview | ${project.title}`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${getUrl()}/projects/${slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image:alt" content={`Preview | ${project.title}`} />
      </Head>
      <Group
        position="apart"
        align="start"
        spacing="xl"
        sx={(theme) => ({
          [theme.fn.smallerThan("md")]: {
            flexDirection: "column",
            alignItems: "stretch",
          },
        })}
        // grow
      >
        <Box
          component={m.figure}
          layoutId={`project_${project.id}`}
          className={cx(pclasses.figure, classes.figure)}
        >
          {Icon && (
            <FrameworkIcon className={classes.framework} component="div">
              <Icon height={28} width={28} />
            </FrameworkIcon>
          )}
          <Image src={project.image.url} alt={project.title} fill />
        </Box>

        <Stack style={{ flex: "1 0 0%" }} spacing="xs">
          <Group position="right">
            <ShareButton />
          </Group>

          <Title weight={700}>{project.title}</Title>
          <Text
            mt="lg"
            size="lg"
            component="time"
            color="gray"
            dateTime={project.createdAt}
            my={0}
          >
            {formatDate(project.createdAt)}
          </Text>

          <Chip.Group>
            {project.tags.map((tag) => (
              <Chip key={tag.id} value={tag.id} disabled>
                {tag.name}
              </Chip>
            ))}
          </Chip.Group>
          <TypographyStylesProvider>
            {/* @ts-ignore */}
            <RichText content={project.description.raw} />
          </TypographyStylesProvider>

          <Group position="apart" grow>
            <Button
              color="grape"
              component={"a"}
              href={data.project.preview}
              target="_blank"
              rel="noreferrer"
            >
              Preview
            </Button>
            {/* <Button
              color="grape"
              component={NextLink}
              href="[slug]/preview"
              as={`${slug}/preview`}
            >
              Preview
            </Button> */}
            <Button
              variant="outline"
              color="cyan"
              component="a"
              href={project.sourceCode!}
              rel="noreferrer"
              target="_blank"
            >
              View Source
            </Button>
          </Group>
        </Stack>
      </Group>
    </Container>
  );
};

export default PostPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const slug = ctx.params?.slug as string;
  const { client, ssr } = await import("~/services/urql-client").then((m) =>
    m.initSSR()
  );

  const res = await client
    .query<ProjectQuery, ProjectQueryVariables>(PROJECT_QUERY, { slug })
    .toPromise();

  if (!res.data?.project) {
    return {
      notFound: true,
    };
  }

  ctx.res.setHeader(
    "Cache-Control",
    "public, max-age=60, s-maxage=3600, stale-while-revalidate=86400"
  );
  return {
    props: {
      ssr: ssr.extractData(),
      slug,
    },
  };
};
