"use client";

import type { GroupProps } from "@mantine/core";
import { Button, Group } from "@mantine/core";
import NextLink from "next/link";

import classes from "./styles.module.css";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const headerLinks = [
  {
    href: "/",
    label: "Designs",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/contact",
    label: "Contact",
  },
];

export const HeaderLinks = ({ className, ...props }: GroupProps) => {
  const pathname = usePathname();

  return (
    <Group
      grow={false}
      className={clsx(classes.links, classes.lgLinks, className)}
      {...props}
    >
      {headerLinks.map((link) => (
        <Button
          key={link.href}
          component={NextLink}
          href={link.href}
          variant="subtle"
          color={pathname === link.href ? "cyan" : "dark"}
        >
          {link.label}
        </Button>
      ))}
    </Group>
  );
};

export const FooterLinks = ({ className, ...props }: GroupProps) => {
  return (
    <Group
      className={clsx(classes.links, classes.lgLinks, className)}
      {...props}
    >
      <Button
        component={NextLink}
        href="/terms-conditions"
        variant="subtle"
        color="dark"
      >
        Terms & Conditions
      </Button>
      <Button
        component={NextLink}
        href="/privacy"
        variant="subtle"
        color="dark"
      >
        Privacy Policy
      </Button>
    </Group>
  );
};
