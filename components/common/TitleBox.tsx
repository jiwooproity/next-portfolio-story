interface TitleIF {
  title: string | number;
  description: string;
  githubChart: boolean;
}

const TitleBox = ({ title, description, githubChart }: TitleIF) => {
  return (
    <div className="title-box">
      <div className="title-wrapper">
        <h1 className="title-text">{title}</h1>
        <span className="title-subtitle">{description}</span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {githubChart && <img src="https://ghchart.rshah.org/219138/jiwooproity" alt="" />}
    </div>
  );
};

export default TitleBox;

TitleBox.defaultProps = {
  githubChart: false,
};
