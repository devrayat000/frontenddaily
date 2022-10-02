import { getLocationOrigin } from "next/dist/shared/lib/utils";

export function getUrl() {
  /* eslint-disable  */
  return typeof window === "undefined"
    ? process.env.URL ||
        process.env.DEPLOY_URL ||
        (process.env.VERCEL_URL
          ? `https://${
              process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL
            }`
          : `http://localhost:${process.env.PORT || 3001}`)
    : getLocationOrigin();
  /* eslint-enable  */
}
