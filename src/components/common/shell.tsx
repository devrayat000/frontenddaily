import { Button, Link, Navbar, Text } from "@nextui-org/react";
import NextLink from "next/link";

import Logo from "../icons/Logo";
import Footer from "./Footer";
import Header from "./header";
import { headerLinks } from "./links";

const Shell: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Shell;
