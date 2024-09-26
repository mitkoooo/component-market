"use client";

import { Plus } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

type FilterSideBarProps = {
  componentCategories: string[] | null;
  showFilterSideBarState: {
    setShowFilterSideBar: Dispatch<SetStateAction<boolean>>;
    showFilterSideBar: boolean;
  };
};

const FilterSideBar = ({
  componentCategories,
  showFilterSideBarState,
}: FilterSideBarProps): React.JSX.Element => {
  const { setShowFilterSideBar, showFilterSideBar } = showFilterSideBarState;
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();
  const pathname = usePathname();
  const [pendingFilters, setPendingFilters] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleClick = () => {
    setShowFilterSideBar(false);
  };

  const handleFilter = (): void => {
    if (componentCategories?.length === pendingFilters?.length)
      router.replace(
        `${pathname}
    `,
        { scroll: false }
      );
    else {
      params.set("category", pendingFilters.join(" "));

      router.replace(
        `${pathname}?${params.toString()}
  `,
        { scroll: false }
      );

      setActiveFilters((prevState) => [...prevState, ...pendingFilters]);
    }
    setShowFilterSideBar(false);
    setPendingFilters([]);
  };

  const handleFilterClick = (category: string) => {
    setPendingFilters((prevState) => [...prevState, category]);
  };

  const handlePendingFilterRemove = (category: string) => {
    setPendingFilters((prevState) => [
      ...prevState.filter((pendingCategory) => pendingCategory !== category),
    ]);
  };

  const handleActiveFilterRemove = () => {
    for (const filter of activeFilters) params.delete("category", filter);

    router.replace(
      `${pathname}
  `,
      { scroll: false }
    );

    setShowFilterSideBar(false);
    setActiveFilters([]);
  };

  const categoryToText = (category: string): string => {
    const isMultipleWord = category.includes("-");

    if (!isMultipleWord)
      return category.charAt(0).toUpperCase() + category.slice(1);

    const wordArr: string[] = category.split("-");
    let finalString = "";

    for (let i = 0; i < wordArr.length; i++) {
      const curWord = wordArr.at(i);

      finalString =
        finalString +
        curWord?.charAt(0)?.toUpperCase() +
        curWord?.slice(1) +
        " ";
    }
    return finalString;
  };

  useEffect(() => {
    if (showFilterSideBar) disableBodyScroll(document.body);

    if (!showFilterSideBar) enableBodyScroll(document.body);
  }, [showFilterSideBar]);

  return (
    <div
      className={`${
        !showFilterSideBar && "-translate-x-96"
      } z-30 fixed left-0 top-20 w-60 h-screen transition-all duration-300 bg-white`}
    >
      <div className="relative">
        <div className="pt-12">
          <h1 className="text-lg font-bold ml-4">Filter by type</h1>
          <ul className="ml-8 mt-8">
            {componentCategories?.map((category) => {
              const isPending = pendingFilters.includes(category);

              return (
                <li className="flex w-44 relative my-6" key={category}>
                  <button
                    className={`hover:font-medium ${
                      isPending ? "font-medium" : ""
                    }`}
                    onClick={() => {
                      isPending ? () => {} : handleFilterClick(category);
                    }}
                  >
                    {categoryToText(category)}
                  </button>
                  {isPending && (
                    <button
                      className="absolute right-8"
                      onClick={() => handlePendingFilterRemove(category)}
                    >
                      <Plus transform="rotate(45)" height={20} width={20} />
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <button className="absolute top-0 right-0 p-3" onClick={handleClick}>
          <Plus transform="rotate(45)" height={30} width={30} />
        </button>
      </div>
      <div className="flex flex-col gap-6 absolute bottom-28 left-0 right-0">
        {pendingFilters.length !== 0 ? (
          <button
            onClick={handleFilter}
            className=" bg-blue-400 rounded-full w-48 p-2 text-sm text-white font-semibold mx-auto"
          >
            Apply Selected Filters ({pendingFilters.length})
          </button>
        ) : (
          activeFilters.length !== 0 && (
            <button
              onClick={handleActiveFilterRemove}
              className="  w-48 p-2 text-sm text-gray-500 font-semibold mx-auto"
            >
              Remove filters
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default FilterSideBar;
