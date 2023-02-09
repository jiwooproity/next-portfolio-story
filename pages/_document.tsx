import { Html, Head, Main, NextScript } from "next/document";
import { Navbar } from "@/components";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Next Portfolio Web</title>
        <meta name="description" content="나의 포트폴리오 소개 웹" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Navbar />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
