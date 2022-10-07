import { ActionIcon, createStyles } from "@mantine/core";
import {
  IconBrandDribbble,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconSocial,
} from "@tabler/icons";
import { useEffect, useRef } from "react";
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
  const openRef = useRef(false);

  const [springs, api] = useSprings(socialLinks.length, () => ({
    y: 0,
    opacity: 0,
    config: config.stiff,
  }));

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
            style={
              {
                zIndex: socialLinks.length - i,
                opacity: style.opacity,
                transform: to([style.y], (y) => `translateY(${y}px)`),
              } as any
            }
          >
            <item.icon />
          </ActionIcon>
        );
      })}
    </div>
  );
};

export default SocialButton;
