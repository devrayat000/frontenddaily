import IconNextJs from "~/components/icons/nextjs";
import IconReact from "~/components/icons/react";
import IconRemix from "~/components/icons/remix";
import IconSvelte from "~/components/icons/svelte";
import IconVanillaJavascript from "~/components/icons/vanilla";
import { Framework } from "~/types/graphql.generated";

export const frameworks = {
  [Framework.Vanilla]: IconVanillaJavascript,
  [Framework.Svelte]: IconSvelte,
  [Framework.React]: IconReact,
  [Framework.Next]: IconNextJs,
  [Framework.Remix]: IconRemix,
};
