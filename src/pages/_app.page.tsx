import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

import { globalStyles } from "@/styles/global";
import { Roboto } from "next/font/google";

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
    <SessionProvider session={session}>
      <main className={roboto.className}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}
