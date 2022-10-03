import type { LoaderProps } from "@mantine/core";
import { Center, Loader as MantineLoader } from "@mantine/core";
import { forwardRef } from "react";

const Loader = forwardRef<HTMLDivElement, LoaderProps>((props, ref) => {
  return (
    <Center ref={ref} component="section">
      <MantineLoader variant="bars" color="cyan" size="lg" {...props} />
    </Center>
  );
});

Loader.displayName = "@common/Loader";
export default Loader;
