import { useMantineTheme } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useCallback, useEffect, useRef } from "react";

export default function useLimit(defaultLimit = 4) {
  const theme = useMantineTheme();
  const { width: x } = useViewportSize();

  const getLimit = useCallback(() => {
    if (x > theme.breakpoints.md) {
      return defaultLimit * 3;
    } else if (x > theme.breakpoints.sm) {
      return defaultLimit * 2;
    } else if (x > theme.breakpoints.xs) {
      return defaultLimit;
    } else {
      return defaultLimit * 3;
    }
  }, [
    x,
    defaultLimit,
    theme.breakpoints.md,
    theme.breakpoints.sm,
    theme.breakpoints.xs,
  ]);

  const limitRef = useRef(getLimit());

  useEffect(() => {
    limitRef.current = getLimit();
  }, [getLimit]);

  return limitRef.current;
}
