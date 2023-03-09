import Image from "next/image";

import { ValueType } from "@/type/portfolio";

/**
 *
 * @param value - Response로 받아온 데이터를 Map 함수를 통해 오브젝트 데이터를 전달한다.
 * @param index - key를 위한 Index 전달
 * @description PortfolioBox 컴포넌트는 노션 데이터베이스를 표기하기 위한 최상위 컴포넌트 입니다.
 * @returns
 */
const PortfolioNewBox = ({ value, index }: { value: ValueType; index: number }) => {
  const portfolioTag = value.tag.map((stack) => stack.name);

  return (
    <div className="portfolio-notion-box">
      <div className="portfolio-notion-image">
        <a href={value.domain} target="_blank" rel="noreferrer" title="포트폴리오 보러가기">
          <Image
            fill
            className={`portfolio-notion-next-image`}
            src={`${value.preview}`}
            blurDataURL={`${value.blurDataURL}`}
            placeholder="blur"
            alt={value.title}
            quality={35}
          />
        </a>
        <div className="portfolio-notion-image-status">
          <div className="portfolio-notion-image-title">{value.title}</div>
          <div className="portfolio-notion-image-tag-box">{portfolioTag.join(", ")}</div>
        </div>
      </div>
      <div className="portfolio-notion-status-box">
        <span className="portfolio-notion-status-title">{value.title}</span>
        <span className="portfolio-notion-status-description">{value.description}</span>
        <div className="portfolio-stack-list-box">
          {value.tag.map((stack, index) => (
            <div key={index} className={`portfolio-stack-icon ${stack.name}`}></div>
          ))}
        </div>
        <div className="portfolio-feature-box">
          <h2 className="portfolio-feature-title">Feature</h2>
          {value.feature.map((ft) => (
            <span className="portfolio-feature-tag">{ft.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioNewBox;
