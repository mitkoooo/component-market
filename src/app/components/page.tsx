import { Search, SlidersHorizontal } from "lucide-react";
import ComponentCard from "../_components/ComponentCard";

const Page = (): React.JSX.Element => {
  return (
    <div className="font-sans">
      <div className="mx-2 flex gap-2 my-4 sm:mx-12 md:mx-32 lg:mx-48">
        <button className="border-2 rounded-lg border-gray-300 p-1">
          <SlidersHorizontal />
        </button>
        <div className="rounded-lg w-full">
          <Search
            className="absolute pt-1 text-gray-400"
            width="35"
            height="30"
          />
          <input
            className="transition-all border-2 border-gray-300 rounded-lg w-full p-1 pl-10 focus:font-semibold outline-none text-black "
            placeholder="Search for components..."
          ></input>
        </div>
      </div>
      <div className="">
        <ComponentCard />
        <ComponentCard />
        <ComponentCard />
        <ComponentCard />
        <ComponentCard />
        <ComponentCard />
      </div>
    </div>
  );
};

export default Page;
