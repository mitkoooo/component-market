"use client";

import { useEffect, useRef, useState } from "react";
import useScreenWidth from "../_hooks/useScreenWidth";
import AppLogo from "./AppLogo";
import BurgerMenu from "./BurgerMenu";
import Navigation from "./Navigation";

const Header = (): React.JSX.Element => {
  const { screenWidth } = useScreenWidth();

  return (
    <header className="bg-white sticky top-0 w-full py-3 transition-all duration-100 ease-in-out">
      <div className="flex items-center justify-between">
        <AppLogo height="60" width="330">
          Component market
        </AppLogo>

        {screenWidth > 680 ? <Navigation /> : <BurgerMenu />}
      </div>
    </header>
  );
};

export default Header;
