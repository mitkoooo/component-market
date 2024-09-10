"use client";

type BurgerMenuProps = {
  isOpenBurger: boolean;
  onIsOpenBurger: React.Dispatch<React.SetStateAction<boolean>>;
};

import { Kanban, ChartNoAxesColumn, Plus } from "lucide-react";
import { useState } from "react";

const BurgerMenu = ({
  isOpenBurger,
  onIsOpenBurger,
}: BurgerMenuProps): React.JSX.Element => {
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
      onClick={() => onIsOpenBurger((state) => !state)}
      className="z-10 relative h-[30px] w-[30px] overflow-hidden  bg-white"
    >
      <span
        className={` absolute top-0 right-0 left-0 bottom-0 transition ease-in-out duration-150 origin-top-left ${
          isOpenBurger ? "" : "-rotate-90"
        }`}
      >
        <Plus height="30" width="30" transform="rotate(45)" />
      </span>

      <span
        className={` absolute top-0  right-1 left-0 bottom-0 transition ease-in-out  origin-right ${
          isHovered && !isOpenBurger
            ? "duration-500"
            : "duration-500 [transform:rotateY(90deg)]"
        } ${isOpenBurger ? "duration-75" : ""}`}
      >
        <Kanban height="30" width="30" transform="rotate(-90) scale(1,-1)" />
      </span>

      <span
        className={`absolute duration-500 top-0 right-2 left-0 bottom-0 ease-in-out  origin-right  ${
          isHovered || isOpenBurger ? "[transform:rotateY(90deg)]" : ""
        }`}
      >
        <ChartNoAxesColumn height="30" width="30" transform="rotate(-90)" />
      </span>
    </button>
  );
};

export default BurgerMenu;
