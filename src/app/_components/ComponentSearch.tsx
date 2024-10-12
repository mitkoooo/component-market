"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import FilterSideBar from "./FilterSideBar";
import { SubmitHandler, useForm } from "react-hook-form";
import { useComponents } from "../_context/ComponentsContext";

type ComponentSearchProps = {
  componentCategories: string[] | null;
};

type Inputs = {
  searchInput: string;
};

const ComponentSearch = ({
  componentCategories,
}: ComponentSearchProps): React.JSX.Element => {
  const [showFilterSideBar, setShowFilterSideBar] = useState(false);
  const { register, handleSubmit } = useForm<Inputs>();
  const { components, displayedComponents, setDisplayedComponents } =
    useComponents();

  const [displayNumResults, setDisplayNumResults] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = ({ searchInput }) => {
    const newComponents = components?.filter((component) =>
      component.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    setDisplayedComponents(
      newComponents !== undefined ? newComponents : components
    );

    if (searchInput === "") setDisplayNumResults(false);
    else setDisplayNumResults(true);
  };

  const handleClick = () => {
    setShowFilterSideBar((prevState) => !prevState);
  };

  return (
    <>
      <FilterSideBar
        showFilterSideBarState={{ setShowFilterSideBar, showFilterSideBar }}
        componentCategories={componentCategories ?? []}
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("searchInput")}
                className="transition-all border-2 border-gray-300 rounded-lg w-full p-1 pl-10 focus:font-semibold outline-none text-black duration-150 "
                placeholder="Search for components..."
              ></input>
            </form>
          </div>
        </div>
        {displayNumResults && (
          <h1 className="text-center text-sm font-light mt-3">
            Found {displayedComponents?.length} results
          </h1>
        )}
      </div>
    </>
  );
};

export default ComponentSearch;
