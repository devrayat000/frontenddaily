import { cacheExchange } from "@urql/exchange-graphcache";
import { relayPagination } from "@urql/exchange-graphcache/extras";
import { createClient, dedupExchange, fetchExchange, ssrExchange } from "urql";

export const cache = cacheExchange({
  keys: {
    RichText: () => null,
  },
  resolvers: {
    Query: {
      projectsConnection: relayPagination(),
    },
  },
});
export const ssr = ssrExchange({ isClient: typeof window !== "undefined" });

export function createUrqlClient(sss: ReturnType<typeof ssrExchange>) {
  return createClient({
    url: process.env.NEXT_PUBLIC_API_URL!,
    fetchOptions: {
      headers: {
        // eslint-disable-next-line
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    },
    exchanges: [dedupExchange, cache, sss, fetchExchange],
    // suspense: true,
  });
}

export function initSSR() {
  const ssr = ssrExchange({ isClient: false });
  const client = createUrqlClient(ssr);

  return { ssr, client };
}

export default createUrqlClient(ssr);
