import type { DrawerProps } from "@nextui-org/react";
import { Divider, Drawer as MantineDrawer } from "@nextui-org/react";
import { useSyncExternalStore } from "react";

import { useDrawerStyles } from "../home/FilterDrawer/drawer";
import { FooterLinks, HeaderLinks } from "./links";

function subscribe(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => {
    window.removeEventListener("resize", callback);
  };
}

const Drawer = (props: DrawerProps) => {
  const { classes, theme } = useDrawerStyles();
  const isLarge = useSyncExternalStore<boolean>(
    subscribe,
    () => window.innerHeight >= theme.breakpoints.sm,
    () => false
  );

  if (props.opened && isLarge) {
    props.onClose();
  }

  return (
    <MantineDrawer
      padding="xl"
      size="xl"
      overlayBlur={3}
      withinPortal
      withOverlay
      closeOnEscape
      position="right"
      closeButtonLabel="Close Drawer"
      classNames={{ closeButton: classes.filter }}
      {...props}
    >
      <HeaderLinks />
      <Divider orientation="horizontal" my="xl" />
      <FooterLinks />
    </MantineDrawer>
  );
};

export default Drawer;
