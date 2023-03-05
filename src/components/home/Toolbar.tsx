import { IconSearch } from "@tabler/icons";
import _debounce from "lodash/debounce";
import { useRouter } from "next/router";

// import { useFilterStore } from "~/stores/filter";
import FilterDrawer from "./FilterDrawer";
import FilterToggle from "./FilterToggle";

const Toolbar = () => {
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
    <section className="py-4 flex flex-col md:flex-row items-center sm:items-end md:items-stretch justify-between my-6">
      <FilterToggle key="toggle" />

      <section className="flex items-center justify-end sm:justify-start w-full md:w-auto">
        <div
          className="flex items-center border border-slate-50 rounded py-2 px-3 bg-slate-100 gap-2"
          tabIndex={0}
          style={{ width: "max(520px, 400px)" }}
        >
          <IconSearch />
          <input
            type="search"
            placeholder="Search"
            // size="lg"
            // variant="filled"
            className="flex-1 bg-inherit px-4 py-1 w-full all-unset"
            onChange={handleChange}
          />
        </div>
        {/* <FilterDrawer key="filter-drawer" /> */}
      </section>
    </section>
  );
};

export default Toolbar;
