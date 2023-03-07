import type { GroupProps } from "@mantine/core";
import { Button, Group } from "@mantine/core";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { useHeaderStyles } from "./styles";

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
  const { classes, cx } = useHeaderStyles();
  const router = useRouter();

  return (
    <Group grow={false} className={cx(classes.links, className)} {...props}>
      {headerLinks.map((link) => (
        <Button
          key={link.href}
          component={NextLink}
          href={link.href}
          variant="subtle"
          color={router.pathname === link.href ? "cyan" : "dark"}
        >
          {link.label}
        </Button>
      ))}
    </Group>
  );
};

export const FooterLinks = ({ className, ...props }: GroupProps) => {
  const { classes, cx } = useHeaderStyles();

  return (
    <Group className={cx(classes.links, className)} {...props}>
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
