import { createStyles, Tooltip } from "@mantine/core";
import {
  Item as ToggleItem,
  Root as ToggleGroupRoot,
} from "@radix-ui/react-toggle-group";
import { useState } from "react";

import { frameworks } from "~/utils/frameworks";

import IconAll from "../icons/all";

const useStyles = createStyles((theme) => ({
  root: {
    display: "inline-flex",
    borderRadius: 4,
    border: `1px solid ${theme.colors.gray[1]}`,
  },
  item: {
    all: "unset",
    padding: "8px 12px",
    backgroundColor: "white",
    display: "flex",
    fontSize: 15,
    lineHeight: 1,
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    "&:hover": { backgroundColor: theme.colors.gray[0] },
    "&[data-state=on]": {
      backgroundColor: theme.colors.gray[1],
    },
  },
}));

const FilterToggle = () => {
  const [value, setValue] = useState("all");
  const { classes } = useStyles();

  return (
    <ToggleGroupRoot
      type="single"
      className={classes.root}
      defaultValue="all"
      value={value}
      onValueChange={(value) => {
        if (value) setValue(value);
      }}
    >
      <ToggleItem value="all" className={classes.item}>
        <IconAll height={28} width={28} />
      </ToggleItem>

      {frameworks.map((framework) => (
        <Tooltip
          key={framework.name}
          label={framework.name}
          withArrow
          transition="pop"
        >
          <ToggleItem value={framework.name} className={classes.item}>
            <framework.icon height={28} width={28} />
          </ToggleItem>
        </Tooltip>
      ))}
    </ToggleGroupRoot>
  );
};

export default FilterToggle;
