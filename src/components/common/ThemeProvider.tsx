import type { ColorScheme } from "@mantine/core";
import {
  ColorSchemeProvider,
  DEFAULT_THEME,
  MantineProvider,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";

import { emotionCache } from "~/styles/cache";

const THEME_KEY = "frontenddaily-color-scheme";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: THEME_KEY,
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

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
