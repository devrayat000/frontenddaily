// import { ActionIconProps, Button, styled } from "@nextui-org/react";
// import { createPolymorphicComponent } from "@nextui-org/react";
import { type ButtonProps, Button, styled } from "@nextui-org/react";
import { forwardRef } from "react";

// import { useProjectStyles } from "~/styles/project";

// const FrameworkIcon = forwardRef<HTMLButtonElement, ButtonProps>(
//   ({ className, ...props }, ref) => {
//     const { classes, cx } = useProjectStyles();
//     return (
//       <ActionIcon
//         ref={ref}
//         variant="outline"
//         size="xl"
//         radius="xl"
//         className={cx(classes.framework, className)}
//         {...props}
//       />
//     );
//   }
// );

// FrameworkIcon.displayName = "@common/FrameworkIcon";
export default styled(Button, {
  px: 0,
  borderColor: "$gray200",
});
// export default createPolymorphicComponent<"button", ActionIconProps>(
//   FrameworkIcon
// );
