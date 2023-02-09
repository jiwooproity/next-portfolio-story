import Footer from "./Footer";

type ChildrenProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ChildrenProps) => {
  return (
    <>
      <div className="main_container">
        <div className="main_wrapper">{children}</div>
      </div>
    </>
  );
};

export default Container;
