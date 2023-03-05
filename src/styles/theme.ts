import { createTheme } from "@nextui-org/react";

export const lightTheme = createTheme({
  type: "light",
  theme: {
    fonts: {
      sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Poppins'",
    },
    colors: {
      primaryLight: "$cyan200",
      primaryLightHover: "$cyan300",
      primaryLightActive: "$cyan400",
      primaryLightContrast: "$cyan600",
      primary: "$cyan500",
      primaryBorder: "$cyan500",
      primaryBorderHover: "$cyan600",
      primarySolidHover: "$cyan700",
      primarySolidContrast: "$white",
      primaryShadow: "$cyan500",
    },

    // fontFamily: `Poppins, ${DEFAULT_THEME.fontFamily}`,
    // headings: {
    //   fontFamily: `Poppins, ${DEFAULT_THEME.fontFamily}`,
    // },
    // primaryColor: "cyan",
    // components: {
    //   Button: {
    //     styles: {
    //       root: { fontWeight: 500 },
    //     },
    //   },
    // },
  },
});
