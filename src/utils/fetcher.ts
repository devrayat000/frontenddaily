export default async function fetcher<Data = any>(
  ...[query, variables]: [string] | [string, object]
) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  return (await res.json()).data as Data;
}

export const gql = String.raw;
