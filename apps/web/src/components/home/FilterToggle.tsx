import { createStyles, Tooltip } from "@mantine/core";
import {
  Item as ToggleItem,
  Root as ToggleGroupRoot,
} from "@radix-ui/react-toggle-group";
import shallow from "zustand/shallow";

import { useFilterStore } from "~/stores/filter";
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
  const value = useFilterStore((store) => store.framework);
  const { classes } = useStyles();

  return (
    <ToggleGroupRoot
      type="single"
      className={classes.root}
      defaultValue="all"
      value={value}
      onValueChange={(framework) => {
        if (framework) useFilterStore.setState({ framework });
      }}
    >
      <ToggleItem value="all" className={classes.item}>
        <IconAll height={28} width={28} />
      </ToggleItem>

      {Object.entries(frameworks).map(([framework, Icon]) => (
        <Tooltip key={framework} label={framework} withArrow transition="pop">
          <ToggleItem value={framework} className={classes.item}>
            <Icon height={28} width={28} />
          </ToggleItem>
        </Tooltip>
      ))}
    </ToggleGroupRoot>
  );
};

export default FilterToggle;
