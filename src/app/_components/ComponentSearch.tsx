"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import FilterSideBar from "./FilterSideBar";

type ComponentSearchProps = {
  componentCategories: string[] | null;
};

const ComponentSearch = ({
  componentCategories,
}: ComponentSearchProps): React.JSX.Element => {
  const [showFilterSideBar, setShowFilterSideBar] = useState(false);

  const handleClick = () => {
    setShowFilterSideBar((prevState) => !prevState);
  };

  return (
    <>
      <FilterSideBar
        showFilterSideBarState={{ setShowFilterSideBar, showFilterSideBar }}
        componentCategories={componentCategories}
      />

      <div>
        <div
          className={`${
            showFilterSideBar
              ? "blur-3xl opacity-20 z-20  w-screen"
              : "z-0 opacity-0"
          }  bg-gray-900 transition-all absolute left-0 bottom-0 top-0 duration-300`}
        ></div>

        <div className=" flex gap-2 ">
          <button
            onClick={handleClick}
            className="border-2 rounded-lg border-gray-300 p-1"
          >
            <SlidersHorizontal />
          </button>
          <div className="rounded-lg w-full">
            <Search
              className="absolute pt-1 text-gray-400"
              width="35"
              height="30"
            />
            <input
              className="transition-all border-2 border-gray-300 rounded-lg w-full p-1 pl-10 focus:font-semibold outline-none text-black duration-150 "
              placeholder="Search for components..."
            ></input>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComponentSearch;
