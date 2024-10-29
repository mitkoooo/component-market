"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Component } from "../_ts/app-interfaces";

type ImageShowcaseProps = {
  components: Component[];
};

export default function ImageShowcase({ components }: ImageShowcaseProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = components.map((component) => component.image);

  const descriptions = components.map((component) => component.description);

  const handleLeftClick = () => {
    if (activeImageIndex > 0) setActiveImageIndex((prevState) => --prevState);

    if (activeImageIndex === 0) setActiveImageIndex(2);
  };

  const handleRightClick = () => {
    if (activeImageIndex < 2) setActiveImageIndex((prevState) => ++prevState);

    if (activeImageIndex === 2) setActiveImageIndex(0);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="relative flex border-2 mx-auto w-full h-48">
        {images.map((img, i) => {
          if (img === "null")
            return (
              <p
                className={`${activeImageIndex === i ? "" : "hidden"}`}
                key={i}
              >
                Image is unavailable at the moment...
              </p>
            );
          else
            return (
              <Image
                className={`${activeImageIndex === i ? "" : "hidden"}`}
                key={i}
                alt={img}
                src={img}
                quality={100}
                fill
              />
            );
        })}
      </div>
      <p className="mx-auto w-72 h-14 text-sm text-center font-light text-wrap">
        {descriptions.at(activeImageIndex)}
      </p>

      <div className="justify-center flex gap-10 mb-4">
        <ChevronLeftIcon
          onClick={handleLeftClick}
          className="transition-all ease-in-out hover:text-blue-600"
          height="30"
          width="30"
        />
        <ChevronRightIcon
          onClick={handleRightClick}
          className="transition-all ease-in-out hover:text-blue-600"
          height="30"
          width="30"
        />
      </div>
      <div className="flex justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeImageIndex === i
                ? "bg-blue-600 scale-125"
                : "bg-gray-300 hover:bg-gray-400`"
            }`}
            onClick={() => setActiveImageIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
