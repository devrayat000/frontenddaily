import React from "react";

export type MediaQueryProps = {
  children: React.ReactElement;
  className?: string;
  style?: React.CSSProperties;
};

const MediaQuery: React.FC<MediaQueryProps> = ({
  children,
  style,
  className,
}) => {
  const child = React.isValidElement(children)
    ? React.cloneElement(children, { style, className } as any)
    : children;
  return child;
};

export default MediaQuery;
