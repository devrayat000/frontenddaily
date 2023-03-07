import { ActionIcon, createStyles } from "@mantine/core";
import {
  IconBrandDribbble,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconSocial,
} from "@tabler/icons";
// import { animated, config, to, useSprings } from "react-spring";
import type { Variant } from "framer-motion";
import { motion, useAnimationControls, useWillChange } from "framer-motion";
import { useEffect, useRef } from "react";

const useStyles = createStyles((theme) => ({
  fab: {
    position: "fixed",
    right: 24,
    bottom: "calc(var(--mantine-footer-height, 0px) + 24px)",
    boxShadow: theme.shadows.md,
  },
}));

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
  open: ((i: number) => ({
    y: (-i - 1) * 52,
    opacity: 1,
  })) as Variant,
  close: {
    y: 0,
    opacity: 0,
  } as Variant,
};

const SocialButton = () => {
  const { classes } = useStyles();
  const openRef = useRef(false);
  const api = useAnimationControls();
  const willChange = useWillChange();

  async function animate() {
    let open = (openRef.current = !openRef.current);
    try {
      await api.start(open ? "open" : "close");
    } catch (error) {
      console.log(error);
    }
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
        sx={{ zIndex: socialLinks.length + 10 }}
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
            animate={api}
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
