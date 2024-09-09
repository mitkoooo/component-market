import { getYear } from "date-fns";
import GithubLogo from "./GithubLogo";
import Link from "next/link";

const Footer = (): React.JSX.Element => {
  return (
    <footer className="flex justify-center h-10 w-full text-gray-500">
      <ul className="py-auto mx-9 my-1 justify-center  font-extralight flex gap-6">
        <li className="py-1">©{getYear(new Date())} by Vadim Mitko </li>
        <li>
          <Link href="https://github.com/mitkoooo">
            <GithubLogo height="32" width="32" />
          </Link>
        </li>
      </ul>
    </footer>
  );
};
export default Footer;
