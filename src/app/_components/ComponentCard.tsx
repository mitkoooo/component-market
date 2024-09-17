"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Component } from "../_ts/app-interfaces";

type ComponentCardProps = {
  component: Component;
};

const ComponentCard = ({
  component,
}: ComponentCardProps): React.JSX.Element => {
  const [isHovered, setIsHovered] = useState(false);
  const { id, name, image, description } = component;

  const handleMouseEnter = (): void => {
    setIsHovered(true);
  };

  const handleMouseLeave = (): void => {
    setIsHovered(false);
  };

  return (
    <Link href={`/components/${id}`}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-xl overflow-hidden border-2 border-gray-200 h-72 w-72 mx-auto"
      >
        <h1
          className={`z-10 pt-1 rounded-t-lg top-0 text-center font-semibold absolute bg-white  w-full h-8 ${
            isHovered ? "opacity-90" : "opacity-70"
          } transition-opacity`}
        >
          {name}
        </h1>
        <Image
          className="rounded-lg hover:scale-110 transition-all duration-500"
          alt="joeyy"
          fill
          src={image}
        />

        <p
          className={`absolute bottom-0 text-center font-base rounded-b-lg w-full bg-white transition-opacity duration-300 ${
            isHovered ? "opacity-70" : "opacity-0"
          }`}
        >
          {description}
        </p>
      </div>
    </Link>
  );
};

export default ComponentCard;
