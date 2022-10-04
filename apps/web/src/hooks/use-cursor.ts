import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import shallow from "zustand/shallow";

// import { useTagStore } from "~/stores/chip";
// import { useFilterStore } from "~/stores/filter";

export default function useCursor(initialValue: string | (() => string) = "") {
  const [cursor, setCursor] = useState(initialValue);

  // const [framework, search] = useFilterStore(
  //   (store) => [store.framework, store.search],
  //   shallow
  // );
  const { framework, q: search, tags } = useRouter().query;
  // const tags = useTagStore(useCallback((store) => Array.from(store.tags), []));

  useEffect(() => {
    setCursor("");
  }, [framework, search, tags]);

  return {
    cursor,
    setCursor,
    framework: framework as string,
    search: search as string,
    tags: typeof tags === "string" ? tags.split(",") : undefined,
  };
}
