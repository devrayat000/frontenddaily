"use client";

import { AppShell } from "@mantine/core";

import Footer from "./footer";
import Header from "./header/index";
import SocialButton from "./social-button";
import { LazyMotion } from "motion/react";

const Shell: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <AppShell>
      <Header />
      <AppShell.Main>
        <LazyMotion
          features={() => import("motion/react").then((r) => r.domMax)}
        >
          {children}
        </LazyMotion>
        <SocialButton />
      </AppShell.Main>
      <Footer />
    </AppShell>
  );
};

export default Shell;
