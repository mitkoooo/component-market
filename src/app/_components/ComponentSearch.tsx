"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import FilterSideBar from "./FilterSideBar";
import { SubmitHandler, useForm } from "react-hook-form";
import { useComponents } from "../_context/ComponentsContext";

type Inputs = {
  searchInput: string;
};

const ComponentSearch = (): React.JSX.Element => {
  const [showFilterSideBar, setShowFilterSideBar] = useState(false);
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const { components, setDisplayedComponents } = useComponents();

  const onSubmit: SubmitHandler<Inputs> = ({ searchInput }) => {
    if (!searchInput) return;

    const newComponents = components?.filter((component) =>
      component.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    setDisplayedComponents(
      newComponents !== undefined ? newComponents : components
    );

    reset();
  };

  const handleClick = () => {
    setShowFilterSideBar((prevState) => !prevState);
  };

  return (
    <>
      <FilterSideBar
        showFilterSideBarState={{ setShowFilterSideBar, showFilterSideBar }}
      />

      <div>
        <div
          className={`${
            showFilterSideBar
              ? "blur-3xl opacity-20 z-20  w-screen"
              : "z-0 opacity-0"
          }  bg-gray-900 transition-all absolute left-0 bottom-0 top-0 duration-300`}
        ></div>

        <div className="flex gap-3 mx-2 sm:mx-8 ">
          <button
            onClick={handleClick}
            className="border border-black border-opacity-15 text-black text-opacity-85 rounded-sm p-1"
          >
            <SlidersHorizontal />
          </button>
          <div className="rounded-sm w-full">
            <Search
              className="absolute pt-1 text-black text-opacity-85 "
              width="35"
              height="30"
            />
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("searchInput")}
                className="border border-black border-opacity-15 rounded-sm w-full p-1 pl-10 outline-none text-black "
                placeholder="Search for components..."
              ></input>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComponentSearch;
