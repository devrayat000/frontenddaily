import { createGetInitialProps } from "@mantine/next";
import type { NextPage } from "next";
import type { DocumentInitialProps, DocumentProps } from "next/document";
import { Head, Html, Main, NextScript } from "next/document";

const MyDocument: NextPage<DocumentProps, DocumentInitialProps> = () => {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

MyDocument.getInitialProps = createGetInitialProps();

export default MyDocument;
