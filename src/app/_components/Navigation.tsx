import Link from "next/link";
import Footer from "./Footer";

type NavigationProps = {
  isBurgerMenu: boolean;
};

const Navigation = ({ isBurgerMenu }: NavigationProps): React.JSX.Element => {
  const NavClass = isBurgerMenu
    ? "flex flex-col relative items-center mx-auto mt-20 gap-20"
    : "flex relative mx-16 gap-20";

  const LinkClass = isBurgerMenu
    ? "text-xl font-normal hover:font-semibold transition ease-in-out delay-15  duration-300"
    : "font-normal hover:font-semibold transition ease-in-out delay-15  duration-300 py-1 px-1";

  return (
    <nav className={NavClass}>
      <Link href="/components" className={LinkClass}>
        Components
      </Link>
      <Link href="/about" className={LinkClass}>
        About
      </Link>
      <div className="md:hidden fixed bottom-0 mb-1">
        <Footer />
      </div>
    </nav>
  );
};

export default Navigation;
