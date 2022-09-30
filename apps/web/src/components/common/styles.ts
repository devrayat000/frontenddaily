import { createStyles } from "@mantine/core";

export const useHeaderStyles = createStyles((theme) => ({
  container: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl * 2}px`,
    height: "100%",

    [theme.fn.smallerThan("md")]: {
      paddingLeft: theme.spacing.xl * 1.5,
      paddingRight: theme.spacing.xl * 1.5,
    },
    [theme.fn.smallerThan("sm")]: {
      paddingLeft: theme.spacing.xl,
      paddingRight: theme.spacing.xl,
    },
    [theme.fn.smallerThan("xs")]: {
      paddingLeft: theme.spacing.lg,
      paddingRight: theme.spacing.lg,
    },
  },
  links: {
    gap: theme.spacing.md,

    [theme.fn.smallerThan("md")]: {
      gap: theme.spacing.sm,
    },

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
      alignItems: "stretch",
      gap: theme.spacing.lg,
    },
  },
}));
