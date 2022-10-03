import { DEFAULT_THEME, MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "urql";

import Shell from "~/components/common/shell";
import SocialButton from "~/components/common/SocialButton";

import urqlClient, { ssr } from "../services/urql-client";

const MyApp = ({ Component, pageProps }: MyAppProps) => {
  if (pageProps.ssr) {
    ssr.restoreData(pageProps.ssr);
  }

  return (
    <MantineProvider
      withCSSVariables
      withGlobalStyles
      withNormalizeCSS
      theme={{
        fontFamily: `Poppins, ${DEFAULT_THEME.fontFamily}`,
        headings: {
          fontFamily: `Poppins, ${DEFAULT_THEME.fontFamily}`,
        },
        components: {
          Button: {
            styles: {
              root: { fontWeight: 500 },
            },
          },
        },
      }}
    >
      <Head>
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Zul Ikram Musaddik Rayat" />
        <meta property="og:site_name" content="Frontend Daily" />
        {/* <meta property="fb:app_id" content="uidesigndaily" />
        <meta name="twitter:site" content="@uidesigndaily"/> */}
      </Head>
      <Shell>
        <Provider value={urqlClient}>
          <Component {...pageProps} />
        </Provider>
        <SocialButton />
      </Shell>
    </MantineProvider>
  );
};

export default MyApp;

type MyAppProps<P = {}> = AppProps<P> & {
  pageProps: {
    ssr?: ReturnType<typeof ssr["extractData"]>;
  };
};
