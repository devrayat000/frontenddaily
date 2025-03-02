import { Metadata } from "next";
import React from "react";
import Shell from "~/components/common/shell";

export const metadata = {
  manifest: "/manifest.json",
  icons: {
    apple: [
      {
        sizes: "57x57",
        type: "image/png",
        url: "/apple-icon-57x57.png",
      },
      {
        sizes: "60x60",
        type: "image/png",
        url: "/apple-icon-60x60.png",
      },
      {
        sizes: "72x72",
        type: "image/png",
        url: "/apple-icon-72x72.png",
      },
      {
        sizes: "76x76",
        type: "image/png",
        url: "/apple-icon-76x76.png",
      },
      {
        sizes: "114x114",
        type: "image/png",
        url: "/apple-icon-114x114.png",
      },
      {
        sizes: "120x120",
        type: "image/png",
        url: "/apple-icon-120x120.png",
      },
      {
        sizes: "144x144",
        type: "image/png",
        url: "/apple-icon-144x144.png",
      },
      {
        sizes: "152x152",
        type: "image/png",
        url: "/apple-icon-152x152.png",
      },
      {
        sizes: "180x180",
        type: "image/png",
        url: "/apple-icon-180x180.png",
      },
      {
        sizes: "192x192",
        type: "image/png",
        url: "/apple-icon-192x192.png",
      },
    ],
    icon: [
      {
        sizes: "16x16",
        type: "image/png",
        url: "/favicon-16x16.png",
      },
      {
        sizes: "32x32",
        type: "image/png",
        url: "/favicon-32x32.png",
      },
      {
        sizes: "96x96",
        type: "image/png",
        url: "/favicon-96x96.png",
      },
    ],
  },
  twitter: { site: "@fronten_daily" },
  facebook: { appId: "fronten.daily" },
  openGraph: { siteName: "Frontend Daily" },
  authors: [{ name: "Zul Ikram Musaddik Rayat" }],
} satisfies Metadata;

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Shell>{children}</Shell>;
}
