import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Component } from "../_ts/app-interfaces";

type ComponentsContextType = {
  components: Component[] | null;
  displayedComponents: Component[] | null;
  setDisplayedComponents: Dispatch<SetStateAction<Component[] | null>>;
};

const ComponentsContext = createContext<ComponentsContextType>({});

type componentsProviderProps = {
  children: React.JSX.Element;
  initialComponents: Component[] | null;
};

function ComponentsProvider({
  children,
  initialComponents,
}: componentsProviderProps): React.JSX.Element {
  const components = initialComponents;
  const [displayedComponents, setDisplayedComponents] = useState<
    Component[] | null
  >(initialComponents);

  return (
    <ComponentsContext.Provider
      value={{ components, displayedComponents, setDisplayedComponents }}
    >
      {children}
    </ComponentsContext.Provider>
  );
}

const useComponents = () => {
  const context = useContext(ComponentsContext);

  if (!context)
    throw new Error("useComponents has to be used within <ComponentsProvider>");

  return context;
};

export { ComponentsProvider, useComponents };
