import Footer from "./Footer";

type ChildrenProps = {
  children: React.ReactNode;
  center: boolean;
};

const Container = ({ children, center }: ChildrenProps) => {
  return (
    <>
      <div className="main_container" style={center ? { alignItems: "center" } : {}}>
        <div className="main_wrapper">{children}</div>
      </div>
    </>
  );
};

export default Container;
