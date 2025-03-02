import { Group, Text, AppShell } from "@mantine/core";

import { FooterLinks } from "../links";
import headerClasses from "../header/styles.module.css";
import classes from "./styles.module.css";
import clsx from "clsx";

const Footer = () => {
  return (
    <AppShell.Footer className={headerClasses.header}>
      <Group
        justify="space-between"
        align="center"
        className={clsx(headerClasses.container, classes.container)}
      >
        <FooterLinks />

        <Text component="p" my={0}>
          ©FrontendDaily 2022
        </Text>
      </Group>
    </AppShell.Footer>
  );
};

export default Footer;
