// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import { Poppins } from "next/font/google";
import {
  ColorSchemeScript,
  DEFAULT_THEME,
  MantineProvider,
  createTheme,
  mantineHtmlProps,
} from "@mantine/core";
import { Metadata } from "next";

export const metadata = {
  title: { default: "Frontend Daily", template: "%s | Frontend Daily" },
  description: "I have followed setup instructions carefully",
} satisfies Metadata;

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
  variable: "--font-poppins",
  subsets: ["latin"],
});

const theme = createTheme({
  fontFamily: `var(--font-poppins), ${DEFAULT_THEME.fontFamily}`,
  headings: {
    fontFamily: `var(--font-poppins), ${DEFAULT_THEME.fontFamily}`,
  },
  primaryColor: "cyan",
  components: {
    Button: {
      styles: {
        root: { fontWeight: 500 },
      },
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={poppins.variable}>
        <MantineProvider
          withCssVariables
          withGlobalClasses
          withStaticClasses
          defaultColorScheme="auto"
          theme={theme}
        >
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
