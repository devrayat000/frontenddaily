import { ActionIcon, createStyles, Group, TextInput } from "@mantine/core";
import { IconAdjustmentsHorizontal, IconSearch } from "@tabler/icons";
import React from "react";

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
  filter: {
    backgroundColor: theme.colors.gray[1],
    height: 48,
    width: 48,
    "&:hover": {
      backgroundColor: theme.fn.rgba(theme.colors.gray[1], 0.85),
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
        <ActionIcon className={classes.filter}>
          <IconAdjustmentsHorizontal />
        </ActionIcon>
      </Group>
    </Group>
  );
};

export default Toolbar;
