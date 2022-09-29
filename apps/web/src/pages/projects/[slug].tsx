import { RichText } from "@graphcms/rich-text-react-renderer";
import {
  ActionIcon,
  Button,
  Chip,
  Container,
  Group,
  Stack,
  Text,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { IconShare } from "@tabler/icons";
import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Image from "next/future/image";

import projects from "~/components/home/Projects/data-full.json";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PostPage: NextPage<Props> = ({ project, slug }) => {
  return (
    <Container fluid>
      <Group position="apart" align="start" spacing="xl">
        <figure
          style={{
            position: "relative",
            aspectRatio: "3/2",
            flex: "2 0 0%",
            // margin: 0,
            marginBlock: 0,
            marginInline: 0,
          }}
        >
          <Image src={project.image.url} alt={project.title} fill />
        </figure>

        <Stack style={{ flex: "1 0 0%" }} spacing="xs">
          <Group position="right">
            <ActionIcon variant="outline" size="xl" radius="xl">
              <IconShare />
            </ActionIcon>
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
            {new Intl.DateTimeFormat(["en-UK", "en-US"], {
              dateStyle: "medium",
            }).format(new Date(project.createdAt))}
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

          <Group position="apart">
            <Button
              color="grape"
              fullWidth
              component={NextLink}
              href="[slug]/preview"
              as={`${slug}/preview`}
            >
              Preview
            </Button>
            <Button
              variant="outline"
              color="cyan"
              fullWidth
              component="a"
              href={project.sourceCode}
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

export const getStaticPaths = async (ctx: GetStaticPathsContext) => {
  return {
    paths: projects.map((project) => ({ params: { slug: project.slug } })),
    fallback: "blocking",
  };
};

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const slug = ctx.params?.slug as string;

  return {
    props: {
      project: projects.find((p) => p.slug === slug)!,
      slug,
    },
  };
};
