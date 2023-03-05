import { createStyles } from "@nextui-org/react";
import { cloneElement } from "react";

import type { MockupProps } from "./types";

const useStyles = createStyles((theme) => ({
  container: {
    width: 768,
    height: 1024,
    borderRadius: theme.radius.xl * 2,
    overflow: "hidden",
    border: "32px solid #1F2224",
    outline: `8px solid ${theme.colors.gray[3]}`,
    scale: "60%",
    willChange: "scale",
    backfaceVisibility: "hidden",
    WebkitFontSmoothing: "subpixel-antialiased",
    WebkitFilter: "blue(0px)",
    transformOrigin: "top center",
    margin: `${theme.spacing.md}px auto`,
  },
  frame: {
    width: "100%",
    height: "100%",
  },
}));

const TabletMockup: React.FC<MockupProps> = ({ children }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      {cloneElement(children, {
        loading: "lazy",
        frameBorder: 0,
        className: classes.frame,
      })}
    </div>
  );
};

export default TabletMockup;
