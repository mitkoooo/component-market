"use client";

import useScreenWidth from "../_hooks/useScreenWidth";
import AppLogo from "./AppLogo";
import BurgerMenu from "./BurgerMenu";
import Navigation from "./Navigation";
import useAddStyleHeaderWithScroll from "../_hooks/useAddStyleHeaderWithScroll";

const Header = (): React.JSX.Element => {
  const { screenWidth } = useScreenWidth();
  const ref = useAddStyleHeaderWithScroll("border-b-2 border-gray-100");

  return (
    <header
      ref={ref}
      className="bg-white sticky top-0 w-full py-3 transition-all duration-100 ease-in-out"
    >
      <div className="flex items-center justify-between pl-2">
        <AppLogo height="60" width={screenWidth < 415 ? "230" : "330"}>
          Component market
        </AppLogo>

        {screenWidth > 680 ? <Navigation /> : <BurgerMenu />}
      </div>
    </header>
  );
};

export default Header;
