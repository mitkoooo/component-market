"use client";
import { Leaf } from "lucide-react";
import Link from "next/link";
import useAddStyleHeaderWithScroll from "./_hooks/useAddStyleHeaderWithScroll";

export default function Page() {
  const ref = useAddStyleHeaderWithScroll("border-b-2 border-gray-100");

  return (
    <div ref={ref} className="h-screen font-sans">
      <div className="mx-auto pt-10 sm:pt-26 md:pt-44 max-w-4xl  text-center w-full">
        <h1 className="text-4xl sm:text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 pb-1 mb-6">
          Home-grown components
        </h1>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          ready for consumption
        </h2>
        <div className="flex justify-center items-center space-x-2 text-green-700 font-mono">
          <Leaf className="w-6 h-6" />
          <p className="text-lg sm:text-xl font-semibold">
            Fresh from our digital fields
          </p>
          <Leaf className="w-6 h-6" />
        </div>
      </div>

      <div className="flex justify-center  text-[#005b90] mx-auto my-20">
        <Link
          href="/about"
          className="text-lg font-semibold hover:font-bold transition ease-in-out hover:-translate-y-1 delay-15 duration-300"
        >
          <span>Learn more</span>
        </Link>
      </div>
    </div>
  );
}
