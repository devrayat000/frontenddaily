import IconNextJs from "~/components/icons/nextjs";
import IconReact from "~/components/icons/react";
import IconSvelte from "~/components/icons/svelte";
import IconVanillaJavascript from "~/components/icons/vanilla";
import { Framework } from "~/graphql/generated";

export const frameworks = [
  {
    name: Framework.Vanilla,
    icon: IconVanillaJavascript,
  },
  {
    name: Framework.Svelte,
    icon: IconSvelte,
  },
  {
    name: Framework.React,
    icon: IconReact,
  },
  {
    name: Framework.Next,
    icon: IconNextJs,
  },
];
