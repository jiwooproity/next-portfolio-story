import moment from "moment";

import { LabelPropsType } from "@/type/portfolio";

const PortfolioLabel = ({ value, label }: LabelPropsType) => {
  const getContent = (label: string) => {
    switch (label) {
      case "title":
        return <h1 className="portfolio_notion-title">{value.title}</h1>;
      case "description":
        return <span className="portfolio_notion-description">{value.description}</span>;
      case "date":
        const startDay = value.created;
        const endDay = value.ended;
        const diffDate = moment(endDay).diff(moment(startDay), "days");

        return (
          <div className="portfolio_notion-date-box">
            <span className="portfolio_notion-date">{`${startDay} -`}</span>
            <span className="portfolio_notion-date">{value.progress ? "개발 중" : endDay}</span>
            <span className="portfolio_notion-date diff">{`+ ${diffDate} Days`}</span>
          </div>
        );
      default:
        break;
    }
  };

  return (
    <div className="portfolio_notion-label-box">
      <span className={`portfolio_notion-label ${label}`} />
      {getContent(label)}
    </div>
  );
};

export default PortfolioLabel;
