import { Box, Button, Chip, Group, Paper, Text } from "@mantine/core";
// import { useRouter } from "next/router";
import { forwardRef } from "react";

// import shallow from "zustand/shallow";
import type { TagsQuery } from "~/graphql/generated";
import useTags from "~/hooks/use-tags";
// import { useTagStore } from "~/stores/chip";

export function FilterScreen() {
  // const { numberOfTags, clear } = useTagStore(
  //   (store) => ({ numberOfTags: store.tags.size, clear: store.clear }),
  //   shallow
  // );
  const { router, tags } = useTags();
  const numberOfTags = tags?.length ?? 0;

  function clearTags() {
    const query = Object.assign({}, router.query);
    delete query.tags;
    router.push({ query });
  }

  return (
    <Paper p="xl" radius="md" withBorder>
      <Group position="apart">
        <Text size="xl">
          <b>{numberOfTags}</b> tags selected
        </Text>
        <Button
          key="clear"
          size="sm"
          color="gray"
          variant="light"
          onClick={clearTags}
          type="reset"
        >
          Clear
        </Button>
      </Group>
    </Paper>
  );
}

type TagGroupProps = {
  label: string;
  tags: TagsQuery["tags"];
};

export const TagGroup = forwardRef<HTMLDivElement, TagGroupProps>(
  ({ label, tags }, ref) => {
    // const { add, remove } = useTagStore(
    //   (store) => ({ add: store.add, remove: store.remove }),
    //   shallow
    // );

    return (
      <Box key={label} ref={ref}>
        <Text size="xl" component="p" weight={500}>
          {label}
        </Text>
        <Group spacing="xs">
          {tags.map((tag) => (
            <FilterChip
              key={tag.id}
              value={tag.name}
              // onChange={(checked) =>
              //   checked ? add(tag.name) : remove(tag.name)
              // }
            >
              {tag.name}
            </FilterChip>
          ))}
        </Group>
      </Box>
    );
  }
);
TagGroup.displayName = "TagGroup";

type FilterChipProps = {
  value: string;
  // onChange?(checked: boolean): void;
  children: React.ReactNode;
};

function FilterChip({ value, children }: FilterChipProps) {
  // const isChecked = useTagStore((store) => store.tags.has(value));
  const { router, tags } = useTags();
  const { tags: t, ...rest } = router.query;

  function toggleTag(checked: boolean) {
    let newTags = new Set(tags ?? []);

    if (checked) newTags.add(value);
    else newTags.delete(value);

    let query = Object.assign(
      rest,
      newTags.size > 0 ? { tags: Array.from(newTags).join(",") } : {}
    );

    router.push({ query });
  }

  return (
    <Chip value={value} checked={tags?.includes(value)} onChange={toggleTag}>
      {children}
    </Chip>
  );
}
