import { RichText } from "@graphcms/rich-text-react-renderer";
import {
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
import { NextLink } from "@mantine/next";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Image from "next/future/image";

import FrameworkIcon from "~/components/common/FrameworkIcon";
// import projects from "~/components/home/Projects/data-full.json";
import ShareButton from "~/components/project/ShareButton";
import { ProjectDocument, useProjectQuery } from "~/graphql/generated";
import { initSSR } from "~/services/urql-client";
import { useProjectStyles } from "~/styles/project";
import { formatDate } from "~/utils/datetime";
import { frameworks } from "~/utils/frameworks";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const useStyles = createStyles((theme) => ({
  figure: {
    // width: "100%",
    flex: "2 0 0%",
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
  const [{ data }] = useProjectQuery({ variables: { slug } });

  const { classes, cx } = useStyles();
  const { classes: pclasses } = useProjectStyles(void 0, {
    name: "project-details",
  });

  if (!data?.project) {
    return null;
  }

  const project = data.project;
  const framework = frameworks.find((f) => f.name == project.framework)!;

  return (
    <Container fluid>
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
      >
        <figure className={cx(pclasses.figure, classes.figure)}>
          <FrameworkIcon className={classes.framework}>
            <framework.icon height={28} width={28} />
          </FrameworkIcon>
          <Image src={project.image.url} alt={project.title} fill />
        </figure>

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
              component={NextLink}
              href="[slug]/preview"
              as={`${slug}/preview`}
            >
              Preview
            </Button>
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
  const { client, ssr } = initSSR();

  const res = await client.query(ProjectDocument, { slug }).toPromise();
  if (!res.data.project) {
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
