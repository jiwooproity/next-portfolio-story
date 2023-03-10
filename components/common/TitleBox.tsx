import { GitHubResponseIF } from "@/type";
import { Dispatch, SetStateAction } from "react";

interface TitleIF {
  title: string | number;
  description: string;
  githubChart: boolean;
  todayGit: GitHubResponseIF;
}

const TitleBox = ({ title, description, githubChart, todayGit }: TitleIF) => {
  return (
    <div className="title-box">
      <div className="title-wrapper">
        <h1 className="title-text">{title}</h1>
        <span className="title-subtitle">{description}</span>
      </div>
      <div className="title-gitchart-wrapper">
        {githubChart && (
          <>
            <span className={`title-gitchart-commit-status ${todayGit.count > 0 ? "complete" : "not-complete"}`}>{`1일 1커밋 ${
              todayGit.count > 0 ? "완료" : "미완료"
            }`}</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://ghchart.rshah.org/219138/jiwooproity" alt="" />
          </>
        )}
      </div>
    </div>
  );
};

export default TitleBox;

TitleBox.defaultProps = {
  githubChart: false,
};
