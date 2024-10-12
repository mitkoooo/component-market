"use client";

import { useSearchParams } from "next/navigation";

import ComponentCard from "./ComponentCard";
import EmptyPage from "./EmptyPage";
import { useComponents } from "../_context/ComponentsContext";

const ComponentsDisplay = (): React.JSX.Element => {
  let { displayedComponents } = useComponents();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const filters = params?.toString()?.slice(9)?.split("+");

  if (!(params?.toString() === "")) {
    const newDisplayedComponents = displayedComponents?.filter((component) =>
      filters.includes(component?.category_name)
    );
    displayedComponents =
      newDisplayedComponents !== undefined ? newDisplayedComponents : [];
  }

  if (displayedComponents?.length == 0) return <EmptyPage />;

  return (
    <>
      <div className="m-12 justify-center items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-24">
        {displayedComponents?.map((component) => (
          <ComponentCard key={component.id} component={component} />
        ))}
      </div>
    </>
  );
};

export default ComponentsDisplay;
