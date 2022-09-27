import { createStyles } from "@mantine/core";
import {
  Item as ToggleItem,
  Root as ToggleGroupRoot,
} from "@radix-ui/react-toggle-group";
import { useState } from "react";

import { Framework } from "~/graphql/generated";

import IconAll from "../icons/all";
import IconNextJs from "../icons/nextjs";
import IconReact from "../icons/react";
import IconSvelte from "../icons/svelte";
import IconVanillaJavascript from "../icons/vanilla";

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

const frameworks = [
  {
    name: Framework.Vanilla,
    icon: IconVanillaJavascript,
  },
  {
    name: Framework.Svelte,
    icon: IconSvelte,
  },
  {
    name: Framework.React,
    icon: IconReact,
  },
  {
    name: Framework.Next,
    icon: IconNextJs,
  },
];

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
        <ToggleItem
          key={framework.name}
          value={framework.name}
          className={classes.item}
        >
          <framework.icon height={28} width={28} />
        </ToggleItem>
      ))}
    </ToggleGroupRoot>
  );
};

export default FilterToggle;
