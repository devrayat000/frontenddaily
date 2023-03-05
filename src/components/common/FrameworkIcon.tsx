import clsx from "clsx";
import { forwardRef } from "react";

type FrameworkIconProps<
  C extends keyof JSX.IntrinsicElements | React.ComponentType<"any"> = "button",
  RefType = any
> = {
  component?: C;
} & Omit<React.ComponentPropsWithRef<C>, "as"> & {
    ref?: React.ForwardedRef<RefType>;
  };

const FrameworkIcon = function <
  C extends keyof JSX.IntrinsicElements | React.ComponentType<any> = "button",
  RefType = any
>(
  { as: Tag = "button", className, ...props }: FrameworkIconProps<C>,
  ref: React.ForwardedRef<RefType>
) {
  return (
    <Tag
      ref={ref}
      className={clsx(
        "appearance-none p-1.5 border border-slate-400 rounded-full",
        className
      )}
      {...props}
    />
  );
};
FrameworkIcon.displayName = "@common/FrameworkIcon";
export default forwardRef(FrameworkIcon) as <
  T extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
  RefType = any
>(
  props: FrameworkIconProps<T, RefType> & {
    ref?: React.ForwardedRef<RefType>;
  }
) => JSX.Element;
