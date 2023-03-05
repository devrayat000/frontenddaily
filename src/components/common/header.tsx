import { Navbar, Text } from "@nextui-org/react";
import Link from "next/link";

import Logo from "../icons/Logo";
import { headerLinks } from "./links";
import NavLink from "./NavLink";

const Header = () => {
  return (
    <Navbar variant="sticky" as="header">
      <Navbar.Brand>
        <Logo height={36} />
        <Text b color="inherit" hideIn="xs">
          Frontend Daily
        </Text>
      </Navbar.Brand>

      <Navbar.Content as="ul">
        {headerLinks.map((link) => (
          <Navbar.Item key={link.href}>
            <Link href={link.href} passHref>
              <NavLink block color="text">
                {link.label}
              </NavLink>
            </Link>
          </Navbar.Item>
        ))}
      </Navbar.Content>
    </Navbar>
  );
};

export default Header;
