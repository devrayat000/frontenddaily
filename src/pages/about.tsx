import { RichText } from "@graphcms/rich-text-react-renderer";
import {
  Container,
  Group,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";
import type { GetServerSidePropsContext } from "next";
import Image from "next/future/image";
import { gql, useQuery } from "urql";

import me from "~/assets/me.png";

export const ABOUT_QUERY = gql`
  query AboutMe($type: String = "frontenddaily") {
    about(where: { type: $type }) {
      id
      content {
        raw
      }
    }
  }
`;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { client, ssr } = await import("~/services/urql-client").then((m) =>
    m.initSSR()
  );

  await client.query(ABOUT_QUERY, {}).toPromise();

  ctx.res.setHeader(
    "Cache-Control",
    "public, max-age=3600, s-maxage=86400, stale-while-revalidate=15768000"
  );

  return {
    props: {
      ssr: ssr.extractData(),
    },
  };
};

const AboutPage = () => {
  const [{ data }] = useQuery({ query: ABOUT_QUERY });

  return (
    <Container size="md">
      <Group spacing="xs" noWrap>
        <figure>
          <Image
            {...me}
            alt="Zul Ikram Musaddik Rayat"
            loading="lazy"
            style={{ zoom: "50%" }}
          />
        </figure>

        <section>
          <Title order={2} size="h1">
            About Frontend Daily
          </Title>

          {data?.about?.content?.raw && (
            <TypographyStylesProvider>
              <RichText content={data.about.content.raw as any} />
            </TypographyStylesProvider>
          )}
        </section>
      </Group>
    </Container>
  );
};

export default AboutPage;
