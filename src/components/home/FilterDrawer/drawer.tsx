import {
  type DrawerProps,
  ActionIcon,
  createStyles,
  Drawer as MantineDrawer,
  Group,
  ScrollArea,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconX } from "@tabler/icons";
import _groubBy from "lodash/groupBy";
import _head from "lodash/head";
import { memo, Suspense, useMemo } from "react";
import useVirtual from "react-cool-virtual";
import { useQuery } from "urql";

import Loader from "~/components/common/Loader";
import type { TagsQuery, TagsQueryVariables } from "~/types/graphql.generated";

import { FilterScreen, TagGroup } from "./components";
import { TAGS_QUERY } from "./query";

export const useDrawerStyles = createStyles((theme) => ({
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

const Drawer = (props: DrawerProps) => {
  const { classes } = useDrawerStyles();

  return (
    <MantineDrawer
      padding="xl"
      size="xl"
      overlayBlur={3}
      withinPortal
      withOverlay
      withCloseButton={false}
      closeOnEscape
      position="right"
      closeButtonLabel="Close Filter Drawer"
      classNames={{ closeButton: classes.filter }}
      {...props}
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
          <ActionIcon className={classes.filter} onClick={props.onClose}>
            <IconX />
          </ActionIcon>
        </Group>

        <FilterScreen />

        <Suspense fallback={<Loader size="xs" />}>
          <FilterTagsList />
        </Suspense>
      </Stack>
    </MantineDrawer>
  );
};

export default Drawer;

const FilterTagsList = memo(() => {
  const [{ data }] = useQuery<TagsQuery, TagsQueryVariables>({
    query: TAGS_QUERY,
  });
  const tags = useMemo(
    () => _groubBy(data?.tags, (t) => _head(t.name)),
    [data?.tags]
  );
  const tagsArr = useMemo(() => Object.entries(tags), [tags]);
  const { outerRef, innerRef, items } = useVirtual<
    HTMLDivElement,
    HTMLDivElement
  >({
    itemCount: tagsArr.length,
    itemSize: 75,
  });

  return (
    <ScrollArea.Autosize
      key="scroll-container"
      maxHeight="calc(100% - 260px)"
      viewportRef={outerRef}
    >
      <div ref={innerRef}>
        {items.map(({ measureRef, index }) => (
          <TagGroup
            key={`tag-${tagsArr[index][0]}`}
            label={tagsArr[index][0]}
            tags={tagsArr[index][1]}
            ref={measureRef as any}
          />
        ))}
      </div>
    </ScrollArea.Autosize>
  );
});
FilterTagsList.displayName = "@home/FilterTagsList";
