// Library
import moment from "moment";

// Component
import { Layout, PortfolioBox } from "@/components";
import { ResponseType } from "@/type/portfolio";
import { API, CONVERT_IMAGE } from "@/request/API";

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
  const convertData = ({ properties }: any) => {
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

  const getImages = ({ thumbnail }: any) => {
    return String(thumbnail);
  };

  // 파라미터 작성
  const params = { page_size: 10, sorts: [{ property: "Date", direction: "descending" }] };
  // 1: Notion 데이터 호출 / 2: 필요한 데이터 추출
  const response = await API.getNotionList({ params });
  const convert = response.map(convertData);

  // Blur 처리를 위한 Base64 Image 변환 ( for Next/Image )
  const blurDataUrls = await CONVERT_IMAGE.MULTIE({ imageUrls: convert.map(getImages) });
  const sendRes = convert.map((data: any, index: number) => {
    return { ...data, blurDataURL: blurDataUrls[index] };
  });

  return {
    props: {
      data: sendRes,
    },
  };
}

export default Portfolio;
