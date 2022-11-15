import { DEFAULT_THEME, MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

import { RootErrorBoundary } from "~/components/common/ErrorBoundary";
import AppHead from "~/components/common/Head";
import RouterTransition from "~/components/common/RouterTransition";
import Shell from "~/components/common/shell";
import SocialButton from "~/components/common/SocialButton";
import { emotionCache } from "~/styles/cache";
import fetcher from "~/utils/fetcher";

const MyApp = ({ Component, pageProps }: MyAppProps) => {
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
      <RouterTransition />

      <Shell>
        <SWRConfig
          value={{
            fetcher,
            fallback: pageProps.ssr,
            revalidateOnMount: false,
            revalidateOnFocus: false,
            // use: [infinite],
          }}
        >
          <RootErrorBoundary>
            <Component {...pageProps} />
          </RootErrorBoundary>
        </SWRConfig>
        <SocialButton />
      </Shell>
    </MantineProvider>
  );
};

export default MyApp;

type MyAppProps<P = {}> = AppProps<P> & {
  pageProps: {
    ssr?: Record<string, any>;
  };
};
