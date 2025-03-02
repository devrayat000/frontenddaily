import { RichText } from "@graphcms/rich-text-react-renderer";
import { Box, Container, Title, TypographyStylesProvider } from "@mantine/core";
import type { GetServerSidePropsContext, NextPage } from "next";
import { gql, useQuery } from "urql";

import type { TermAndConditionsQuery } from "~/types/graphql.generated";

export const TERMS_CONDITIONS_QUERY = gql`
  query TermAndConditions {
    termCondition(where: { type: "frontenddaily" }) {
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

  await client.query(TERMS_CONDITIONS_QUERY, {}).toPromise();

  ctx.res.setHeader(
    "Cache-Control",
    "public, max-age=86400, s-maxage=15768000, stale-while-revalidate=31536000"
  );

  return {
    props: {
      ssr: ssr.extractData(),
    },
  };
};

const TermsConditionsPage: NextPage = () => {
  const [{ data }] = useQuery<TermAndConditionsQuery>({
    query: TERMS_CONDITIONS_QUERY,
  });

  return (
    <Container>
      <Title order={1} align="center" mb="xl">
        FrontendDaily Terms & Conditions
      </Title>
      <Box component="section" mt="xl">
        {data?.termCondition?.content?.raw && (
          <TypographyStylesProvider>
            <RichText content={data.termCondition.content.raw} />
          </TypographyStylesProvider>
        )}
      </Box>
    </Container>
  );
};

export default TermsConditionsPage;
