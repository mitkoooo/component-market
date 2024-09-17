"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface ImageData {
  src: string;
  alt: string;
  description: string;
}

export default function ImageShowCase() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleLeftClick = () => {
    if (activeImageIndex > 0) setActiveImageIndex((prevState) => --prevState);

    if (activeImageIndex === 0) setActiveImageIndex(2);
  };

  const handleRightClick = () => {
    if (activeImageIndex < 2) setActiveImageIndex((prevState) => ++prevState);

    if (activeImageIndex === 2) setActiveImageIndex(0);
  };

  const images: ImageData[] = [
    {
      src: "/japan-2.jpg",
      alt: "1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus inenim ac erat tristique volutpat ut a erat. 1",
    },
    {
      src: "/japan.jpg",
      alt: "2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus inenim ac erat tristique volutpat ut a erat. 2",
    },
    {
      src: "/joeyy.jpeg",
      alt: "3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus inenim ac erat tristique volutpat ut a erat. 3",
    },
    {
      src: "",
      alt: "4",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus inenim ac erat tristique volutpat ut a erat. 4",
    },
    {
      src: "",
      alt: "5",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus inenim ac erat tristique volutpat ut a erat. 5",
    },
    {
      src: "",
      alt: "6",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus inenim ac erat tristique volutpat ut a erat. 6",
    },
    {
      src: "",
      alt: "7",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus inenim ac erat tristique volutpat ut a erat. 7",
    },
  ];

  const randomImages = images.slice(0, 3);

  console.log(randomImages);

  return (
    <div className="flex flex-col gap-8">
      <div className="relative flex border-2 mx-auto w-full h-48">
        {randomImages.map((img, i) => (
          <Image
            className={`${activeImageIndex === i ? "" : "hidden"}`}
            key={i}
            alt={img.alt}
            src={img.src}
            quality={20}
            fill
          />
        ))}
      </div>
      <p className="mx-auto w-72 text-sm text-center font-light text-wrap">
        {randomImages.at(activeImageIndex)?.description}
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
        {randomImages.map((_, i) => (
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
