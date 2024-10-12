"use client";

import AppLogo from "./AppLogo";
import Navigation from "./Navigation";
import useAddStyleHeaderWithScroll from "../_hooks/useAddStyleHeaderWithScroll";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { enableBodyScroll, disableBodyScroll } from "body-scroll-lock";
import { Squeeze as Hamburger } from "hamburger-react";

const Header = (): React.JSX.Element => {
  const [isOpenBurger, setIsOpenBurger] = useState(false);
  const pathname = usePathname();
  const ref = useAddStyleHeaderWithScroll("border-b-2 border-gray-100");

  useEffect(() => {
    const burgerOpen = document.body.querySelector("#burgerOpen");

    if (!burgerOpen) return;

    if (isOpenBurger) disableBodyScroll(burgerOpen);
    else enableBodyScroll(burgerOpen);
  }, [isOpenBurger]);

  useEffect(() => {
    setIsOpenBurger(false);
  }, [pathname]);

  return (
    <header
      ref={ref}
      className="z-40 bg-white fixed top-0 w-full  transition-all duration-100 ease-in-out"
    >
      <div className="flex items-center justify-between pl-2 py-3">
        <div>
          <AppLogo height="60" width="280">
            Component market
          </AppLogo>
        </div>

        <div className="block md:hidden mr-10 ">
          <Hamburger
            size={30}
            onToggle={() => {
              setIsOpenBurger((state) => !state);
            }}
            toggled={isOpenBurger}
          />
        </div>
        <div className="hidden md:block">
          <Navigation isBurgerMenu={false} />
        </div>
      </div>
      <div
        className={`${
          isOpenBurger
            ? "h-screen opacity-100"
            : "h-0 -translate-y-96 opacity-0"
        } z-20 md:hidden border-t-2 border-gray-100 transition-opacity duration-300 ease-in-out`}
        id="burgerOpen"
      >
        <Navigation isBurgerMenu={true} />
      </div>
    </header>
  );
};

export default Header;
