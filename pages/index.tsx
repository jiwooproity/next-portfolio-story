import Router from "next/router";
import Layout from "@/components/layout/Layout";

export default function Home() {
  const onGoPortfolio = () => Router.push("/portfolio");

  return (
    <>
      <Layout>
        <div className="home_inner-wrapper">
          <div className="home_title-wrapper">
            <h1 className="home_title">Hi,</h1>
            <h1 className="home_title">
              I&apos;m <span className="home_emphasize_title">S</span>o Jiwoo
            </h1>
            <h1 className="home_title">Front-End Developer</h1>
            <button className="home_portfolio_button" onClick={onGoPortfolio}>
              PORTFOLIO
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
}
