import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import { Provider } from "urql";

import Shell from "~/components/common/shell";

import urqlClient, { ssr } from "../services/urql-client";

const MyApp = ({ Component, pageProps }: MyAppProps) => {
  if (pageProps.ssr) {
    ssr.restoreData(pageProps.ssr);
  }

  return (
    <MantineProvider withCSSVariables withGlobalStyles withNormalizeCSS>
      <Shell>
        <Provider value={urqlClient}>
          <Component {...pageProps} />
        </Provider>
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
