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
      className="z-10 relative h-[30px] w-[30px] overflow-hidden"
    >
      <span
        className={` absolute top-0 right-0 left-0 bottom-0 transition-all ease-in-out duration-150 ${
          isOpenBurger ? "" : "[transform:rotateX(90deg)]"
        }`}
      >
        <Plus height="30" width="30" transform="rotate(45)" />
      </span>
      <div
        className={`${
          isOpenBurger
            ? " transition-all ease-in-out duration-75 [transform:rotateX(90deg)]"
            : ""
        }`}
      >
        <span
          className={` absolute top-0  right-2 left-0 bottom-0 transition-all ease-in-out  origin-right ${
            isHovered && !isOpenBurger
              ? ""
              : `duration-500 [transform:rotateY(90deg)]`
          } ${isOpenBurger ? "duration-75" : ""}`}
        >
          <Kanban height="30" width="30" transform="rotate(-90) scale(1,-1)" />
        </span>

        {!isOpenBurger && (
          <span
            className={`absolute duration-500 top-0 right-3 left-0 transition-all bottom-0 ease-in-out  origin-right  ${
              isHovered ? "[transform:rotateY(90deg)]" : ""
            }`}
          >
            <ChartNoAxesColumn height="30" width="30" transform="rotate(-90)" />
          </span>
        )}
      </div>
    </button>
  );
};

export default BurgerMenu;
