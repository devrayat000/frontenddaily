import {
  createStyles,
  Footer as MantineFooter,
  Group,
  MediaQuery,
  Text,
} from "@mantine/core";

import { FooterLinks } from "./links";
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
    <MantineFooter height={72} fixed className={headerClasses.header}>
      <Group
        position="apart"
        align="center"
        className={cx(headerClasses.container, classes.container)}
      >
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <FooterLinks />
        </MediaQuery>

        <Text component="p" my={0}>
          ©FrontendDaily 2022
        </Text>
      </Group>
    </MantineFooter>
  );
};

export default Footer;
