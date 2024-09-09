import Link from "next/link";
import { LogoProps } from "../_ts/app-interfaces";

interface AppLogoProps extends LogoProps {
  children: string;
} /* use `interface` if exporting so that consumers can extend */

const AppLogo = ({
  children,
  width,
  height,
}: AppLogoProps): React.JSX.Element => {
  return (
    <Link href="/">
      <svg
        width={width}
        height={height}
        viewBox="0 0 220 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Farmhouse */}
        <path d="M15 30V20L20 15L25 20V30H15Z" fill="#FF0000" />
        <path d="M13 20L20 13L27 20" stroke="black" strokeWidth="2" />
        {/* Silo */}
        <rect x="28" y="17" width="6" height="13" fill="#808080" />
        <path
          d="M28 17C28 15 31 13 31 13C31 13 34 15 34 17"
          fill="#808080"
          stroke="#808080"
          strokeWidth="2"
        />
        {/* Fence */}
        <path d="M10 30H35" stroke="#8B4513" strokeWidth="2" />
        <path d="M12 27V33" stroke="#8B4513" strokeWidth="2" />
        <path d="M17 27V33" stroke="#8B4513" strokeWidth="2" />
        <path d="M22 27V33" stroke="#8B4513" strokeWidth="2" />
        <path d="M27 27V33" stroke="#8B4513" strokeWidth="2" />
        <path d="M32 27V33" stroke="#8B4513" strokeWidth="2" />
        {/* Tree */}
        <rect x="37" y="25" width="2" height="5" fill="#8B4513" />{" "}
        {/* Tree trunk */}
        <path d="M34 25C34 25 38 15 42 25 Z" fill="#228B22" />{" "}
        {/* Tree foliage */}
        {/* Text */}
        <text x="45" y="25" fontFamily="monospace" fontSize="14" fill="black">
          {children}
        </text>
      </svg>
    </Link>
  );
};

export default AppLogo;
