"use client";

import AppLogo from "./AppLogo";
import BurgerMenu from "./BurgerMenu";
import Navigation from "./Navigation";
import useAddStyleHeaderWithScroll from "../_hooks/useAddStyleHeaderWithScroll";
import { useState } from "react";
import BurgerOpen from "./BurgerOpen";
const bodyScrollLock = require("body-scroll-lock");

const Header = (): React.JSX.Element => {
  const [isOpenBurger, setIsOpenBurger] = useState(false);
  const ref = useAddStyleHeaderWithScroll("border-b-2 border-gray-100");

  const burgerOpen = document.body.querySelector("#burgerOpen");

  if (isOpenBurger) bodyScrollLock.disableBodyScroll(burgerOpen);
  else bodyScrollLock.enableBodyScroll(burgerOpen);

  return (
    <header
      ref={ref}
      className="bg-white fixed top-0 w-full pt-3 transition-all duration-100 ease-in-out"
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
          <Navigation isBurgerMenu={false} />
        </div>
      </div>
      <div id="burgerOpen">
        <BurgerOpen
          className={`${
            isOpenBurger ? "h-screen" : "h-0 opacity-0"
          } z-20 md:hidden border-t-2 border-gray-100 transition-all duration-300 ease-in-out`}
        />
      </div>
    </header>
  );
};

export default Header;
