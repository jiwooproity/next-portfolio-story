interface TitleIF {
  title: string | number;
  description: string;
}

const TitleBox = ({ title, description }: TitleIF) => {
  return (
    <div className="title-box">
      <h1 className="title-text">{title}</h1>
      <span className="title-subtitle">{description}</span>
    </div>
  );
};

export default TitleBox;
