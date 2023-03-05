import { createStyles, Group, TextInput } from "@nextui-org/react";
import { IconSearch } from "@tabler/icons";
import _debounce from "lodash/debounce";
import { useRouter } from "next/router";

// import { useFilterStore } from "~/stores/filter";
import FilterDrawer from "./FilterDrawer";
import FilterToggle from "./FilterToggle";

const useStyles = createStyles((theme) => ({
  container: {
    justifyContent: "space-between",
    alignItems: "stretch",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl,

    [theme.fn.smallerThan("md")]: {
      flexDirection: "column-reverse",
      alignItems: "flex-end",
    },

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column-reverse",
      alignItems: "center",
      marginTop: 0,
      marginBottom: 0,
    },
  },
  searchContainer: {
    [theme.fn.smallerThan("md")]: {
      width: "100%",
    },
    [theme.fn.smallerThan("sm")]: {
      justifyContent: "end",
    },
  },
  inputRoot: {
    width: "max(520px, 400px)",

    [theme.fn.smallerThan("md")]: {
      // width: "auto",
      flexGrow: 1,
      flexShrink: 0,
    },
    [theme.fn.smallerThan("xs")]: {
      width: "100%",
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
  const router = useRouter();
  const { q, ...rest } = router.query;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    _debounce(() => {
      let query = Object.assign({ q: e.target.value || undefined }, rest);
      if (!query["q"]) {
        delete query.q;
      }

      router.push({ query });
    }, 750)();
  }

  return (
    <Group className={classes.container} py="md">
      <FilterToggle key="toggle" />

      <Group className={classes.searchContainer}>
        <TextInput
          placeholder="Search"
          icon={<IconSearch />}
          size="lg"
          variant="filled"
          classNames={{ root: classes.inputRoot, input: classes.input }}
          onChange={handleChange}
        />
        <FilterDrawer key="filter-drawer" />
      </Group>
    </Group>
  );
};

export default Toolbar;
