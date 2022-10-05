import { useRouter } from "next/router";

export default function useTags() {
  const router = useRouter();
  const tags =
    typeof router.query.tags === "string"
      ? router.query.tags.split(",")
      : undefined;

  return { tags, router };
}
