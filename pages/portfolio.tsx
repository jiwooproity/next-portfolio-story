// Library
import moment from "moment";
import { getPlaiceholder } from "plaiceholder";
import axios, { AxiosRequestConfig } from "axios";

// Component
import { Layout, PortfolioBox } from "@/components";
import { ResponseType } from "@/type/portfolio";

const config: AxiosRequestConfig = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_NOTION_SECRETE_TOKEN}`,
    "Notion-Version": "2022-06-28",
  },
};

const instance = axios.create(config);

const Portfolio = ({ data }: ResponseType) => {
  return (
    <Layout center={false}>
      <div className="portfolio_inner-wrapper">
        <div className="portfolio_grid-wrapper">
          {data.map((value, index) => (
            <PortfolioBox key={index} value={value} index={index} />
          ))}
        </div>
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
      ended: properties.Date.date.end || moment(new Date()).format("YYYY-MM-DD"),
      tag: properties.Tag.multi_select,
      thumbnail: properties.Thumbnail.files[0].file.url,
      progress: !properties.Date.date.end,
    };
  };

  const url = `https://api.notion.com/v1/databases/${process.env.NEXT_NOTION_DATABASE_ID}/query`;
  const response = await instance.post(url, { page_size: 10 });
  const results = response.data.results;
  const data = results.map(getConvertData);

  const reBase = await Promise.all(
    data.map(async (res: any) => {
      const { base64 } = await getPlaiceholder(String(res.thumbnail));
      return { ...res, blurDataURL: base64 };
    })
  );

  return {
    props: {
      data: reBase,
    },
  };
}

export default Portfolio;
