import {
  Group,
  Header as MantineHeader,
  MediaQuery,
  Text,
} from "@mantine/core";

import Logo from "../icons/Logo";
import { HeaderLinks } from "./links";
import MenuButton from "./MenuButton";
import { useHeaderStyles } from "./styles";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const { classes, theme } = useHeaderStyles();

  return (
    <MantineHeader fixed height={72} className={classes.header}>
      <Group align="center" className={classes.container}>
        <Text
          component="span"
          color={theme.colorScheme === "dark" ? "dimmed" : "dark"}
          weight={600}
          size="lg"
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            gap: theme.spacing.sm,
          })}
        >
          <Logo height={36} /> Frontend Daily
        </Text>

        <Group grow sx={{ flexGrow: 1, flexShrink: 0 }} />

        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <HeaderLinks />
        </MediaQuery>
        <MenuButton />

        <ThemeToggle />
      </Group>
    </MantineHeader>
  );
};

export default Header;
