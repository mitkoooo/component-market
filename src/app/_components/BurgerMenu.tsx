"use client";

import { AlignRight, Menu, Kanban, ChartNoAxesColumn } from "lucide-react";
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
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="z-10 relative h-[30px] w-[30px] mt-1 mr-14 overflow-hidden bg-white"
    >
      <span
        className={` absolute top-0 right-1 left-0 bottom-0 transition ease-in-out duration-500 origin-right ${
          isHovered ? "" : "[transform:rotateY(90deg)]"
        }`}
      >
        <Kanban height="30" width="30" transform="rotate(-90) scale(1,-1)" />
      </span>

      <span
        className={`absolute top-0 right-2 left-0 bottom-0 ease-in-out duration-500 origin-right  ${
          isHovered ? "[transform:rotateY(90deg)]" : ""
        }`}
      >
        <ChartNoAxesColumn height="30" width="30" transform="rotate(-90)" />
      </span>
    </button>
  );
};

export default BurgerMenu;
