"use client";

import useScreenWidth from "../_hooks/useScreenWidth";
import AppLogo from "./AppLogo";
import BurgerMenu from "./BurgerMenu";
import Navigation from "./Navigation";
import useAddStyleHeaderWithScroll from "../_hooks/useAddStyleHeaderWithScroll";
import { useState } from "react";

const Header = (): React.JSX.Element => {
  const { screenWidth } = useScreenWidth();
  const isSmallScreen: boolean = screenWidth < 680;
  const [isOpenBurger, setIsOpenBurger] = useState(false);
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

        {isSmallScreen ? (
          <BurgerMenu
            isOpenBurger={isOpenBurger}
            onIsOpenBurger={setIsOpenBurger}
          />
        ) : (
          <Navigation />
        )}
      </div>
    </header>
  );
};

export default Header;
