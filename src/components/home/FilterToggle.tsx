import { createStyles, Tooltip } from "@mantine/core";
import {
  Item as ToggleItem,
  Root as ToggleGroupRoot,
} from "@radix-ui/react-toggle-group";
import Link from "next/link";
import { useRouter } from "next/router";

// import { useFilterStore } from "~/stores/filter";
import { frameworks } from "~/utils/frameworks";

import IconAll from "../icons/all";

const useStyles = createStyles((theme) => {
  const dark = theme.colorScheme === "dark";
  return {
    root: {
      display: "inline-flex",
      borderRadius: 4,
      overflow: "hidden",
      border: dark ? "none" : `1px solid ${theme.colors.gray[1]}`,
    },
    item: {
      all: "unset",
      padding: "8px 12px",
      display: "flex",
      fontSize: 15,
      lineHeight: 1,
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      color: !dark ? theme.colors.dark[9] : theme.white,
      backgroundColor: dark ? theme.colors.dark[9] : theme.white,
      transition: "background-color 0.15s ease-in-out",
      "&:hover": { backgroundColor: theme.colors.gray[dark ? 9 : 0] },
      "&[data-state=on]": {
        backgroundColor: theme.colors.gray[dark ? 8 : 1],
      },
    },
  };
});

const FilterToggle = () => {
  const { classes } = useStyles();
  const { framework, ...rest } = useRouter().query;

  return (
    <ToggleGroupRoot
      type="single"
      className={classes.root}
      value={(framework || "all") as string}
    >
      <ToggleItem value="all" className={classes.item} asChild>
        <Link
          href={{
            query: {
              ...rest,
            },
          }}
          passHref
        >
          <IconAll height={28} width={28} fill="currentColor" />
        </Link>
      </ToggleItem>

      {Object.entries(frameworks).map(([framework, Icon]) => (
        <Tooltip key={framework} label={framework} withArrow transition="pop">
          <ToggleItem value={framework} className={classes.item} asChild>
            <Link
              href={{
                query: {
                  ...rest,
                  framework,
                },
              }}
              passHref
            >
              <Icon height={28} width={28} />
            </Link>
          </ToggleItem>
        </Tooltip>
      ))}
    </ToggleGroupRoot>
  );
};

export default FilterToggle;

// type ToggleButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

// const ToggleButton = forwardRef<HTMLAnchorElement, {}>((_, ref) => {
//   return (
//     <Tooltip label={framework} withArrow transition="pop">
//       <ToggleItem value={framework} className={classes.item} asChild>
//         <a>
//           <Icon height={28} width={28} />
//         </a>
//       </ToggleItem>
//     </Tooltip>
//   );
// });

// ToggleButton.displayName = "@home/ToggleButton";
