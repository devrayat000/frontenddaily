import {
  ActionIcon,
  createStyles,
  Drawer,
  Group,
  ScrollArea,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconAdjustmentsHorizontal, IconX } from "@tabler/icons";
import _groubBy from "lodash/groupBy";
import _head from "lodash/head";
import { memo, useState } from "react";

import { FilterScreen, TagGroup } from "./components";
import data from "./tags.json";

const useStyles = createStyles((theme) => ({
  filter: {
    backgroundColor: theme.colors.gray[1],
    height: 48,
    width: 48,
    "&:hover": {
      backgroundColor: theme.fn.rgba(theme.colors.gray[1], 0.85),
    },
    "& svg": {
      height: theme.spacing.xl,
      width: theme.spacing.xl,
    },
  },
}));

const FilterDrawer = () => {
  const [openned, toggle] = useState(false);
  const { classes } = useStyles();

  return (
    <>
      <ActionIcon
        key="filter"
        className={classes.filter}
        onClick={() => toggle(true)}
      >
        <IconAdjustmentsHorizontal />
      </ActionIcon>

      <Drawer
        opened={openned}
        onClose={() => toggle(false)}
        padding="xl"
        size="xl"
        overlayBlur={3}
        withinPortal
        withOverlay
        withCloseButton={false}
        closeOnEscape
        position="right"
        closeButtonLabel="Close"
        classNames={{ closeButton: classes.filter }}
      >
        <Stack sx={{ height: "100%" }} spacing="xl" my="md">
          <Group position="apart" align="start">
            <div>
              <Title order={3} weight={500}>
                Filter By tags
              </Title>
              <Text component="p" size="md" my="xs">
                Select tags to filter sites
              </Text>
            </div>
            <ActionIcon
              className={classes.filter}
              onClick={() => toggle(false)}
            >
              <IconX />
            </ActionIcon>
          </Group>

          <FilterScreen />

          <FilterTagsList />
        </Stack>
      </Drawer>
    </>
  );
};

export default FilterDrawer;

const FilterTagsList = memo(() => {
  return (
    <ScrollArea.Autosize key="scroll-container" maxHeight="calc(100% - 260px)">
      {Object.entries(_groubBy(data.tags.sort(), _head)).map(([key, tags]) => (
        <TagGroup key={key} label={key} tags={tags} />
      ))}
    </ScrollArea.Autosize>
  );
});
FilterTagsList.displayName = "FilterTagsList";
