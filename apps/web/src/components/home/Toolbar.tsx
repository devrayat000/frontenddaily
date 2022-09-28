import { ActionIcon, createStyles, Group, TextInput } from "@mantine/core";
import { IconAdjustmentsHorizontal, IconSearch } from "@tabler/icons";
import React from "react";

import FilterDrawer from "./FilterDrawer";
import FilterToggle from "./FilterToggle";

const useStyles = createStyles((theme) => ({
  inputRoot: {
    width: "max(520px, 400px)",
  },
  input: {
    "&:focus": {
      border: "none",
    },
  },
}));

const Toolbar = () => {
  const { classes } = useStyles();

  return (
    <Group position="apart" align="stretch" my="xl" py="md">
      <FilterToggle />

      <Group>
        <TextInput
          placeholder="Search"
          icon={<IconSearch />}
          size="lg"
          variant="filled"
          classNames={{ root: classes.inputRoot, input: classes.input }}
        />
        <FilterDrawer />
      </Group>
    </Group>
  );
};

export default Toolbar;
