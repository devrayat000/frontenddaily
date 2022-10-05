import { Burger, MediaQuery } from "@mantine/core";
import dynamic from "next/dynamic";
import { useState } from "react";

const Drawer = dynamic(() => import("./Drawer"), { ssr: false });

const MenuButton = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        <Burger opened={opened} onClick={() => setOpened(true)} />
      </MediaQuery>
      <Drawer opened={opened} onClose={() => setOpened(false)} />
    </>
  );
};

export default MenuButton;
