import type { ColorScheme } from "@mantine/core";
import {
  ColorSchemeProvider,
  DEFAULT_THEME,
  MantineProvider,
} from "@mantine/core";
import { useState } from "react";

import { emotionCache } from "~/styles/cache";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withCSSVariables
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme,
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
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default ThemeProvider;
