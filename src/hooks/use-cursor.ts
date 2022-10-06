import { useRouter } from "next/router";
import { useState } from "react";

// import { useTagStore } from "~/stores/chip";
// import { useFilterStore } from "~/stores/filter";

export default function useCursor(initialValue: string | (() => string) = "") {
  const [cursor, setCursor] = useState(initialValue);

  // const [framework, search] = useFilterStore(
  //   (store) => [store.framework, store.search],
  //   shallow
  // );
  const { framework, q: search, tags } = useRouter().query;
  const [prevFramework, setPrevFramework] = useState(framework);
  const [prevSearch, setPrevSearch] = useState(search);
  const [prevTags, setPrevTags] = useState(tags);
  // const tags = useTagStore(useCallback((store) => Array.from(store.tags), []));

  if (
    framework !== prevFramework ||
    search !== prevSearch ||
    tags !== prevTags
  ) {
    setCursor("");
    setPrevFramework(framework);
    setPrevSearch(search);
    setPrevTags(tags);
  }

  // useEffect(() => {
  //   setCursor("");
  // }, [framework, search, tags]);

  return {
    cursor,
    setCursor,
    framework: framework as string,
    search: search as string,
    tags: typeof tags === "string" ? tags.split(",") : undefined,
  };
}
