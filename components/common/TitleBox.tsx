interface TitleIF {
  title: string | number;
}

const TitleBox = ({ title }: TitleIF) => {
  return (
    <div className="title-box">
      <h1 className="title-text">{title}</h1>
    </div>
  );
};

export default TitleBox;
