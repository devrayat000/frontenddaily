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
import { motion, useAnimationControls } from "framer-motion";
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

const SocialButton = () => {
  const { classes } = useStyles();
  const openRef = useRef(false);
  const api = useAnimationControls();

  function animate() {
    let open = (openRef.current = !openRef.current);
    api.start((i) => ({
      y: open ? (-i - 1) * 52 : 0,
      opacity: open ? 1 : 0,
    }));
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
            initial={{ opacity: 0 }}
            animate={api}
            custom={i}
            style={{ zIndex: socialLinks.length - i }}
          >
            <item.icon />
          </ActionIcon>
        );
      })}
    </div>
  );
};

export default SocialButton;
