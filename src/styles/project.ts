import { createStyles } from "@mantine/core";

export const useProjectStyles = createStyles((theme) => ({
  figure: { position: "relative", aspectRatio: "3/2" },
  framework: {
    borderColor: "#E0E0E0",
    height: 20,
    width: 20,
    minWidth: "unset",
    minHeight: "unset",
  },
}));
