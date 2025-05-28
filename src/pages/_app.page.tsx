import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

import "@/lib/dayjs";

import { globalStyles } from "@/styles/global";
import { Roboto } from "next/font/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  style: ["italic", "normal"],
  display: "swap",
});

globalStyles();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <main className={roboto.className}>
          <Component {...pageProps} />
        </main>
      </SessionProvider>
    </QueryClientProvider>
  );
}
