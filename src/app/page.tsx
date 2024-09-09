import { Leaf } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen h-full font-sans">
      <div className="pt-20 sm:pt-28 max-w-4xl mx-auto text-center">
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
