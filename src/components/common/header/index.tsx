"use client";

import {
  Group,
  AppShell,
  //   MediaQuery,
  Text,
  Box,
} from "@mantine/core";

import Logo from "../../icons/Logo";
import { HeaderLinks } from "../links";
import MenuButton from "../MenuButton";
import classes from "./styles.module.css";
import ThemeToggle from "../ThemeToggle";

const Header = () => {
  return (
    <AppShell.Header className={classes.header}>
      <Group align="center" className={classes.container}>
        <Text component="span" size="lg" className={classes.title}>
          <Logo height={36} /> Frontend Daily
        </Text>

        <Box className={classes.gap} />

        <HeaderLinks />
        {/* <MenuButton /> */}

        <ThemeToggle />
      </Group>
    </AppShell.Header>
  );
};

export default Header;
