"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ComponentCard = (): React.JSX.Element => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (): void => {
    setIsHovered(true);
  };

  const handleMouseLeave = (): void => {
    setIsHovered(false);
  };

  return (
    <Link href="/">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-xl overflow-hidden border-2 border-gray-200 h-72 w-72 mx-auto"
      >
        <h1
          className={`z-10 rounded-t-lg top-0 text-center font-semibold absolute bg-white  w-full h-8 ${
            isHovered ? "opacity-90" : "opacity-70"
          } transition-opacity`}
        >
          Joeyy component
        </h1>
        <Image
          className="rounded-lg hover:scale-110 transition-all duration-500"
          alt="joeyy"
          fill
          src="/joeyy.jpeg"
        />

        <p
          className={`absolute bottom-0 text-center font-base rounded-b-lg w-full bg-white transition-opacity duration-300 ${
            isHovered ? "opacity-70" : "opacity-0"
          }`}
        >
          Sed quis arcu eget nisi tempor consequat. Proin ac diam vitae dolor
          lobortis tempus in vel est.
        </p>
      </div>
    </Link>
  );
};

export default ComponentCard;
