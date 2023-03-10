// Library
import moment from "moment";

// Component
import { Layout, PortfolioNewBox, TitleBox } from "@/components";
import { ResponseType } from "@/type/portfolio";
import { API, CONVERT_IMAGE } from "@/request/API";

const Portfolio = ({ data }: ResponseType) => {
  return (
    <Layout center={false}>
      <TitleBox title="포트폴리오" description={"나만의 웹 아이디어를 실현하는 공간입니다."} githubChart={true} />
      <div className="portfolio-wrapper">
        <div className="portfolio-inner-wrapper">
          {data.map((value, index) => (
            <PortfolioNewBox key={index} value={value} index={index} />
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
      background: properties.Background.rich_text[0].text.content,
      description: properties.Description.rich_text[0].text.content,
      domain: properties.Domain.url,
      github: properties.GitHub.url,
      created: properties.Date.date.start,
      ended: properties.Date.date.end || moment(new Date()).format("YYYY-MM-DD"),
      tag: properties.Tag.multi_select,
      feature: properties.Feature.multi_select,
      preview: properties.Thumbnail.files[1]
        ? properties.Thumbnail.files[1].file.url
        : properties.Thumbnail.files[0].file.url,
      blurDataURL: properties.Thumbnail.files[0].file.url,
      progress: !properties.Date.date.end,
    };
  };

  const getImages = ({ blurDataURL }: any) => {
    return String(blurDataURL);
  };

  // 파라미터 작성
  const params_1 = { page_size: 15, sorts: [{ property: "Date", direction: "descending" }] };
  const params_2 = { y: "2023" };
  // 1: Notion 데이터 호출 / 2: 필요한 데이터 추출
  const [response_1, response_2] = await Promise.all([
    API.getNotionList({ params: params_1 }),
    API.getGithubHistory({ params: params_2 }),
  ]);

  const convert = response_1.map(convertData);

  // Blur 처리를 위한 Base64 Image 변환 ( for Next/Image )
  const blurDataUrls = await CONVERT_IMAGE.MULTIE({ imageUrls: convert.map(getImages) });
  const sendRes = convert.map((data: any, index: number) => {
    return { ...data, blurDataURL: blurDataUrls[index] };
  });

  return {
    props: {
      data: sendRes,
    },
    revalidate: 1,
  };
}

export default Portfolio;
