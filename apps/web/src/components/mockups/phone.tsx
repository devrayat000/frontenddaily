import { createStyles } from "@mantine/core";
import { cloneElement } from "react";

import type { MockupProps } from "./types";

const useStyles = createStyles((theme) => ({
  container: {
    width: 360,
    height: 680,
    borderRadius: theme.radius.xl * 1.5,
    overflow: "hidden",
    border: "10px solid #1F2224",
    outline: `4px solid ${theme.colors.gray[3]}`,
    display: "flex",
    flexBasis: "auto",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    zoom: "80%",
    margin: `${theme.spacing.md}px auto`,
  },
  frame: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  head: {
    zIndex: 0,
    width: "60%",
  },
}));

const PhoneMockup: React.FC<MockupProps> = ({ children }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      {cloneElement(children, {
        loading: "lazy",
        frameBorder: 0,
        className: classes.frame,
      })}
      <div className={classes.head}>
        <svg viewBox="0 0 219 31">
          <path
            d="M0 1V0h219v1a5 5 0 0 0-5 5v3c0 12.15-9.85 22-22 22H27C14.85 31 5 21.15 5 9V6a5 5 0 0 0-5-5z"
            fillRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default PhoneMockup;
