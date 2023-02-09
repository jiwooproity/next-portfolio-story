import { useState } from "react";

import { Container } from "@/components";
import Head from "next/head";
import Router from "next/router";

type HomeTitleInfo = {
  main_title: string;
  sub_title: string;
};

export default function Home() {
  const [title, setTitle] = useState<HomeTitleInfo>({
    main_title: "Hi. I'm Front-End Developer",
    sub_title: "",
  });

  const onGoPortfolio = () => Router.push("/portfolio");

  return (
    <>
      <Container>
        <div className="home_inner-wrapper">
          <div className="home_title-wrapper">
            <h1 className="home_title">{title.main_title}</h1>
            <button className="home_portfolio_button" onClick={onGoPortfolio}>
              Portfolio
            </button>
          </div>
        </div>
      </Container>
    </>
  );
}
