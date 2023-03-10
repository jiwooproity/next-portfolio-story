import Image from "next/image";

import PortfolioLabel from "./PortfolioLabel";
import PortfolioTag from "./PortfolioTag";

import { ValueType } from "@/type/portfolio/portfolioInterface";

/**
 *
 * @param value - Response로 받아온 데이터를 Map 함수를 통해 오브젝트 데이터를 전달한다.
 * @param index - key를 위한 Index 전달
 * @description PortfolioBox 컴포넌트는 노션 데이터베이스를 표기하기 위한 최상위 컴포넌트 입니다.
 * @returns
 */
const PortfolioBox = ({ value, index }: { value: ValueType; index: number }) => {
  return (
    <div className="portfolio_notion-box" key={index}>
      <div className="portfolio_notion-image">
        <a href={value.domain} target="_blank" rel="noreferrer" title="포트폴리오 보러가기">
          <Image
            fill
            className="portfolio_notion-thumbnail"
            src={`${value.preview}`}
            blurDataURL={`${value.blurDataURL}`}
            placeholder="blur"
            alt={value.title}
            quality={35}
          />
        </a>
        <div className={`portfolio_notion-dark-filter`}>
          <a href={value.github} className={`portfolio_notion-github-url ${value.background}`} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>
      <div className="portfolio_notion-description-box">
        <PortfolioLabel label="title" value={value} />
        <PortfolioLabel label="description" value={value} />
        <PortfolioLabel label="date" value={value} />
        <PortfolioTag value={value} />
      </div>
    </div>
  );
};

export default PortfolioBox;
