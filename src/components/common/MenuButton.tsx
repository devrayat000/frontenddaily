import { IconMenu } from "@tabler/icons";
import dynamic from "next/dynamic";
import { useState } from "react";

import MediaQuery from "./MediaQuery";

// const Drawer = dynamic(() => import("./Drawer"), { ssr: false });

const MenuButton = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <MediaQuery className="sm:hidden">
        <button
          type="button"
          className="appearance-none text-slate-900 p-3 rounded-full hover:bg-slate-900/10"
          onClick={() => setOpened(true)}
        >
          <IconMenu className="h-5 w-5" />
        </button>
      </MediaQuery>
      {/* <Drawer opened={opened} onClose={() => setOpened(false)} /> */}
    </>
  );
};

export default MenuButton;
