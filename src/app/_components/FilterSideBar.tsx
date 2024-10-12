"use client";

import { Plus } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FilterSideBarProps = {
  componentCategories: string[];
  showFilterSideBarState: {
    setShowFilterSideBar: Dispatch<SetStateAction<boolean>>;
    showFilterSideBar: boolean;
  };
};

const categoryToText = (category: string): string => {
  const isMultipleWord = category.includes("-");

  if (!isMultipleWord)
    return category.charAt(0).toUpperCase() + category.slice(1);

  const wordArr: string[] = category.split("-");
  let finalString = "";

  for (const curWord of wordArr) {
    finalString =
      finalString + curWord?.charAt(0)?.toUpperCase() + curWord?.slice(1) + " ";
  }
  return finalString;
};

const FilterSideBar = ({
  componentCategories,
  showFilterSideBarState,
}: FilterSideBarProps): React.JSX.Element => {
  const categories = Object.fromEntries(
    componentCategories?.map((category) => [category, category])
  );

  const { setShowFilterSideBar, showFilterSideBar } = showFilterSideBarState;

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();
  const pathname = usePathname();

  const { register, handleSubmit, reset } = useForm<typeof categories>();

  const [pendingFilters, setPendingFilters] = useState<string[]>([]);

  const hasParams = params.get("category") === null ? false : true;

  const onSubmit: SubmitHandler<typeof categories> = (data) => {
    const activeFilters = [];
    let toastMessage = "";

    for (const filter of Object.keys(data)) {
      if (data[filter]) activeFilters.push(filter);
    }

    if (
      componentCategories?.length === activeFilters?.length ||
      activeFilters.length === 0
    ) {
      router.replace(
        `${pathname}
    `,
        { scroll: false }
      );
      toastMessage = "Filters successfully removed";
    } else {
      params.set("category", activeFilters.join(" "));

      router.replace(
        `${pathname}?${params.toString()}
  `,
        { scroll: false }
      );
      toastMessage = "Filters successfully applied";
    }
    setShowFilterSideBar(false);
    setPendingFilters([]);
    toast.success(toastMessage, {
      duration: 2000,
    });
    reset();
  };

  const handleClick = () => {
    setShowFilterSideBar(false);
  };

  const handlePendingFilterRemove = (category: string) => {
    setPendingFilters((prevState) => [
      ...prevState.filter((pendingCategory) => pendingCategory !== category),
    ]);
  };

  const handlePendingFilterAdd = (category: string) => {
    setPendingFilters((prevState) => [...prevState, category]);
  };

  useEffect(() => {
    if (showFilterSideBar) disableBodyScroll(document.body);

    if (!showFilterSideBar) enableBodyScroll(document.body);
  }, [showFilterSideBar]);

  useEffect(() => {
    const handleClick = (e: Event) => {
      const targetEl = e.target as Element;

      const filterSideBar = document.body.querySelector("#filter-side-bar");

      if (!filterSideBar?.contains(targetEl)) setShowFilterSideBar(false);
    };

    if (showFilterSideBar) document.body.addEventListener("click", handleClick);

    return () => document.body.removeEventListener("click", handleClick);
  }, [showFilterSideBar, setShowFilterSideBar]);

  return (
    <div
      id="filter-side-bar"
      className={`${
        !showFilterSideBar && "-translate-x-96"
      } z-30 fixed left-0 top-20 w-60 h-screen transition-all duration-300 bg-white`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <div className="pt-12">
            <h1 className="text-lg font-bold ml-4">Filter by type</h1>

            <ul className="ml-8 mt-8">
              {componentCategories?.map((category) => {
                const isPending = pendingFilters.includes(category);

                return (
                  <div className="flex w-44 relative my-6" key={category}>
                    <label
                      htmlFor={category}
                      className={`select-none hover:font-medium ${
                        isPending ? "font-medium" : ""
                      }`}
                    >
                      {categoryToText(category)}
                    </label>
                    <input
                      {...register(category)}
                      type="checkbox"
                      id={category}
                      name={category}
                      value={category}
                      checked={isPending}
                      onChange={() =>
                        isPending
                          ? handlePendingFilterRemove(category)
                          : handlePendingFilterAdd(category)
                      }
                      className="sr-only"
                    />
                    {isPending && (
                      <label
                        htmlFor={category}
                        className="absolute [transform:rotate(45deg)] right-8"
                      >
                        <Plus height={20} width={20} />
                      </label>
                    )}
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-10 left-0 right-0">
          {pendingFilters.length !== 0 ? (
            <button
              type="submit"
              className=" bg-blue-400 rounded-full w-48 p-2 text-sm text-white font-semibold mx-auto"
            >
              Apply Selected Filters ({pendingFilters.length})
            </button>
          ) : (
            hasParams && (
              <button
                type="submit"
                className="w-48 p-2 text-sm text-gray-500 font-semibold mx-auto"
              >
                Remove filters
              </button>
            )
          )}
        </div>
      </form>

      <button className="absolute top-0 right-0 p-3" onClick={handleClick}>
        <div className="[transform:rotate(45deg)]">
          <Plus height={30} width={30} />
        </div>
      </button>
    </div>
  );
};

export default FilterSideBar;
