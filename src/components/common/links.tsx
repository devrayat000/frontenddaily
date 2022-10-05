import type { GroupProps } from "@mantine/core";
import { Button, Group } from "@mantine/core";
import { NextLink } from "@mantine/next";

import { useHeaderStyles } from "./styles";

export const HeaderLinks = ({ className, ...props }: GroupProps) => {
  const { classes, cx } = useHeaderStyles();

  return (
    <Group className={cx(classes.links, className)} {...props}>
      <Button component={NextLink} href="/" variant="subtle" color="gray">
        Designs
      </Button>
      <Button component={NextLink} href="/about" variant="subtle" color="gray">
        About
      </Button>
      <Button component={NextLink} href="/" variant="subtle" color="gray">
        License
      </Button>
      <Button
        component={NextLink}
        href="/contact"
        variant="subtle"
        color="gray"
      >
        Contact
      </Button>
    </Group>
  );
};

export const FooterLinks = ({ className, ...props }: GroupProps) => {
  const { classes, cx } = useHeaderStyles();

  return (
    <Group className={cx(classes.links, className)} {...props}>
      <Button component={NextLink} href="/" variant="subtle" color="gray">
        Terms & Conditions
      </Button>
      <Button component={NextLink} href="/" variant="subtle" color="gray">
        Privacy Policy
      </Button>
    </Group>
  );
};
