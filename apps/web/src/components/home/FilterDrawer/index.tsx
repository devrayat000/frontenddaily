import { ActionIcon } from "@mantine/core";
import { IconAdjustmentsHorizontal } from "@tabler/icons";
import dynamic from "next/dynamic";
import { useState } from "react";

import { useDrawerStyles } from "./drawer";

const Drawer = dynamic(() => import("./drawer"));

const FilterDrawer = () => {
  const [openned, toggle] = useState(false);
  const { classes } = useDrawerStyles();

  return (
    <>
      <ActionIcon
        key="filter"
        className={classes.filter}
        onClick={() => toggle(true)}
      >
        <IconAdjustmentsHorizontal />
      </ActionIcon>

      <Drawer opened={openned} onClose={() => toggle(false)} />
    </>
  );
};

export default FilterDrawer;
