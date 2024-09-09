"use client";

import useScreenWidth from "../_hooks/useScreenWidth";
import AppLogo from "./AppLogo";
import BurgerMenu from "./BurgerMenu";
import Navigation from "./Navigation";

const Header = (): React.JSX.Element => {
  const { screenWidth } = useScreenWidth();

  return (
    <header className="py-3 border-b-2 border-gray-200">
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
