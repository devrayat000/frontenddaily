import { Container } from "@mantine/core";

import Projects from "~/components/home/Projects";
import Toolbar from "~/components/home/Toolbar";

export default function Web() {
  return (
    <Container
      fluid
      sx={(theme) => ({
        paddingLeft: theme.spacing.xl,
        paddingRight: theme.spacing.xl,
        [theme.fn.smallerThan("sm")]: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      })}
    >
      <Toolbar />

      <Projects />
    </Container>
  );
}
