import { CssBaseline } from "@nextui-org/react";
import type { NextPage } from "next";
import type { DocumentContext } from "next/document";
import Document, {
  type DocumentInitialProps,
  type DocumentProps,
} from "next/document";
import { Head, Html, Main, NextScript } from "next/document";
import { Children } from "react";

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
        {CssBaseline.flush()}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

MyDocument.getInitialProps = async function getInitialProps(
  ctx: DocumentContext
) {
  const initialProps = await Document.getInitialProps(ctx);
  return {
    ...initialProps,
    styles: Children.toArray([initialProps.styles]),
  };
};

export default MyDocument;
