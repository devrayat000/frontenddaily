import { Navbar, Text } from "@nextui-org/react";
import Link from "next/link";

import NavLink from "./NavLink";

const Footer = () => {
  // const { classes, cx } = useStyles();
  // const { classes: headerClasses } = useHeaderStyles();

  return (
    <Navbar variant="sticky" as="footer" css={{ bottom: 0 }}>
      <Navbar.Content as="ul">
        <Link href="/terms-conditions" passHref>
          <NavLink block color="text">
            Terms & Conditions
          </NavLink>
        </Link>
        <Link href="/privacy" passHref>
          <NavLink block color="text">
            Privacy Policy
          </NavLink>
        </Link>
      </Navbar.Content>

      <Navbar.Content>
        <Text as="p" css={{ my: 0 }}>
          ©FrontendDaily 2022
        </Text>
      </Navbar.Content>
    </Navbar>

    // <MantineFooter height={72} fixed>
    //   <Group
    //     position="apart"
    //     align="center"
    //     className={cx(headerClasses.container, classes.container)}
    //   >
    //     <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
    //       <FooterLinks />
    //     </MediaQuery>

    //     <Text component="p" my={0}>
    //       ©FrontendDaily 2022
    //     </Text>
    //   </Group>
    // </MantineFooter>
  );
};

export default Footer;
