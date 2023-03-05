import { type RowProps, Link, Navbar, Row } from "@nextui-org/react";
import NextLink from "next/link";

export const headerLinks = [
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

export const HeaderLinks = ({ css, ...props }: RowProps) => {
  return (
    <Row
      css={{
        gap: "$md",
        "@md": {
          gap: "$sm",
          ...css?.["@md"],
        },
        "@sm": {
          flexDirection: "column",
          alignItems: "stretch",
          gap: "$lg",
          ...css?.["@sm"],
        },
        ...css,
      }}
      {...props}
    >
      {headerLinks.map((link) => (
        <Navbar.Item key={link.href}>
          <NextLink href={link.href} passHref>
            <Link block color="default">
              {link.label}
            </Link>
          </NextLink>
        </Navbar.Item>
      ))}
    </Row>
  );
};

export const FooterLinks = ({ css, ...props }: RowProps) => {
  return (
    <Row
      css={{
        gap: "$md",
        "@md": {
          gap: "$sm",
          ...css?.["@md"],
        },
        "@sm": {
          flexDirection: "column",
          alignItems: "stretch",
          gap: "$lg",
          ...css?.["@sm"],
        },
        ...css,
      }}
      {...props}
    >
      <NextLink href="/terms-conditions" passHref>
        <Link block color="secondary">
          Terms & Conditions
        </Link>
      </NextLink>
      <NextLink href="/privacy" passHref>
        <Link block color="secondary">
          Privacy Policy
        </Link>
      </NextLink>
    </Row>
  );
};
