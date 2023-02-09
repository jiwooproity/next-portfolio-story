import Link from "next/link";

const Navbar = () => {
  return (
    <header className="navbar_container">
      <div className="navbar_wrapper">
        <Link className="navbar_logo" href="/">
          MY PORTFOLIO
        </Link>
        <nav>
          <ul className="navbar_menu">
            <li className="navbar_list">
              <Link href="/">홈</Link>
            </li>
            <li className="navbar_list">
              <Link href="/portfolio">포트폴리오</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
