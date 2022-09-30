import {
  Button,
  createStyles,
  Group,
  Header as MantineHeader,
} from "@mantine/core";
import { NextLink } from "@mantine/next";

import { useHeaderStyles } from "./styles";

const Header = () => {
  const { classes } = useHeaderStyles();

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
          <Button
            component={NextLink}
            href="/contact"
            variant="subtle"
            color="gray"
          >
            Contact
          </Button>
        </Group>
      </Group>
    </MantineHeader>
  );
};

export default Header;
