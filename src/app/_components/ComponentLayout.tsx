"use client";

import { ComponentsProvider } from "../_context/ComponentsContext";
import { Component } from "../_ts/app-interfaces";
import ComponentsDisplay from "./ComponentsDisplay";
import ComponentSearch from "./ComponentSearch";

type ComponentLayoutProps = {
  componentCategories: string[] | null;
  components: Component[] | null;
}; /* use `interface` if exporting so that consumers can extend */

const ComponentLayout = ({
  componentCategories,
  components,
}: ComponentLayoutProps): React.JSX.Element => {
  return (
    <ComponentsProvider initialComponents={components}>
      <>
        <div className="mx-2 my-4 sm:mx-12 md:mx-32 lg:mx-48">
          <ComponentSearch componentCategories={componentCategories} />
        </div>
        <ComponentsDisplay />
      </>
    </ComponentsProvider>
  );
};

export default ComponentLayout;
