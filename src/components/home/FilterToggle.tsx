import {
  Item as ToggleItem,
  Root as ToggleGroupRoot,
} from "@radix-ui/react-toggle-group";
import * as Tooltip from "@radix-ui/react-tooltip";
import Link from "next/link";
import { useRouter } from "next/router";

// import { useFilterStore } from "~/stores/filter";
import { frameworks } from "~/utils/frameworks";

import IconAll from "../icons/all";

const FilterToggle = () => {
  const { framework, ...rest } = useRouter().query;

  return (
    <ToggleGroupRoot
      type="single"
      className="inline-flex rounded border border-gray-100"
      value={(framework || "all") as string}
    >
      <ToggleItem
        value="all"
        className="all-unset py-2 px-3 flex items-center justify-center cursor-pointer bg-white hover:bg-gray-50 transition-colors data-[state=on]:bg-gray-100"
        asChild
      >
        <Link
          href={{
            query: {
              ...rest,
            },
          }}
          passHref
        >
          <IconAll height={28} width={28} />
        </Link>
      </ToggleItem>

      {Object.entries(frameworks).map(([framework, Icon]) => (
        <Tooltip.Provider key={framework}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <ToggleItem
                value={framework}
                className="all-unset py-2 px-3 flex items-center justify-center cursor-pointer bg-white hover:bg-gray-50 transition-colors data-[state=on]:bg-gray-100"
                asChild
              >
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
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="z-60 data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
                sideOffset={5}
              >
                {framework}
                <Tooltip.Arrow className="fill-white" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
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
