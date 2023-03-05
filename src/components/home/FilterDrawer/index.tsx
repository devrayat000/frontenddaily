import type { ActionIconProps } from "@nextui-org/react";
import { ActionIcon, Indicator } from "@nextui-org/react";
import { IconAdjustmentsHorizontal } from "@tabler/icons";
import dynamic from "next/dynamic";
// import { useRouter } from "next/router";
import { useState } from "react";

import useTags from "~/hooks/use-tags";

// import { useTagStore } from "~/stores/chip";
import { useDrawerStyles } from "./drawer";

const Drawer = dynamic(() => import("./drawer"), { ssr: false });

const FilterDrawer = () => {
  const [openned, toggle] = useState(false);

  return (
    <>
      <FilterDrawerButton key="filter" onClick={() => toggle(true)} />
      <Drawer
        key="filter-drawer"
        opened={openned}
        onClose={() => toggle(false)}
      />
    </>
  );
};

export default FilterDrawer;

function FilterDrawerButton({
  className,
  ...props
}: ActionIconProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  // const count = useTagStore((store) => store.tags.size);
  const { tags } = useTags();
  const count = tags?.length ?? 0;
  const { classes, cx } = useDrawerStyles();

  return (
    <Indicator label={count} showZero={false} dot={false} inline size={22}>
      <ActionIcon className={cx(classes.filter, className)} {...props}>
        <IconAdjustmentsHorizontal />
      </ActionIcon>
    </Indicator>
  );
}
