import { Container } from "@mantine/core";
import type { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { unstable_serialize } from "swr/infinite";

import Projects from "~/components/home/Projects";
import createGetKey from "~/components/home/Projects/getKey";
import Toolbar from "~/components/home/Toolbar";
import fetcher from "~/utils/fetcher";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { framework, q: search, tags: tg } = ctx.query;
  const tags = typeof tg === "string" ? tg.split(",") : undefined;

  ctx.res.setHeader(
    "Cache-Control",
    "public, max-age=1, s-maxage=120, stale-while-revalidate=86400"
  );

  const getKey = createGetKey({
    framework: framework as string,
    search: search as string,
    tags,
  });

  return {
    props: {
      ssr: {
        [unstable_serialize(getKey)]: [await fetcher(...getKey(0, null))],
      },
    },
  };
};

export default function HomePage() {
  return (
    <Container
      fluid
      sx={(theme) => ({
        paddingLeft: theme.spacing.xl,
        paddingRight: theme.spacing.xl,
        [theme.fn.smallerThan("sm")]: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      })}
    >
      <Head>
        <title>Frontend Daily</title>
        <meta name="title" content="Frontend Daily" />
      </Head>
      <Toolbar />

      <Projects />
    </Container>
  );
}
