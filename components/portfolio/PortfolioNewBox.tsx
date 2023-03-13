import Image from "next/image";
import { useEffect, useState } from "react";
import moment from "moment";

import { NotionResponseIF } from "@/type";

/**
 *
 * @param value - Response로 받아온 데이터를 Map 함수를 통해 오브젝트 데이터를 전달한다.
 * @param index - key를 위한 Index 전달
 * @description PortfolioBox 컴포넌트는 노션 데이터베이스를 표기하기 위한 최상위 컴포넌트 입니다.
 * @returns
 */
const PortfolioNewBox = ({ value, index }: { value: NotionResponseIF; index: number }) => {
  const [portfolioTags, setPortfolioTags] = useState<string[]>([]);
  const [progressStatus, setProgressStatus] = useState<boolean>(false);

  useEffect(() => {
    setPortfolioTags(value.tag.map((stack) => stack.name));
    setTimeout(() => {
      setProgressStatus(value.progress);
    }, 100);
  }, [value]);

  return (
    <div className="portfolio-notion-box">
      <div className="portfolio-notion-image">
        <a href={value.domain} target="_blank" rel="noreferrer" title="포트폴리오 보러가기">
          <Image
            width={600}
            height={338}
            className={`portfolio-notion-next-image`}
            src={`${value.preview}`}
            blurDataURL={`${value.blurDataURL}`}
            alt={value.title}
            sizes={"600px"}
            placeholder="blur"
            quality={100}
          />
        </a>
        <div className="portfolio-notion-image-status">
          <div className="portfolio-notion-image-title">{value.title}</div>
          <div className="portfolio-notion-image-tag-box">{portfolioTags.join(", ")}</div>
        </div>
      </div>
      <div className="portfolio-notion-status-box">
        <span className="portfolio-notion-status-title">
          {value.title}
          <div className="portfolio-notion-switch-wrapper ">
            <span className="portfolio-notion-develop-status">IN-PROGRESS</span>
            <div
              className={`portfolio-notion-develop-switch ${progressStatus ? "on-switch" : "off-switch"}`}
              title={progressStatus ? "개발 중" : "배포 중"}
            >
              <div className={`portfolio-notion-switch-button ${progressStatus ? "on" : "off"}`}></div>
            </div>
          </div>
        </span>
        <span className="portfolio-notion-status-description">{value.description}</span>
        <div className="portfolio-notion-status-date-box">
          <span className="portfolio-notion-status-date" title={`${value.created} ~ ${value.ended}`}>
            {`+ ${moment(value.ended).diff(moment(value.created), "days")} Days`}
          </span>
        </div>
        <div className="portfolio-stack-list-box">
          {value.tag.map((stack, index) => (
            <div
              key={index}
              className={`portfolio-stack-icon ${stack.name.replace(".js", "")}`}
              title={stack.name}
            ></div>
          ))}
        </div>
        <div className="portfolio-feature-box">
          <h2 className="portfolio-feature-title">Feature</h2>
          {value.feature.length ? (
            value.feature.map((ft, index) => (
              <span key={index} className="portfolio-feature-tag">
                {`+ ${ft.name}`}
              </span>
            ))
          ) : (
            <span className="portfolio-feature-tag">{"- NONE"}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioNewBox;
