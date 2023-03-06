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

const Header = () => {
  const { classes } = useHeaderStyles();

  return (
    <MantineHeader fixed height={72} className={classes.header}>
      <Group position="apart" align="center" className={classes.container}>
        <Text
          component="span"
          color="dark"
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

        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <HeaderLinks />
        </MediaQuery>
        <MenuButton />
      </Group>
    </MantineHeader>
  );
};

export default Header;
