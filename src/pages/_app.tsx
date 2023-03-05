import { NextUIProvider } from "@nextui-org/react";
import type { AppProps } from "next/app";
import { Provider } from "urql";

import { RootErrorBoundary } from "~/components/common/ErrorBoundary";
import AppHead from "~/components/common/Head";
import Shell from "~/components/common/shell";
import SocialButton from "~/components/common/SocialButton";
import { lightTheme } from "~/styles/theme";

import urqlClient, { ssr } from "../services/urql-client";

const MyApp = ({ Component, pageProps }: MyAppProps) => {
  if (pageProps.ssr) {
    ssr.restoreData(pageProps.ssr);
  }

  return (
    <NextUIProvider theme={lightTheme}>
      <AppHead />

      <Shell>
        <Provider value={urqlClient}>
          <RootErrorBoundary>
            <Component {...pageProps} />
          </RootErrorBoundary>
        </Provider>
        {/* <SocialButton /> */}
      </Shell>
    </NextUIProvider>
  );
};

export default MyApp;

type MyAppProps<P = {}> = AppProps<P> & {
  pageProps: {
    ssr?: ReturnType<typeof ssr["extractData"]>;
  };
};
