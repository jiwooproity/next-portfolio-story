import { ValueType } from "@/type/portfolio";

const PortfolioTag = ({ value }: { value: ValueType }) => {
  const createTagList = (value: ValueType, index: number) => {
    return (
      <span className={`portfolio_notion-tag ${value.color}`} key={index}>
        {value.name}
      </span>
    );
  };

  return <div className="portfolio_notion-tag-box">{value.tag.map(createTagList)}</div>;
};

export default PortfolioTag;
