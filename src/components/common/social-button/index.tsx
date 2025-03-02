"use client";

import { ActionIcon } from "@mantine/core";
import {
  IconBrandDribbble,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconSocial,
} from "@tabler/icons-react";
// import { animated, config, to, useSprings } from "react-spring";
import type { Variants } from "motion/react";
import { motion, useAnimationControls, useWillChange } from "motion/react";
import { useEffect, useState } from "react";

import classes from "./styles.module.css";

const socialLinks = [
  {
    href: "https://www.facebook.com/rayat.ass",
    title: "Facebook",
    icon: IconBrandFacebook,
  },
  {
    href: "https://dribbble.com/devrayat000",
    title: "Dribbble",
    icon: IconBrandDribbble,
  },
  {
    href: "https://www.instagram.com/zul.rayat/",
    title: "Instagram",
    icon: IconBrandInstagram,
  },
  {
    href: "https://twitter.com/fronten_daily",
    title: "Twitter",
    icon: IconBrandTwitter,
  },
  {
    href: "https://www.linkedin.com/in/zul-ikram-musaddik-rayat-9219321b4",
    title: "Linkedin",
    icon: IconBrandLinkedin,
  },
];

const foldIn = {
  open: (i: number) => ({
    y: (-i - 1) * 52,
    opacity: 1,
  }),
  close: {
    y: 0,
    opacity: 0,
  },
} satisfies Variants;

const SocialButton = () => {
  const api = useAnimationControls();
  const willChange = useWillChange();
  const [state, setState] = useState<"open" | "close">("close");

  function animate() {
    setState((prev) => (prev === "open" ? "close" : "open"));
  }

  useEffect(() => {
    return () => void api.stop();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <ActionIcon
        size="xl"
        radius="xl"
        color="cyan"
        variant="filled"
        className={classes.fab}
        onClick={animate}
      >
        <IconSocial />
      </ActionIcon>

      {socialLinks.map((item, i) => {
        return (
          <ActionIcon
            key={item.title}
            component={motion.a}
            href={item.href}
            title={item.title}
            rel="noreferrer"
            target="_blank"
            size="xl"
            radius="xl"
            color="cyan"
            variant="filled"
            className={classes.fab}
            initial={"close"}
            variants={foldIn}
            animate={state}
            custom={i}
            // @ts-ignore
            style={{ zIndex: socialLinks.length - i, willChange }}
          >
            <item.icon />
          </ActionIcon>
        );
      })}
    </div>
  );
};

export default SocialButton;
