"use client";

import { AlignRight, Menu } from "lucide-react";
import { useState } from "react";

const BurgerMenu = (): React.JSX.Element => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="pt-1 pr-16">
      <button
        className="transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isHovered ? (
          <AlignRight height="30" width="30" />
        ) : (
          <Menu height="30" width="30" />
        )}
      </button>
    </div>
  );
};

export default BurgerMenu;
