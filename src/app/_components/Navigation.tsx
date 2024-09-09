import Link from "next/link";

const Navigation = (): React.JSX.Element => {
  return (
    <nav className="flex relative mx-16 gap-20">
      <Link
        href="/components"
        className="font-normal hover:font-semibold transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300"
      >
        Components
      </Link>
      <Link
        href="/about"
        className="font-normal hover:font-semibold transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-105 duration-300"
      >
        About
      </Link>
    </nav>
  );
};

export default Navigation;
