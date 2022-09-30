import type { DrawerProps } from "@mantine/core";
import { Divider } from "@mantine/core";
import { Drawer as MantineDrawer } from "@mantine/core";
import { useCallback, useEffect } from "react";

import { useDrawerStyles } from "../home/FilterDrawer/drawer";
import { FooterLinks, HeaderLinks } from "./links";

const Drawer = (props: DrawerProps) => {
  const { classes, theme } = useDrawerStyles();

  const handleResize = useCallback(
    (e: UIEvent) => {
      if ((e.target as Window).innerWidth >= theme.breakpoints.sm) {
        props.onClose();
      }
    },
    // eslint-disable-next-line
    [props.onClose, theme.breakpoints.sm]
  );

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

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
