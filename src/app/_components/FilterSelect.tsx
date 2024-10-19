"use client";
import Select, { ClassNamesConfig, GroupBase, MultiValue } from "react-select";
import {
  ButtonSvg,
  DataDisplaySvg,
  FeedbackSvg,
  LayoutItemSvg,
  LayoutSvg,
  NavigationSvg,
} from "./svg/Categories";
import { useState } from "react";

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

const categoryToText = (category: ComponentName): string => {
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

const FilterSelect = (): React.JSX.Element => {
  const componentCategories: ComponentCategories = [
    { componentName: "buttons", componentSvg: <ButtonSvg /> },
    { componentName: "data-display", componentSvg: <DataDisplaySvg /> },
    { componentName: "feedback", componentSvg: <FeedbackSvg /> },
    { componentName: "navigation", componentSvg: <NavigationSvg /> },
    { componentName: "layout-item", componentSvg: <LayoutItemSvg /> },
    { componentName: "layouts", componentSvg: <LayoutSvg /> },
  ];

  type Option = { value: ComponentName | ""; label: JSX.Element };

  const options: Option[] = componentCategories.map((category) => ({
    value: category.componentName,
    label: (
      <div className="flex text-center gap-2 px-1">
        {category.componentSvg} {categoryToText(category.componentName)}
      </div>
    ),
  }));

  const [selectedOption, setSelectedOption] = useState<MultiValue<Option>>([]);

  const styles: ClassNamesConfig<Option, true, GroupBase<Option>> = {
    control: (state) => (state.isFocused ? "border-primary-5" : "border-black"),
    multiValueLabel: ({ data }) => {
      switch (data.value) {
        case "buttons":
          return "bg-[#FFFBE6] border-t border-l border-b border-[#FFE58F]";

        case "data-display":
          return "bg-[#E6FFFB] border-t border-l border-b border-[#87E8DE]";

        case "feedback":
          return "bg-[#f9f0ff] border-t border-l border-b border-[#d3adf7]";

        case "layout-item":
          return "bg-[#fff2e8] border-t border-l border-b border-[#ffbb96]";

        case "layouts":
          return "bg-[#fcffe6] border-t border-l border-b border-[#eaff8f]";

        case "navigation":
          return "bg-[#f0f5ff] border-t border-l border-b border-[#adc6ff]";

        default:
          return "";
      }
    },
    multiValueRemove: ({ data }) => {
      switch (data.value) {
        case "buttons":
          return "bg-[#FFFBE6] border-t border-r border-b border-[#FFE58F]";

        case "data-display":
          return "bg-[#E6FFFB] border-t border-r border-b border-[#87E8DE]";

        case "feedback":
          return "bg-[#f9f0ff] border-t border-r border-b border-[#d3adf7]";

        case "layout-item":
          return "bg-[#fff2e8] border-t border-r border-b border-[#ffbb96]";

        case "layouts":
          return "bg-[#fcffe6] border-t border-r border-b border-[#eaff8f]";

        case "navigation":
          return "bg-[#f0f5ff] border-t border-r border-b border-[#adc6ff]";

        default:
          return "";
      }
    },
  };

  return (
    <Select
      closeMenuOnSelect={false}
      classNames={styles}
      className="z-50 items-start w-full text-black text-opacity-85 text-base"
      placeholder="Select by type..."
      isMulti
      defaultValue={selectedOption}
      onChange={(newVal) => setSelectedOption(newVal)}
      options={options}
    />
  );
};

export default FilterSelect;
