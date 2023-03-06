import { DEFAULT_THEME, MantineProvider } from "@mantine/core";
import { LazyMotion } from "framer-motion";
import type { AppProps } from "next/app";
import { Provider } from "urql";

import { RootErrorBoundary } from "~/components/common/ErrorBoundary";
import AppHead from "~/components/common/Head";
import Shell from "~/components/common/shell";
import SocialButton from "~/components/common/SocialButton";
import { emotionCache } from "~/styles/cache";

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
        primaryColor: "cyan",
        components: {
          Button: {
            styles: {
              root: { fontWeight: 500 },
            },
          },
        },
      }}
      emotionCache={emotionCache}
    >
      <AppHead />

      <Shell>
        <Provider value={urqlClient}>
          <RootErrorBoundary>
            <LazyMotion
              strict
              features={() => import("framer-motion").then((m) => m.domMax)}
            >
              <Component {...pageProps} />
            </LazyMotion>
          </RootErrorBoundary>
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
