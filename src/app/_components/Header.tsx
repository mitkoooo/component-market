"use client";

import AppLogo from "./AppLogo";
import BurgerMenu from "./BurgerMenu";
import Navigation from "./Navigation";
import useAddStyleHeaderWithScroll from "../_hooks/useAddStyleHeaderWithScroll";
import { useState } from "react";

const Header = (): React.JSX.Element => {
  const [isOpenBurger, setIsOpenBurger] = useState(false);
  const ref = useAddStyleHeaderWithScroll("border-b-2 border-gray-100");

  return (
    <header
      ref={ref}
      className="bg-white sticky top-0 w-full py-3 transition-all duration-100 ease-in-out"
    >
      <div className="flex items-center justify-between pl-2">
        <div>
          <AppLogo height="60" width="280">
            Component market
          </AppLogo>
        </div>

        <div className="block md:hidden mt-1 mr-10 ">
          <BurgerMenu
            isOpenBurger={isOpenBurger}
            onIsOpenBurger={setIsOpenBurger}
          />
        </div>
        <div className="hidden md:block">
          <Navigation />
        </div>
      </div>
    </header>
  );
};

export default Header;
