import { useMantineTheme } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useCallback, useEffect, useRef } from "react";

import { PROJECT_LIMIT } from "~/utils/constants";

export default function useLimit(defaultLimit = 4) {
  const theme = useMantineTheme();
  const { width: x } = useViewportSize();
  const initialRef = useRef(false);

  const getLimit = useCallback(() => {
    if (x > theme.breakpoints.md) {
      return defaultLimit * 3;
    } else if (x > theme.breakpoints.sm) {
      return defaultLimit * 2;
    } else if (x > theme.breakpoints.xs) {
      return defaultLimit;
    } else {
      return PROJECT_LIMIT;
    }
  }, [
    x,
    defaultLimit,
    theme.breakpoints.md,
    theme.breakpoints.sm,
    theme.breakpoints.xs,
  ]);

  const limitRef = useRef(PROJECT_LIMIT);

  useEffect(() => {
    if (initialRef.current) {
      limitRef.current = getLimit();
    } else {
      initialRef.current = true;
    }
  }, [getLimit]);

  return limitRef.current;
}
