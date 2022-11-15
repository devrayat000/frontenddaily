import { RichText } from "@graphcms/rich-text-react-renderer";
import {
  Container,
  Group,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";
import type { GetServerSidePropsContext } from "next";
import Image from "next/image";
import useSWR from "swr";

import me from "~/assets/me.png";
import fetcher, { gql } from "~/utils/fetcher";

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
  ctx.res.setHeader(
    "Cache-Control",
    "public, max-age=3600, s-maxage=86400, stale-while-revalidate=15768000"
  );

  return {
    props: {
      ssr: {
        [ABOUT_QUERY]: await fetcher(ABOUT_QUERY),
      },
    },
  };
};

const AboutPage = () => {
  const { data } = useSWR(ABOUT_QUERY);

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
