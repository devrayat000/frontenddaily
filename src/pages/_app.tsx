import { LazyMotion } from "framer-motion";
import type { AppProps } from "next/app";
import { Provider } from "urql";

import { RootErrorBoundary } from "~/components/common/ErrorBoundary";
import AppHead from "~/components/common/Head";
import Shell from "~/components/common/shell";
import SocialButton from "~/components/common/SocialButton";
import ThemeProvider from "~/components/common/ThemeProvider";

import urqlClient, { ssr } from "../services/urql-client";

const MyApp = ({ Component, pageProps }: MyAppProps) => {
  if (pageProps.ssr) {
    ssr.restoreData(pageProps.ssr);
  }

  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
};

export default MyApp;

type MyAppProps<P = {}> = AppProps<P> & {
  pageProps: {
    ssr?: ReturnType<typeof ssr["extractData"]>;
  };
};
