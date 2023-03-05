import type { GetServerSidePropsContext } from "next";
import Head from "next/head";

import Projects from "~/components/home/Projects";
import { PROJECTS_QUERY } from "~/components/home/Projects/query";
import Toolbar from "~/components/home/Toolbar";
import type {
  Framework,
  ProjectsQuery,
  ProjectsQueryVariables,
} from "~/types/graphql.generated";
import { PROJECT_LIMIT } from "~/utils/constants";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { client, ssr } = await import("~/services/urql-client").then((m) =>
    m.initSSR()
  );
  const { framework, q: search, tags: tg } = ctx.query;
  const tags = typeof tg === "string" ? tg.split(",") : undefined;

  await client
    .query<ProjectsQuery, ProjectsQueryVariables>(
      PROJECTS_QUERY,
      {
        where: {
          framework: framework !== "all" ? (framework as Framework) : undefined,
          _search: (search as string) || undefined,
          tags_some: tags?.length === 0 ? undefined : { name_in: tags },
        },
        first: PROJECT_LIMIT,
      }
      // { suspense: true }
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
  // const router = useRouter();

  return (
    <main className="md:max-w-6xl lg:max-w-7xl px-0 md:px-6 mx-auto">
      <Head>
        <title>Frontend Daily</title>
        <meta name="title" content="Frontend Daily" />
      </Head>
      <Toolbar />

      <Projects />
    </main>
  );
}
