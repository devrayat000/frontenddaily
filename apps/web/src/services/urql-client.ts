import { cacheExchange } from "@urql/exchange-graphcache";
import { createClient, dedupExchange, fetchExchange, ssrExchange } from "urql";

export const cache = cacheExchange();
export const ssr = ssrExchange({ isClient: typeof window !== "undefined" });

export function createUrqlClient(ssrExchange = ssr) {
  return createClient({
    url: process.env.NEXT_PUBLIC_API_URL!,
    fetchOptions: {
      headers: {
        // eslint-disable-next-line
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    },
    exchanges: [dedupExchange, cache, fetchExchange, ssrExchange],
  });
}

export default createUrqlClient(ssr);
