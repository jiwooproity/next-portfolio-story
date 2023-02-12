import Head from "next/head";
import Container from "../common/Container";
import Footer from "../common/Footer";
import Navbar from "../common/Navbar";

interface LayoutProps {
  children: React.ReactNode;
  center: boolean;
}

const Layout = ({ children, center }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Next Portfolio Web</title>
        <meta name="description" content="나의 포트폴리오 소개 웹" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css" rel="stylesheet" type="text/css" />
      </Head>
      <Navbar />
      <Container center={center}>{children}</Container>
      <Footer />
    </>
  );
};

export default Layout;
