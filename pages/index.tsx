import Router from "next/router";
import Layout from "@/components/layout/Layout";
import axios, { AxiosRequestConfig } from "axios";

export default function Home({ data }: any) {
  const onGoPortfolio = () => Router.push("/portfolio");
  console.log(data);

  return (
    <>
      <Layout>
        <div className="home_inner-wrapper">
          <div className="home_title-wrapper">
            <h1 className="home_title">Hi,</h1>
            <h1 className="home_title">
              I'm <span className="home_emphasize_title">S</span>o Jiwoo
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

export async function getStaticProps() {
  const config: AxiosRequestConfig = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_NOTION_SECRETE_TOKEN}`,
      "Notion-Version": "2022-06-28",
    },
  };

  const instance = axios.create(config);

  const url = `https://api.notion.com/v1/databases/${process.env.NEXT_NOTION_DATABASE_ID}/query`;
  const { data } = await instance.post(url, { page_size: 10 });

  return {
    props: {
      data: data.results,
    },
  };
}
