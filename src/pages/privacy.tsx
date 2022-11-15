import { RichText } from "@graphcms/rich-text-react-renderer";
import { Box, Container, Title, TypographyStylesProvider } from "@mantine/core";
import type { GetServerSidePropsContext, NextPage } from "next";
import useSWR from "swr";

import type { PrivacyPolicyQuery } from "~/types/graphql.generated";
import fetcher, { gql } from "~/utils/fetcher";

export const PRIVACY_POLICY_QUERY = gql`
  query PrivacyPolicy {
    termCondition(where: { type: "frontenddaily-privacy" }) {
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
    "public, max-age=86400, s-maxage=15768000, stale-while-revalidate=31536000"
  );

  return {
    props: {
      ssr: {
        [PRIVACY_POLICY_QUERY]: await fetcher(PRIVACY_POLICY_QUERY),
      },
    },
  };
};

const TermsConditionsPage: NextPage = () => {
  const { data } = useSWR<PrivacyPolicyQuery>(PRIVACY_POLICY_QUERY);

  return (
    <Container>
      <Title order={1} align="center" mb="xl">
        FrontendDaily Privacy Policy
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
