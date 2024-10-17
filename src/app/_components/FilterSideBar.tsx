"use client";

import { Plus } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FilterSideBarProps = {
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
  showFilterSideBarState,
}: FilterSideBarProps): React.JSX.Element => {
  const componentCategories = [
    { componentName: "buttons", componentSvg: <ButtonSvg /> },
    { componentName: "data-display", componentSvg: <DataDisplaySvg /> },
    { componentName: "feedback", componentSvg: <FeedbackSvg /> },
    { componentName: "navigation", componentSvg: <NavigationSvg /> },
    { componentName: "layout-item", componentSvg: <LayoutItemSvg /> },
    { componentName: "layouts", componentSvg: <LayoutSvg /> },
  ];

  const categories = Object.fromEntries(
    componentCategories?.map((category) => [category, false])
  );

  const { setShowFilterSideBar, showFilterSideBar } = showFilterSideBarState;

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();
  const pathname = usePathname();

  const { register, handleSubmit, reset, formState } =
    useForm<typeof categories>();

  const [pendingFilters, setPendingFilters] = useState<string[]>([]);

  const hasParams = params.get("category") === null ? false : true;

  const onSubmit: SubmitHandler<typeof categories> = () => {
    const activeFilters = pendingFilters;
    let toastMessage = "";

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
      } z-30 fixed left-0 top-20 w-72 h-screen transition-all duration-300 bg-white`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <div className="mt-16">
            <h1 className="text-xl text-black text-opacity-85 ml-14 mb-6">
              Filter by
            </h1>

            <ul className="border-opacity-5 mx-4 bg-neutral-1 shadow-inner border-x border-t text-opacity-85 text-black">
              <div className="flex px-6 relative py-3 bg-neutral-1 border-b border-opacity-5">
                Type
              </div>
              {componentCategories?.map((category) => {
                const isPending = pendingFilters.includes(
                  category.componentName
                );

                return (
                  <div
                    className="flex px-6 relative py-3 bg-neutral-1 border-b border-opacity-5 gap-6"
                    key={category.componentName}
                  >
                    {category.componentSvg}
                    <input
                      {...register(category.componentName)}
                      type="checkbox"
                      id={category.componentName}
                      checked={isPending}
                      onChange={() =>
                        isPending
                          ? handlePendingFilterRemove(category.componentName)
                          : handlePendingFilterAdd(category.componentName)
                      }
                      className="sr-only"
                    />
                    <label
                      htmlFor={category.componentName}
                      className={`select-none hover:font-medium ${
                        isPending ? "font-medium" : ""
                      }`}
                    >
                      {categoryToText(category.componentName)}
                    </label>
                    {isPending && (
                      <label
                        htmlFor={category.componentName}
                        className="absolute [transform:rotate(45deg)] right-8 bottom-3.5"
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
        <div className="mt-8 flex flex-col items-start gap-10">
          {pendingFilters.length !== 0 ? (
            <button
              type="submit"
              className="drop-shadow-sm bg-primary-6 hover:bg-primary-5 rounded-sm py-2 px-2  text-white text-sm mx-auto shadow-inner transition-colors duration-300"
              disabled={formState?.isSubmitting}
            >
              Apply Selected Filters ({pendingFilters.length})
            </button>
          ) : (
            hasParams && (
              <button
                type="submit"
                className="py-2 px-2 text-sm text-black text-opacity-85 bg-neutral-1 hover:border-primary-5 hover:text-primary-5 transition-colors duration-300 border border-opacity-5 mx-auto"
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

const ButtonSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    <rect x="3" y="8" width="18" height="8" rx="2" ry="2" />
  </svg>
);

const DataDisplaySvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    <path d="M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3" />
    <path d="M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3" />
    <line x1="4" y1="12" x2="20" y2="12" />
  </svg>
);
const FeedbackSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const NavigationSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const LayoutItemSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
  </svg>
);
const LayoutSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
  </svg>
);
