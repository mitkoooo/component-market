"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { ImageI } from "../_ts/app-interfaces";

type ImageShowcaseProps = {
  images: ImageI[];
  options?: {
    colors?: {
      dots: string;
      arrows: string;
    };
    size?: number;
  };
};

export default function ImageShowcase({ images, options }: ImageShowcaseProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!options) options = {};

  const defaultColors = {
    arrows: "text-blue-600",
    dots: "bg-blue-600",
  };

  if (!images) images = [];
  if (!options?.colors) options.colors = defaultColors;
  if (!options?.size) options.size = 36;

  const numImages = images.length;

  const descriptions = images.map((image) => image.description);

  const handleLeftClick = () => {
    if (activeImageIndex > 0) setActiveImageIndex((prevState) => --prevState);

    if (activeImageIndex === 0) setActiveImageIndex(numImages - 1);
  };

  const handleRightClick = () => {
    if (activeImageIndex < numImages - 1)
      setActiveImageIndex((prevState) => ++prevState);

    if (activeImageIndex === numImages - 1) setActiveImageIndex(0);
  };

  return (
    <div className="flex flex-col gap-6 h-[480px] w-72">
      <div className="relative flex border-2 mx-auto w-full h-full">
        {images.map((img, i) => {
          if (!img?.src)
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
                alt={img.alt}
                src={img.src}
                quality={70}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            );
        })}
      </div>
      <p className="mx-auto h-full text-sm text-center font-light text-wrap">
        {descriptions.at(activeImageIndex)}
      </p>

      {numImages > 1 && (
        <>
          <div className="justify-center flex gap-12">
            <ChevronLeftIcon
              onClick={handleLeftClick}
              className={`transition-all ease-in-out hover:${options?.colors.arrows}`}
              size={options.size}
            />
            <ChevronRightIcon
              onClick={handleRightClick}
              className={`transition-all ease-in-out hover:${options?.colors.arrows}`}
              size={options.size}
            />
          </div>
          <div className="flex justify-center gap-2 p-3">
            {images.map((_, i) => {
              return (
                <button
                  key={i}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    activeImageIndex === i
                      ? `${options.colors?.dots} scale-125`
                      : "bg-gray-300 hover:bg-gray-400`"
                  }`}
                  onClick={() => setActiveImageIndex(i)}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
