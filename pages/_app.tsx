import type { AppProps } from "next/app";

import "@/styles/globals.css";
import "@/styles/common/navbar.css";
import "@/styles/common/footer.css";
import "@/styles/common/container.css";

import "@/styles/home.css";
import "@/styles/portfolio.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
