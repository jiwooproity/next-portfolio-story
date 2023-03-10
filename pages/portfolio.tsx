import React, { JSXElementConstructor, ReactElement, useEffect, useState } from "react";

// Library
import moment from "moment";

import { API, CONVERT_IMAGE } from "@/request/API";
import { Layout, PortfolioNewBox, TitleBox } from "@/components";
import { GitHubResponseIF, NotionResponseIF, RequestGithubIF, RequestNotionListIF } from "@/type";

interface FilterBoxIF {
  filterList: string[];
  filterTarget: string;
  onFilter: any;
}

const FilterBox: Function = (props: FilterBoxIF): JSX.Element[] => {
  const { filterList, filterTarget, onFilter } = props;
  return filterList.map((target, index) => (
    <div
      key={index}
      className={`portfolio-stack-icon ${target} ${target === filterTarget ? "active" : ""}`}
      onClick={() => onFilter(target)}
      title={target}
    ></div>
  ));
};

const Portfolio = ({ data, todayGit }: { data: NotionResponseIF[]; todayGit: GitHubResponseIF }) => {
  const [filterData, setFilterData] = useState<NotionResponseIF[]>([]);
  const [filterTarget, setFilterTarget] = useState<string>("");
  const [filterShow, setFilterShow] = useState<boolean>(true);
  const filterList = ["HTML", "CSS", "SCSS", "Styled-Components", "JavaScript", "TypeScript", "PHP", "React", "Electron", "Next", "Svelte", "Three", "Notion"];

  const onFilter = (target: string) => {
    if (target === filterTarget) setFilterData([...data]);
    else setFilterData([...data].filter((value) => value.tag.find((f) => f.name === target)));
    setFilterTarget(target === filterTarget ? "" : target);
  };

  const onShow = () => {
    setFilterShow(!filterShow);
  };

  useEffect(() => {
    setFilterData(data);
  }, [data]);

  return (
    <Layout center={false}>
      <TitleBox title="포트폴리오" description={"나만의 웹 아이디어를 실현하는 공간입니다."} githubChart={true} todayGit={todayGit} />
      <div className="portfolio-wrapper">
        <div className={`portfolio-stack-flex-wrapper ${filterShow ? "open" : ""}`}>
          <div className="portfolio-stack-menu-button-box">
            <button className="portfolio-stack-menu-button" onClick={onShow}>
              Menu
            </button>
          </div>
          <FilterBox filterList={filterList} filterTarget={filterTarget} onFilter={onFilter} />
        </div>
        <div className="portfolio-inner-wrapper">
          {filterData.map((value, index) => (
            <PortfolioNewBox key={index} value={value} index={index} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const convertData = ({ properties, cover }: any) => {
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
      preview: cover.file.url,
      blurDataURL: properties.Thumbnail.files[0].file.url,
      progress: !properties.Date.date.end,
    };
  };

  const getTodayCommitStatus = (value: GitHubResponseIF) => {
    return moment(new Date()).format("YYYY-MM-DD") === moment(value.date).format("YYYY-MM-DD");
  };

  const getImages = ({ blurDataURL }: any) => {
    return String(blurDataURL);
  };

  // 파라미터 작성
  const data: RequestNotionListIF = { page_size: 15, sorts: [{ property: "Date", direction: "descending" }] };
  const params: RequestGithubIF = { y: "2023" };
  // 1: Notion 데이터 호출 / 2: GitHub 데이터 호출
  const [{ data: notion }, { data: github }] = await Promise.all([API.getNotionList({ data }), API.getGithubHistory({ params })]);
  // Notion 데이터베이스 값 추출
  const convert = notion.results.map(convertData);
  // 금일 깃 커밋 여부 확인
  const convertGit = github.contributions.find(getTodayCommitStatus);

  // Blur 처리를 위한 Base64 Image 변환 ( for Next/Image )
  const blurDataUrls = await CONVERT_IMAGE.MULTIE({ imageUrls: convert.map(getImages) });
  const sendRes = convert.map((data: NotionResponseIF, index: number) => {
    return { ...data, blurDataURL: blurDataUrls[index] };
  });

  return {
    props: {
      data: sendRes,
      todayGit: convertGit,
    },
    revalidate: 1,
  };
}

export default Portfolio;
