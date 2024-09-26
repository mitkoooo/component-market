"use client";

import { useSearchParams } from "next/navigation";
import { Component } from "../_ts/app-interfaces";
import ComponentCard from "./ComponentCard";
import EmptyPage from "./EmptyPage";

type ComponentsDisplayProps = {
  components: Component[] | null | undefined;
}; /* use `interface` if exporting so that consumers can extend */

const ComponentsDisplay = ({
  components,
}: ComponentsDisplayProps): React.JSX.Element => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const filters = params?.toString()?.slice(9)?.split("+");

  if (!(params?.toString() === "")) {
    components = components?.filter((component) =>
      filters.includes(component?.category_name)
    );
  }

  if (components?.length == 0) return <EmptyPage />;

  return (
    <div className="m-12 justify-center items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-24">
      {components?.map((component) => (
        <ComponentCard key={component.id} component={component} />
      ))}
    </div>
  );
};

export default ComponentsDisplay;
