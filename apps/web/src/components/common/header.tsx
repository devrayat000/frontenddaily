import { Group, Header as MantineHeader, MediaQuery } from "@mantine/core";

import { HeaderLinks } from "./links";
import MenuButton from "./MenuButton";
import { useHeaderStyles } from "./styles";

const Header = () => {
  const { classes } = useHeaderStyles();

  return (
    <MantineHeader fixed height={72}>
      <Group position="apart" align="center" className={classes.container}>
        <h3 style={{ fontWeight: 900, margin: 0 }}>Logo</h3>

        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <HeaderLinks />
        </MediaQuery>
        <MenuButton />
      </Group>
    </MantineHeader>
  );
};

export default Header;
