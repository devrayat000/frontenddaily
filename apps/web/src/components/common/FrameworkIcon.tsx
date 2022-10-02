import type { ActionIconProps } from "@mantine/core";
import { ActionIcon } from "@mantine/core";
import { forwardRef } from "react";

import { useProjectStyles } from "~/styles/project";

const FrameworkIcon = forwardRef<HTMLButtonElement, ActionIconProps>(
  ({ className, ...props }, ref) => {
    const { classes, cx } = useProjectStyles();
    return (
      <ActionIcon
        ref={ref}
        variant="outline"
        size="xl"
        radius="xl"
        className={cx(classes.framework, className)}
        {...props}
      />
    );
  }
);

FrameworkIcon.displayName = "@common/FrameworkIcon";
export default FrameworkIcon;
