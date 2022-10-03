import { useMantineTheme } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useMemo } from "react";

export default function useLimit(defaultLimit = 4) {
  const theme = useMantineTheme();
  const { width: x } = useViewportSize();

  const limit = useMemo(() => {
    if (x > theme.breakpoints.md) {
      return defaultLimit * 3;
    } else if (x > theme.breakpoints.sm) {
      return defaultLimit * 2;
    } else {
      return defaultLimit;
    }
  }, [x, defaultLimit, theme.breakpoints.md, theme.breakpoints.sm]);

  return limit;
}
