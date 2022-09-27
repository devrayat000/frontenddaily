import {
  Button,
  createStyles,
  Group,
  Header as MantineHeader,
} from "@mantine/core";
import { NextLink } from "@mantine/next";

const useStyles = createStyles((theme) => ({
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
      display: "none",
    },
  },
}));

const Header = () => {
  const { classes } = useStyles();

  return (
    <MantineHeader fixed height={72}>
      <Group position="apart" align="center" className={classes.container}>
        <h3 style={{ fontWeight: 900, margin: 0 }}>Logo</h3>

        <Group className={classes.links}>
          <Button component={NextLink} href="/" variant="subtle" color="gray">
            Designs
          </Button>
          <Button component={NextLink} href="/" variant="subtle" color="gray">
            About
          </Button>
          <Button component={NextLink} href="/" variant="subtle" color="gray">
            License
          </Button>
          <Button component={NextLink} href="/" variant="subtle" color="gray">
            Contact
          </Button>
        </Group>
      </Group>
    </MantineHeader>
  );
};

export default Header;
