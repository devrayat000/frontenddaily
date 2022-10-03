import { Container } from "@mantine/core";
import type { GetServerSidePropsContext } from "next";
import { Suspense } from "react";

import Loader from "~/components/common/Loader";
import Projects from "~/components/home/Projects";
import Toolbar from "~/components/home/Toolbar";
import { ProjectsDocument, ProjectsRelayDocument } from "~/graphql/generated";
import { initSSR } from "~/services/urql-client";
import { PROJECT_LIMIT } from "~/utils/constants";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { client, ssr } = initSSR();

  await client
    .query(
      ProjectsRelayDocument,
      { first: PROJECT_LIMIT, where: {} },
      { suspense: true }
    )
    .toPromise();

  ctx.res.setHeader(
    "Cache-Control",
    "public, max-age=1, s-maxage=120, stale-while-revalidate=86400"
  );

  return {
    props: {
      ssr: ssr.extractData(),
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
      <Toolbar />

      <Suspense fallback={<Loader />}>
        <Projects />
      </Suspense>
    </Container>
  );
}
