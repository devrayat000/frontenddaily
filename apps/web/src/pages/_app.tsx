import { DEFAULT_THEME, MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
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
