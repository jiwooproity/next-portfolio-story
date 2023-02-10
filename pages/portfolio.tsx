import { Layout } from "@/components";
import axios, { AxiosRequestConfig } from "axios";
import moment from "moment";

const config: AxiosRequestConfig = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_NOTION_SECRETE_TOKEN}`,
    "Notion-Version": "2022-06-28",
  },
};

const instance = axios.create(config);

type ResponseType = {
  data: {
    title: string;
    description: string;
    domain: object;
    tag: any[];
  }[];
};

type PortfolioLabelType = {
  label: string;
  children: React.ReactNode;
};

const PortfolioLabel = ({ label, children }: PortfolioLabelType) => {
  return (
    <div className="portfolio_notion-label-box">
      <span className={`portfolio_notion-label ${label}`} />
      {children}
    </div>
  );
};

const PortfolioBox = (value: any, index: number) => {
  const setTag = (value: any, index: number) => {
    return (
      <span className={`portfolio_notion-tag ${value.color}`} key={index}>
        {value.name}
      </span>
    );
  };

  return (
    <div className="portfolio_notion-box" key={index}>
      <div className="portfolio_notion-image">
        <a href={value.domain} target="_blank" rel="noreferrer" title="포트폴리오 보러가기">
          <img className="portfolio_notion-thumbnail" src={`${value.thumbnail}`} alt={value.title} />
        </a>
      </div>
      <div className="portfolio_notion-description-box">
        <PortfolioLabel label="title">
          <h1 className="portfolio_notion-title">{value.title}</h1>
        </PortfolioLabel>
        <PortfolioLabel label="description">
          <span className="portfolio_notion-description">{value.description}</span>
        </PortfolioLabel>
        <PortfolioLabel label="date">
          <div className="portfolio_notion-date-box">
            <span className="portfolio_notion-date">{`${value.created} -`}</span>
            <span className="portfolio_notion-date">{value.ended}</span>
          </div>
        </PortfolioLabel>
        <div className="portfolio_notion-tag-box">{value.tag.map(setTag)}</div>
      </div>
    </div>
  );
};

const Portfolio = ({ data }: ResponseType) => {
  return (
    <Layout>
      <div className="portfolio_inner-wrapper">
        <div className="portfolio_grid-wrapper">{data.map(PortfolioBox)}</div>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const getConvertData = (value: any) => {
    const properties = value.properties;

    return {
      title: properties.Title.title[0].text.content,
      description: properties.Description.rich_text[0].text.content,
      domain: properties.Domain.url,
      created: properties.Date.date.start,
      ended: properties.Date.date.end || "개발 중",
      tag: properties.Tag.multi_select,
      thumbnail: properties.Thumbnail.files[0].file.url,
    };
  };

  const url = `https://api.notion.com/v1/databases/${process.env.NEXT_NOTION_DATABASE_ID}/query`;
  const response = await instance.post(url, { page_size: 10 });
  const results = response.data.results;
  const data = results.map(getConvertData);

  return {
    props: {
      data: data,
    },
  };
}

export default Portfolio;
