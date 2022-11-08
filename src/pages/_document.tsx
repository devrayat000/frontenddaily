import { createGetInitialProps } from "@mantine/next";
import type { NextPage } from "next";
import type { DocumentInitialProps, DocumentProps } from "next/document";
import { Head, Html, Main, NextScript } from "next/document";

import { emotionCache } from "~/styles/cache";

const MyDocument: NextPage<DocumentProps, DocumentInitialProps> = () => {
  return (
    <Html lang="en-US">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

MyDocument.getInitialProps = createGetInitialProps(emotionCache);

export default MyDocument;
