"use client";

import { Plus } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  ButtonSvg,
  DataDisplaySvg,
  FeedbackSvg,
  LayoutItemSvg,
  LayoutSvg,
  NavigationSvg,
} from "./svg/Categories";

type FilterSideBarProps = {
  showFilterSideBarState: {
    setShowFilterSideBar: Dispatch<SetStateAction<boolean>>;
    showFilterSideBar: boolean;
  };
};

type Inputs = {
  buttons: boolean;
  "data-display": boolean;
  feedback: boolean;
  "layout-item": boolean;
  layouts: boolean;
  navigation: boolean;
};

type ComponentName =
  | "buttons"
  | "data-display"
  | "feedback"
  | "layout-item"
  | "layouts"
  | "navigation";

type ComponentCategories = Array<{
  readonly componentName: ComponentName;
  readonly componentSvg: JSX.Element;
}>;

type handlePendingFiltersFn = (category: string) => void;

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
  const componentCategories: ComponentCategories = [
    { componentName: "buttons", componentSvg: <ButtonSvg /> },
    { componentName: "data-display", componentSvg: <DataDisplaySvg /> },
    { componentName: "feedback", componentSvg: <FeedbackSvg /> },
    { componentName: "navigation", componentSvg: <NavigationSvg /> },
    { componentName: "layout-item", componentSvg: <LayoutItemSvg /> },
    { componentName: "layouts", componentSvg: <LayoutSvg /> },
  ];

  const { setShowFilterSideBar, showFilterSideBar } = showFilterSideBarState;

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();
  const pathname = usePathname();
  const hasParams = params.get("category") === null ? false : true;

  const [pendingFilters, setPendingFilters] = useState<string[]>([]);
  const { register, handleSubmit, reset, formState } = useForm<Inputs>();

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

  const onSubmit: SubmitHandler<Inputs> = () => {
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

  const handleClose = () => {
    setShowFilterSideBar(false);
  };

  const handlePendingFilterRemove: handlePendingFiltersFn = (category) => {
    setPendingFilters((prevState) => [
      ...prevState.filter((pendingCategory) => pendingCategory !== category),
    ]);
  };

  const handlePendingFilterAdd: handlePendingFiltersFn = (category) => {
    setPendingFilters((prevState) => [...prevState, category]);
  };

  return (
    <div
      id="filter-side-bar"
      className={`${
        !showFilterSideBar && "-translate-x-96"
      } z-30 fixed left-0 top-20 w-72 h-screen transition-all duration-300 bg-white`}
    >
      <button className="absolute top-0 right-0 p-3" onClick={handleClose}>
        <div className="[transform:rotate(45deg)]">
          <Plus height={30} width={30} />
        </div>
      </button>

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
                className="py-2 px-2 text-sm text-black text-opacity-85 bg-neutral-1 hover:border-danger hover:text-danger transition-colors duration-300 border border-opacity-5 mx-auto"
              >
                Remove filters
              </button>
            )
          )}
        </div>
      </form>
    </div>
  );
};

export default FilterSideBar;
