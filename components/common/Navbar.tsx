import Link from "next/link";

const Navbar = () => {
  return (
    <header className="navbar_container">
      <div className="navbar_wrapper">
        <Link href="/" className="navbar_logo">
          MY PORTFOLIO
        </Link>
        <ul className="navbar_menu">
          <li className="navbar_list">홈{/* <Link href={"/home"}>HOME</Link> */}</li>
          <li className="navbar_list">프로젝트</li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
