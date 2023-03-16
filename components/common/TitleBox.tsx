import { GitHubResponseIF } from "@/type";
import Image from "next/image";

interface TitleIF {
  title: string | number;
  description: string;
  githubChart: boolean;
  todayGit: GitHubResponseIF;
}

const GitChart: Function = ({ todayGit }: { todayGit: GitHubResponseIF }): JSX.Element => {
  const { count } = todayGit;

  return (
    <div className="title-gitchart-wrapper">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <div className="title-gitchart-image-wrapper">
        <Image
          src="https://ghchart.rshah.org/219138/jiwooproity.svg"
          width={663}
          height={104}
          alt=""
          unoptimized={true}
        />
        <span className={`title-gitchart-commit-status ${count > 0 ? "complete" : "not-complete"}`}>{`1일 1커밋 ${
          count > 0 ? "완료" : "미완료"
        }`}</span>
      </div>
    </div>
  );
};

const TitleBox = ({ title, description, githubChart, todayGit }: TitleIF) => {
  return (
    <div className="title-box">
      <div className="title-wrapper">
        <h1 className="title-text">{title}</h1>
        <span className="title-subtitle">{description}</span>
      </div>
      {githubChart && <GitChart todayGit={todayGit} />}
    </div>
  );
};

export default TitleBox;

TitleBox.defaultProps = {
  githubChart: false,
};
