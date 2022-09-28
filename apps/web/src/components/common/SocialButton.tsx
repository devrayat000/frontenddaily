import { ActionIcon, createStyles } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import {
  IconBrandDribbble,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconSocial,
} from "@tabler/icons";
import { useEffect } from "react";
import { animated, config, to, useSprings } from "react-spring";

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
    href: "#",
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
  const [open, toggle] = useToggle();

  const [springs, api] = useSprings(socialLinks.length, () => ({
    y: 0,
    opacity: 0,
    config: config.stiff,
  }));

  useEffect(() => {
    api.start((i) => ({
      y: open ? (-i - 1) * 52 : 0,
      opacity: open ? 1 : 0,
    }));

    return () => void api.stop();
    // eslint-disable-next-line
  }, [open]);

  return (
    <div>
      <ActionIcon
        size="xl"
        radius="xl"
        color="cyan"
        variant="filled"
        className={classes.fab}
        onClick={() => toggle()}
        sx={{ zIndex: socialLinks.length + 10 }}
      >
        <IconSocial />
      </ActionIcon>

      {springs.map((style, i) => {
        const item = socialLinks[i];

        return (
          <ActionIcon
            key={item.title}
            component={animated.a}
            href={item.href}
            title={item.title}
            rel="noreferrer"
            target="_blank"
            size="xl"
            radius="xl"
            color="cyan"
            variant="filled"
            className={classes.fab}
            style={{
              zIndex: socialLinks.length - i,
              //   @ts-ignore
              opacity: style.opacity,
              //   @ts-ignore
              transform: to([style.y], (y) => `translateY(${y}px)`),
              //   @ts-ignore
              display: to([style.y], (y) => (y === 0 ? "none" : "flex")),
            }}
          >
            <item.icon />
          </ActionIcon>
        );
      })}
    </div>
  );
};

export default SocialButton;