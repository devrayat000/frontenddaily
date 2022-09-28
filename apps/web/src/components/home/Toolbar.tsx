import { createStyles, Group, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons";

import FilterDrawer from "./FilterDrawer";
import FilterToggle from "./FilterToggle";

const useStyles = createStyles((theme) => ({
  container: {
    justifyContent: "space-between",
    alignItems: "stretch",

    [theme.fn.smallerThan("md")]: {
      flexDirection: "column-reverse",
      alignItems: "flex-end",
    },

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column-reverse",
      alignItems: "center",
    },
  },
  searchContainer: {
    [theme.fn.smallerThan("md")]: {
      width: "100%",
    },
  },
  inputRoot: {
    width: "max(520px, 400px)",

    [theme.fn.smallerThan("md")]: {
      width: "auto",
      flexGrow: 1,
      flexShrink: 0,
    },
  },
  input: {
    "&:focus": {
      border: "none",
    },
  },
}));

const Toolbar = () => {
  const { classes } = useStyles();

  return (
    <Group className={classes.container} my="xl" py="md">
      <FilterToggle />

      <Group className={classes.searchContainer}>
        <TextInput
          placeholder="Search"
          icon={<IconSearch />}
          size="lg"
          variant="filled"
          classNames={{ root: classes.inputRoot, input: classes.input }}
        />
        <FilterDrawer />
      </Group>
    </Group>
  );
};

export default Toolbar;
