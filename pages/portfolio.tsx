import { Layout } from "@/components";
import axios, { AxiosRequestConfig } from "axios";

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

const PortfolioBox = (value: any, index: number) => {
  return (
    <div className="portfolio_notion-box" key={index}>
      <div className="portfolio_notion-image">
        <img className="portfolio_notion-thumbnail" src={`${value.thumbnail}`} alt={value.title} />
      </div>
      <h1 className="portfolio_notion-title">{value.title}</h1>
      <span className="portfolio_notion-description">{value.description}</span>
    </div>
  );
};

const Portfolio = ({ data }: ResponseType) => {
  console.log(data);
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
      domain: properties.Domain,
      created: properties.Date.date.start,
      ended: properties.Date.date.end,
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
