import { Container, Group } from "@mantine/core";

import FilterToggle from "~/components/home/FilterToggle";

export default function Web() {
  return (
    <Container>
      <Group position="apart">
        <FilterToggle />
      </Group>
    </Container>
  );
}
