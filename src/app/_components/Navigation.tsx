import Link from "next/link";

const Navigation = (): React.JSX.Element => {
  const NavClass = "flex relative mx-16 gap-20";

  const LinkClass =
    "font-normal hover:font-semibold transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300";

  return (
    <nav className={NavClass}>
      <Link href="/components" className={LinkClass}>
        Components
      </Link>
      <Link href="/about" className={LinkClass}>
        About
      </Link>
    </nav>
  );
};

export default Navigation;
