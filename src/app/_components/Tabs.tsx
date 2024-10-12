"use client";

import {
  Children,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type CodeFormat = "tsx" | "jsx";

type TabsProps = {
  children: React.ReactNode;
  className?: string;
  defaultValue: CodeFormat;
}; /* use `interface` if exporting so that consumers can extend */

const TabsContext = createContext<{
  defaultValue: string;
  currentValue: CodeFormat;
  setCurrentValue: Dispatch<SetStateAction<CodeFormat>>;
} | null>(null);

const useTabs = () => {
  const context = useContext(TabsContext);

  if (!context) throw new Error("The context was used outside of its provider");

  return context;
};

const Tabs = ({
  children,
  className,
  defaultValue,
}: TabsProps): React.JSX.Element => {
  const [currentValue, setCurrentValue] = useState<CodeFormat>(defaultValue);

  return (
    <div className={className ?? ""}>
      <TabsContext.Provider
        value={{ defaultValue, currentValue, setCurrentValue }}
      >
        {children}
      </TabsContext.Provider>
    </div>
  );
};

function List({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  if (children === null || children === undefined) return;

  return (
    <ul
      className={`${
        className ?? ""
      } flex justify-between items-center px-1 w-28 h-9 rounded-lg`}
    >
      {" "}
      {Children.map(children, (child, index) => {
        return <li key={index}>{child}</li>;
      })}
    </ul>
  );
}

function Trigger({
  children,
  className,
  value,
}: {
  children: React.ReactNode;
  className?: string;
  value: CodeFormat;
}) {
  const { setCurrentValue, currentValue } = useTabs();

  const handleClick = () => {
    setCurrentValue(value);
  };

  const active = currentValue === value;

  return (
    <button
      className={`${className ?? ""} font-semibold py-1 px-3 rounded-md ${
        active ? "bg-blue-600 text-white" : ""
      }`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

function Content({
  className,
  children,
  value,
}: {
  className?: string;
  children: React.ReactNode;
  value: string;
}) {
  const { currentValue } = useTabs();

  return (
    <div
      className={`${className ?? ""} ${currentValue === value ? "" : "hidden"}`}
    >
      {children}
    </div>
  );
}

export default Tabs;

Tabs.List = List;
Tabs.Content = Content;
Tabs.Trigger = Trigger;
