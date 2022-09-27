import {
  Button,
  createStyles,
  Footer as MantineFooter,
  Group,
  Text,
} from "@mantine/core";
import { NextLink } from "@mantine/next";

import { useHeaderStyles } from "./styles";

const useStyles = createStyles((theme) => ({
  container: {
    [theme.fn.smallerThan("sm")]: {
      justifyContent: "center",
    },
  },
}));

const Footer = () => {
  const { classes, cx } = useStyles();
  const { classes: headerClasses } = useHeaderStyles();

  return (
    <MantineFooter height={72} fixed>
      <Group
        position="apart"
        align="center"
        className={cx(headerClasses.container, classes.container)}
      >
        <Group className={headerClasses.links}>
          <Button component={NextLink} href="/" variant="subtle" color="gray">
            Terms & Conditions
          </Button>
          <Button component={NextLink} href="/" variant="subtle" color="gray">
            Privacy Policy
          </Button>
        </Group>

        <Text component="p" my={0}>
          ©FrontendDaily 2022
        </Text>
      </Group>
    </MantineFooter>
  );
};

export default Footer;
